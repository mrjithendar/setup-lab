#!/usr/bin/env bash
# Orchestration only; each stage also runs independently.
set -euo pipefail
[[ $EUID == 0 ]] || { echo 'Run with sudo.' >&2; exit 1; }
region=${1:?Usage: sudo bash install.sh AWS_REGION EMAIL [ADMIN_USER]}
email=${2:?Supply your certificate and WordPress administrator email}
admin=${3:-siteadmin}
cd "$(dirname "$0")"
exec 9>/run/lock/jithendar-wordpress-install.lock
flock -n 9 || { echo 'Another installation is running.' >&2; exit 1; }
bash install-docker-ec2.sh
python3 -m venv .venv
.venv/bin/pip install --disable-pip-version-check -r requirements.txt
.venv/bin/python wp/configure-secret.py --region "$region" --email "$email" --admin "$admin"
cd wp
# A rerun must not temporarily downgrade an existing HTTPS site.
mode=http
[[ ! -s certbot/conf/live/jithendar.com/fullchain.pem ]] || mode=https
bash setup.sh "$mode"
# Initialize before enabling public application access.
docker compose exec -T wordpress php < install-wordpress.php
bash issue-certificate.sh "$email"
bash install-renewal.sh
curl --fail --silent --show-error --output /dev/null https://jithendar.com/
echo 'Ready: https://jithendar.com/wp-admin/ (password: AWS secret jithendar.com)'
