#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
domain=$(python3 -c 'import json; print(json.load(open("config.json"))["DOMAIN"])')
email=${1:?Usage: issue-certificate.sh EMAIL}
bash compose.sh run --rm certbot certonly --non-interactive --webroot -w /var/www/certbot \
  --cert-name "$domain" --email "$email" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$domain"
bash setup.sh https
