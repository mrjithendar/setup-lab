#!/usr/bin/env python3
"""Fetch/create one AWS password, then atomically render the Compose environment."""
import argparse
import json
import os
from pathlib import Path
import secrets
import tempfile


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


def fetch_password(client):
    try:
        result = client.get_secret_value(SecretId="jithendar.com")
    except client.exceptions.ResourceNotFoundException:
        candidate = secrets.token_hex(32)
        try:
            client.create_secret(Name="jithendar.com", SecretString=candidate,
                                 Description="Shared jithendar.com WordPress installation password")
        except client.exceptions.ResourceExistsException:
            pass  # Another installer won the race; read its value.
        result = client.get_secret_value(SecretId="jithendar.com")
    return password_from(result.get("SecretString", ""))


def render(password, email, admin):
    # Compose double-quoted values: escape backslashes/quotes and literal dollars.
    def quote(value):
        return json.dumps(value, ensure_ascii=False).replace("$", "$$")
    values = dict(COMPOSE_PROJECT_NAME="wordpress", DOMAIN="jithendar.com",
                  MYSQL_DATABASE="wordpress", MYSQL_USER="wordpress",
                  SHARED_PASSWORD=password, WORDPRESS_ADMIN_USER=admin,
                  WORDPRESS_ADMIN_EMAIL=email)
    return "".join(k + "=" + (quote(v) if k != "DOMAIN" else v) + "\n" for k, v in values.items())


def main():
    import boto3
    parser = argparse.ArgumentParser()
    parser.add_argument("--region", required=True)
    parser.add_argument("--email", required=True)
    parser.add_argument("--admin", default="siteadmin")
    args = parser.parse_args()
    if "@" not in args.email or not args.admin or any(ord(c) < 32 for c in args.email + args.admin):
        parser.error("Provide a valid email and nonempty administrator name.")
    root = Path(__file__).resolve().parent
    target = root / ".env"
    client = boto3.client("secretsmanager", region_name=args.region)
    # Never initialize or overwrite credentials on an unmanaged existing database.
    initialized = (root / "db").exists() and any((root / "db").iterdir())
    if initialized and (not target.exists() or "SHARED_PASSWORD=" not in target.read_text()):
        raise SystemExit("Existing database detected. Migrate its credentials to the AWS secret before using this installer; .env was preserved.")
    rendered = render(fetch_password(client), args.email, args.admin)
    if initialized and target.read_text() != rendered:
        raise SystemExit("Existing database/configuration differs. Refusing to replace .env; credential rotation requires database and WordPress updates.")
    os.umask(0o077)
    fd, name = tempfile.mkstemp(dir=root, prefix=".env.")
    try:
        with os.fdopen(fd, "w") as stream:
            stream.write(rendered)
        os.replace(name, target)
    finally:
        if os.path.exists(name):
            os.unlink(name)
    print("Configured .env from AWS secret jithendar.com (password hidden).")


if __name__ == "__main__":
    main()
