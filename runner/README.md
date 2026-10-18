# GitHub Actions runner

Run on the Linux server as `ec2-user`, without sudo:

```bash
bash runner/setup.sh
```

Prerequisites: AWS CLI, Python 3, curl, tar, sha256sum, flock, sudo and systemd. Setup installs .NET runtime libraries using dnf/yum on Amazon Linux or the bundled dependency installer on other distributions, then checks the runner runtime before fetching the secret. The script uses sudo only for dependencies and service setup; AWS credentials are read as the invoking user.

The installer registers with `https://github.com/mrjithendar/roboshop-ai`. It downloads runner 2.337.0 for x64 or arm64, verifies the official SHA-256 checksum, and fetches `roboshop-ai` from AWS Secrets Manager in `us-east-1` during initial registration. The AWS identity needs `secretsmanager:GetSecretValue` on that secret (and KMS decrypt permission if using a customer-managed encryption key).

Supported secret JSON fields:

- `github_token`: GitHub access token, exchanged for a fresh runner registration token. A fine-grained PAT needs repository Administration write permission.
- `runner_token`: a fresh registration token from the repository's Actions runner setup page. Registration tokens expire after one hour.
- `password`: existing secret format. Values starting with `ghp_` or `github_pat_` are treated as PATs; other values are treated as registration tokens. This must contain an actual GitHub token, not a generated password.

The AWS secret is not printed or written to a file. The registration token is passed through the runner's supported environment input, not command-line arguments. GitHub stores its own runner credentials after registration. The installer does not update the AWS secret.

Repeat runs preserve the existing registration and ensure its service is started. A directory registered to another repository is rejected. No secret is needed again for an already registered runner. The service runs as the invoking user and survives logout/reboot.

Optional environment variables: `RUNNER_NAME` (default hostname), `RUNNER_DIR` (default `$HOME/actions-runner`). Keep the runner directory at a permanent location. The default directory is outside the checkout, so the checkout need not be writable. Keep custom directories outside the repository.

Validation:

```bash
bash -n runner/setup.sh
python3 -m unittest discover -s runner -p 'test_*.py' -v
```

References: [runner release and checksums](https://github.com/actions/runner/releases/tag/v2.337.0), [GitHub registration tokens](https://docs.github.com/en/rest/actions/self-hosted-runners#create-a-registration-token-for-a-repository).
