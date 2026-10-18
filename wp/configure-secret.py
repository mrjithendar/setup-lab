#!/usr/bin/env python3
"""Inject the AWS password into a child process environment without an env file."""
import argparse
import json
import os
from pathlib import Path
import secrets


def password_from(value):
    try:
        decoded = json.loads(value)
    except ValueError:
        decoded = value
    if isinstance(decoded, dict):
        decoded = decoded.get("password")
    if not isinstance(decoded, str) or not decoded or any(ord(c) < 32 for c in decoded):
        raise ValueError('Secret must be a nonempty plain password or JSON {"password":"..."}, without control characters.')
    return decoded


def fetch_password(client, secret_name):
    try:
        result = client.get_secret_value(SecretId=secret_name)
    except client.exceptions.ResourceNotFoundException:
        candidate = secrets.token_hex(32)
        try:
            client.create_secret(Name=secret_name, SecretString=candidate,
                                 Description="Shared WordPress installation password")
        except client.exceptions.ResourceExistsException:
            pass  # Another installer won the race; read its value.
        result = client.get_secret_value(SecretId=secret_name)
    return password_from(result.get("SecretString", ""))


def main():
    import boto3
    import hashlib
    parser = argparse.ArgumentParser()
    parser.add_argument("--initialize", action="store_true")
    parser.add_argument("command", nargs=argparse.REMAINDER)
    args = parser.parse_args()
    command = args.command
    if command and command[0] == "--":
        command = command[1:]
    if not command:
        parser.error("Supply a command after --")
    root = Path(__file__).resolve().parent
    config = json.loads((root / "config.json").read_text())
    secret_name = config["DOMAIN"]
    client = boto3.client("secretsmanager", region_name=config["AWS_REGION"])
    marker = root / ".credential-fingerprint"
    initialized = (root / "db").exists() and any((root / "db").iterdir())
    if initialized and not marker.exists():
        raise SystemExit("Existing database requires explicit credential migration before adoption.")
    if args.initialize:
        password = fetch_password(client, secret_name)
    else:
        password = password_from(client.get_secret_value(SecretId=secret_name).get("SecretString", ""))
    fingerprint = hashlib.sha256(password.encode()).hexdigest()
    if marker.exists() and marker.read_text() != fingerprint:
        raise SystemExit("AWS password changed. Rotate application credentials before updating the fingerprint.")
    if args.initialize and not marker.exists():
        marker.write_text(fingerprint)
        marker.chmod(0o600)
    env = os.environ.copy()
    for key in ("AWS_REGION", "DOMAIN", "COMPOSE_PROJECT_NAME", "MYSQL_DATABASE", "MYSQL_USER",
                "WORDPRESS_ADMIN_USER", "WORDPRESS_ADMIN_EMAIL"):
        value = config[key]
        if not isinstance(value, str) or not value or any(ord(c) < 32 for c in value):
            raise SystemExit("Invalid configuration field: " + key)
        env[key] = value
    env["SHARED_PASSWORD"] = password
    # Never serialize the password, print it, or put it in command arguments.
    os.execvpe(command[0], command, env)


if __name__ == "__main__":
    main()
