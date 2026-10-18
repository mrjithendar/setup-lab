#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
email=${1:?Usage: issue-certificate.sh EMAIL}
docker compose run --rm certbot certonly --non-interactive --webroot -w /var/www/certbot \
  --cert-name jithendar.com --email "$email" --agree-tos --no-eff-email \
  --keep-until-expiring -d jithendar.com
bash setup.sh https
