# WordPress installation

Separate scripts install Docker, MariaDB, Redis, WordPress, Nginx, Let's Encrypt and a twice-daily renewal timer. Passwords are passed through process environment variables, never written to `.env` or configuration files.

## Run on the server

Use Ubuntu 22.04/24.04 or Amazon Linux 2023. Point your domain’s DNS to the server, allow inbound TCP 80/443 and outbound HTTPS, and attach an EC2 IAM role with Secrets Manager permissions. Keep port 80 reachable for renewal.

```bash
cd /opt/wordpress_docker
sudo bash install.sh jithendar.com us-east-1 YOUR_EMAIL siteadmin
```

Replace `YOUR_EMAIL` with your actual email address before running. `/opt/wordpress_docker` is an example installation directory; use the path where you copied this repository.

### Command arguments

```text
sudo bash install.sh DOMAIN AWS_REGION EMAIL [ADMIN_USER]
```

| Part | Purpose |
| --- | --- |
| `sudo` | Runs with administrator permissions to install Docker and configure system services. |
| `bash install.sh` | Starts the installation workflow. |
| `jithendar.com` | The website domain and the AWS Secrets Manager secret name. Replace it with your domain; there is no hardcoded default. |
| `us-east-1` | The AWS region where the secret is retrieved or created. This argument configures the secret’s region, not the server’s location. |
| `YOUR_EMAIL` | Your real email address, used for Let’s Encrypt registration and the WordPress administrator account. |
| `siteadmin` | The optional WordPress administrator username. Defaults to `siteadmin` when omitted. |

Setup accepts the Let’s Encrypt terms and configures the supplied hostname. Additional hostnames such as `www` are not automatically included.

### What is `siteadmin`?

`siteadmin` is the username for the administrator account created inside WordPress on a fresh installation. It can manage the website’s content, users, themes, plugins and settings. It is not a Linux login, AWS identity or database username.

The installer saves this value as `WORDPRESS_ADMIN_USER` in the non-secret `wp/config.json`, passes it into the WordPress container, and uses it in `wp/install-wordpress.php` when creating the initial administrator. You can choose another username:

```bash
sudo bash install.sh jithendar.com us-east-1 you@example.com myadmin
```

Replace the example email with your own. To use the default username, omit the final argument:

```bash
sudo bash install.sh jithendar.com us-east-1 you@example.com
```

### Log in after installation

For the example domain above:

- **Login URL:** https://jithendar.com/wp-admin/
- **Username:** `siteadmin`, or the administrator username you supplied.
- **Password:** The password stored in AWS Secrets Manager under `jithendar.com` in `us-east-1`.

Retrieve the password through the AWS Secrets Manager console. If the secret contains JSON, use its `password` field. If the secret did not exist, initialization creates it with a strong random password. The same password is used for MariaDB root, the WordPress database user, Redis and the initial WordPress administrator, as requested.

For another domain, use `https://YOUR_DOMAIN/wp-admin/` and the secret named after that domain in the region you supplied. An already installed WordPress site keeps its existing administrator accounts and passwords; rerunning setup does not create or rename its administrator.

## Template and runtime variables

`wp/config.json.template` contains only non-secret configuration. `install.sh` copies its settings into `wp/config.json`, substituting the domain, region, administrator email and username supplied as arguments. For manual configuration, copy the template to `wp/config.json` and edit it. This file is ignored by Git and contains no password.

`wp/configure-secret.py` reads those settings, retrieves the AWS secret named **exactly after the supplied domain**, and launches the requested command with `SHARED_PASSWORD` in its environment. Compose references `${SHARED_PASSWORD}` for MariaDB root, the database user, Redis authentication and the initial WordPress administrator. WordPress session salts remain independent.

Only initialization creates a missing secret: a cryptographically random 64-character hexadecimal password (256 bits). Existing secrets may be a plain password or JSON containing a `password` field. Access-denied/network errors never trigger creation. Runtime commands and renewal only read the secret.

The password is neither printed nor passed as a command-line argument. `wp/compose.sh` explicitly uses `--env-file /dev/null`, preventing automatic loading of legacy `.env` files. A SHA-256 fingerprint in `wp/.credential-fingerprint` detects password changes without storing the password itself. Docker still stores container environment values in its metadata; this change removes plaintext env files, not Docker administrator visibility.

