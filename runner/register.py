#!/usr/bin/env python3
"""Fetch installation credentials without printing or persisting the AWS secret."""
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request


def registration_token(secret, repo):
    if not isinstance(secret, dict):
        raise ValueError('Secret must be JSON with github_token or runner_token.')
    key = next((key for key in ('github_token', 'runner_token', 'password') if key in secret), 'runner_token')
    token = secret.get(key)
    if not isinstance(token, str) or not token.strip() or any(c.isspace() for c in token):
        raise ValueError('Set github_token (GitHub access token) or runner_token (fresh registration token) in roboshop-ai. A generated password cannot register a runner.')
    if key == 'runner_token' or (key == 'password' and not token.startswith(('ghp_', 'github_pat_'))):
        return token
    request = urllib.request.Request(
        f'https://api.github.com/repos/{repo}/actions/runners/registration-token',
        data=b'', method='POST', headers={
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        })
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise ValueError(f'GitHub registration request failed (HTTP {error.code}); check token permissions and repository access.') from None
    except urllib.error.URLError:
        raise ValueError('Cannot connect to GitHub to obtain a registration token.') from None
    token = result.get('token')
    if not isinstance(token, str) or not token:
        raise ValueError('GitHub did not return a registration token.')
    return token


def main():
    repo, name = sys.argv[1:]
    result = subprocess.run([
        'aws', 'secretsmanager', 'get-secret-value', '--secret-id', 'roboshop-ai',
        '--region', 'us-east-1', '--output', 'json', '--no-cli-pager',
    ], check=True, capture_output=True, text=True)
    secret = json.loads(json.loads(result.stdout)['SecretString'])
    token = registration_token(secret, repo)
    env = os.environ.copy()
    env['ACTIONS_RUNNER_INPUT_TOKEN'] = token
    subprocess.run(['./config.sh', '--unattended', '--url', 'https://github.com/' + repo,
                    '--name', name, '--work', '_work'], env=env, check=True)


if __name__ == '__main__':
    try:
        main()
    except subprocess.CalledProcessError:
        sys.exit('AWS secret retrieval or runner configuration failed. Check AWS access as the invoking user and runner diagnostics.')
    except (ValueError, KeyError):
        # Never include malformed secret contents in error output.
        sys.exit('Runner registration failed. Secret roboshop-ai must contain a valid github_token, runner_token, or password token; verify GitHub repository administration permissions.')
