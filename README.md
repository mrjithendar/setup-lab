# jithendar.com WordPress installation

A single command orchestrates separate scripts and configuration files for Docker, MariaDB, Redis, WordPress, Nginx, Let's Encrypt issuance and automatic renewal. Run on Ubuntu 22.04/24.04 or Amazon Linux 2023, not on your Mac.

## Run

Point the `jithendar.com` A record to the server (and ensure any AAAA record also reaches it). Allow inbound TCP 80/443 and outbound HTTPS; keep port 80 open for renewal. Attach an EC2 IAM role with the permissions below. Copy this directory to a permanent path such as `/opt/wordpress_docker`, then run:

```bash
cd /opt/wordpress_docker
sudo bash install.sh ap-south-1 YOUR_EMAIL siteadmin
```

Replace the region with the region where your secret should live, and supply your real email. The email is used for Let's Encrypt registration and the WordPress administrator. Certificate issuance accepts the Let's Encrypt terms. Only `jithendar.com` is configured; `www` is not included.

The installer retrieves the AWS Secrets Manager secret named **`jithendar.com`**. If and only if AWS returns `ResourceNotFoundException`, it creates a cryptographically random 64-character hexadecimal password (256 bits). Access-denied, network and other errors stop installation. Concurrent creation retrieves the winning secret. Existing values can be a plain password or JSON with one `password` field. Empty/control-character passwords and unsupported JSON are rejected.

That same password populates `SHARED_PASSWORD` in a generated mode-0600 `wp/.env` and is used for MariaDB root, the WordPress database user, Redis authentication, and the initial WordPress administrator. It is never printed. WordPress session salts remain independently generated. EC2 AWS authentication uses its instance role, not the application password. Retrieve the login password from Secrets Manager when needed. Password reuse is intentional as requested.

No AWS secret is created merely by checking out these files. It is retrieved/created when the configuration stage runs on your server. Use an instance role; running under sudo does not automatically inherit your personal AWS profile.

## Files and individual stages

| File | Purpose |
| --- | --- |
| `install.sh` | Runs all stages with an installation lock |
| `install-docker-ec2.sh` | Installs Docker, Compose and Python prerequisites |
| `requirements.txt` | Python AWS SDK dependency |
| `wp/configure-secret.py` | Fetches/creates secret and atomically writes `.env` |
| `wp/docker-compose.yaml` | Persistent application services and Certbot |
| `wp/setup.sh` | Renders HTTP/HTTPS Nginx configuration and waits for services |
| `wp/install-wordpress.php` | Installs WordPress and initial administrator through container stdin |
| `wp/issue-certificate.sh` | Obtains certificate and enables HTTPS |
| `wp/install-renewal.sh` | Installs/enables the systemd renewal timer |
| `wp/renew-certificates.sh` | Renews certificates, validates and reloads Nginx |
| `wp/systemd/` | Separate renewal service/timer definitions |
| `wp/nginx/` | HTTP bootstrap and HTTPS proxy templates |

To run stages individually after installing Docker:

```bash
sudo python3 -m venv .venv
sudo .venv/bin/pip install -r requirements.txt
sudo .venv/bin/python wp/configure-secret.py --region ap-south-1 --email YOUR_EMAIL --admin siteadmin
cd wp
sudo bash setup.sh http
sudo docker compose exec -T wordpress php < install-wordpress.php
sudo bash issue-certificate.sh YOUR_EMAIL
sudo bash install-renewal.sh
```

For an already HTTPS-enabled site use `setup.sh https`; the top-level installer selects this automatically. HTTP bootstrap returns 503 outside the ACME challenge/health endpoint, so visitors cannot claim the administrator during installation. The PHP installer is outside the web root and skips already installed WordPress sites without resetting accounts. Install/enable the Redis Object Cache plugin separately if desired; the PHP extension and authenticated Redis connection are provided.

## AWS permissions

The instance role needs `secretsmanager:GetSecretValue` and `secretsmanager:CreateSecret` scoped to `arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:jithendar.com-*`. A customer-managed KMS key additionally needs the appropriate KMS permissions (including decrypt for reads); newly created secrets use the default AWS Secrets Manager key. No list-secrets or rotation permission is needed. The instance must reach Secrets Manager through outbound HTTPS or a VPC endpoint.

## Renewal and operations

The timer runs twice daily with up to one hour of randomized delay, and catches missed runs after downtime. Certbot renews certificates only when due; Nginx is checked/reloaded after a successful renewal command, including when no certificate was due. A failed command fails the service and is visible in the journal. Set up monitoring for service failures and certificate expiry.

```bash
sudo systemctl list-timers wordpress-cert-renew.timer
sudo journalctl -u wordpress-cert-renew.service
cd /opt/wordpress_docker/wp
sudo bash renew-certificates.sh --dry-run
sudo docker compose ps
sudo docker compose logs --tail=100 nginx wordpress db
```

Keep the installation directory at the same path; rerun `install-renewal.sh` after moving it. Remove any old cron renewal entry to avoid duplicate scheduling. Renewal uses local configuration and does not need AWS access.

## Existing installations and backups

Existing bind mounts (`wp/db`, `wp/wordpress`, `wp/redis`, `wp/certbot`) and the `wordpress_wordpress` network are retained. The installer refuses to overwrite a legacy `.env` on an initialized database, or change generated configuration on a rerun with existing database data. It does not migrate database passwords or reset existing WordPress administrators. Migrate those credentials deliberately to match the AWS password before adopting this setup. Changing an AWS secret alone does not rotate MariaDB or WordPress passwords; Redis also needs recreation. Do not delete persistent directories to bypass these checks.

Back up the database, WordPress files, certificates and environment securely before adopting or upgrading this stack. Verify the existing database version before using MariaDB 11.4; do not downgrade an existing data directory. Existing custom `wp-config.php` files must support Docker environment configuration, forwarded HTTPS and the Redis password setting. Imported `/etc/letsencrypt` trees must retain both `live` symlinks and `archive` contents under `wp/certbot/conf`.

The legacy `wp/.env` and `n8n/.env` are tracked in Git. Their contents have not been changed by this refactor. Before publishing, remove credentials from tracking and rotate any exposed values through the applications' procedures. `.gitignore` does not remove tracked files or history. The optional `n8n/` stack is separate and is not configured by this installer.

Container image tags track updates; pin tested digests if you need reproducible deployments. Docker installation on Amazon Linux uses a checksum-verified Compose release; update that release explicitly as needed.

## Validation

Shell syntax and secret creation/read/error tests pass, including preservation of legacy credentials on an existing database. The Compose password round-trip test is included but skipped here because this Mac's Compose plugin is missing. No Docker daemon is running. Compose rendering, live container startup, EC2 package installation, real AWS calls, certificate issuance and renewal dry-run remain target-server checks.

Run the tests with `python3 -m unittest discover -s tests -v`; the AWS tests use mocks and do not access your account. On a machine with Compose installed, the password round-trip test also runs. After setup, run `sudo docker compose config --quiet` in `wp/` and the certificate renewal dry-run above.

References: [Docker Ubuntu installation](https://docs.docker.com/engine/install/ubuntu/), [AWS GetSecretValue](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/get-secret-value.html), [AWS CreateSecret](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/create-secret.html), [Certbot renewal](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates).