No WordPress `.env` is created. `wp/.env.example` documents non-secret shell variables you may pass as installer arguments. The separate `n8n/` stack is unchanged. Previously committed credentials remain in Git history until separately removed/rotated.

## Files

| File | Purpose |
| --- | --- |
| `install.sh` | Installs prerequisites, prepares non-secret configuration and starts deployment |
| `install-docker-ec2.sh` | Docker, Compose and Python installation |
| `requirements.txt` | AWS SDK dependency |
| `wp/.env.example` | Example non-secret variables for the install command |
| `wp/config.json.template` | Non-secret configuration template |
| `wp/configure-secret.py` | AWS password retrieval/creation and environment injection |
| `wp/compose.sh` | Compose wrapper with runtime secrets and env-file loading disabled |
| `wp/deploy.sh` | Application, certificate and renewal setup stages |
| `wp/setup.sh` | HTTP/HTTPS Nginx configuration and container readiness |
| `wp/install-wordpress.php` | Initial administrator creation through container stdin |
| `wp/issue-certificate.sh` | Certificate issuance and HTTPS activation |
| `wp/install-renewal.sh` | systemd timer installation |
| `wp/renew-certificates.sh` | Renewal and Nginx validation/reload |
| `wp/systemd/`, `wp/nginx/` | Service/timer files and Nginx templates |

HTTP bootstrap serves only ACME challenges and a health endpoint, returning 503 for the application until setup completes. The administrator installer is outside the web root. Already installed WordPress accounts are preserved. Enable the Redis Object Cache plugin separately if desired.

## Operations

Use the wrapper instead of bare `docker compose`, so runtime variables are populated:

```bash
cd /opt/wordpress_docker/wp
sudo bash compose.sh config --quiet
sudo bash compose.sh ps
sudo bash compose.sh logs --tail=100 nginx wordpress db
sudo bash renew-certificates.sh --dry-run
sudo systemctl list-timers wordpress-cert-renew.timer
sudo journalctl -u wordpress-cert-renew.service
```

Avoid `compose.sh config` without `--quiet`, as it prints resolved passwords. The timer retrieves the AWS secret at runtime, so the server needs working AWS credentials/network access during renewals. It runs twice daily with up to one hour of random delay and catches missed runs after downtime. Certbot renews only when due; Nginx is validated/reloaded after successful checks. Monitor service failures and certificate expiry.

Keep the checkout at its permanent path; rerun `install-renewal.sh` after moving it. Remove any older renewal cron entry to avoid duplicate scheduling.

## AWS permissions

The instance role needs `secretsmanager:GetSecretValue` and, for first-time initialization, `secretsmanager:CreateSecret`, scoped to `arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:YOUR_DOMAIN-*`. Customer-managed encryption keys require suitable KMS permissions. Newly created secrets use the default AWS-managed Secrets Manager key. Prefer an instance role; sudo does not automatically inherit personal AWS profiles.

## Existing installations

Back up databases, WordPress files and certificates before adoption. Existing database directories without the new credential fingerprint are rejected: migrate MariaDB and administrator credentials to match the secret before adopting this workflow. The installer does not rotate database passwords or reset existing WordPress accounts. Changing the AWS secret alone is insufficient; update application credentials deliberately before replacing the fingerprint. Do not delete data directories to bypass checks.

Persistent bind mounts and the `wordpress_wordpress` network are retained. Check compatibility before using MariaDB 11.4 with existing data. Custom `wp-config.php` files need Docker environment support, forwarded HTTPS and the Redis password configuration. Preserve the complete `live` and `archive` certificate tree when migrating certificates.

## Validation

```bash
python3 -m unittest discover -s tests -v
```

Tests cover AWS read/create/error behavior, environment injection without writing passwords, changed-secret detection, and existing-database protection. The Compose round-trip test runs when Compose is available. This Mac has no working Compose plugin or running daemon, so that test is skipped; live server installation, real AWS calls and certificate issuance/renewal remain deployment checks.

References: [AWS GetSecretValue](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/get-secret-value.html), [AWS CreateSecret](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/create-secret.html), [Certbot renewal](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates).
