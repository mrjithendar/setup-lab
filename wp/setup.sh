#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mode=${1:-http}
case "$mode" in http|https) ;; *) echo "Usage: $0 [http|https]" >&2; exit 1;; esac
[[ -f .env ]] || { echo 'Copy .env.example to .env and configure it first.' >&2; exit 1; }
# Read only DOMAIN, without executing the env file as shell code.
domain=$(sed -n 's/^DOMAIN=//p' .env | tr -d '\r')
[[ "$domain" =~ ^[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?$ ]] || { echo 'DOMAIN must be an unquoted hostname or IPv4 address.' >&2; exit 1; }
docker compose config --quiet
mkdir -p nginx certbot/www certbot/conf
if [[ "$mode" == https ]]; then
  docker compose run --rm --entrypoint sh certbot -c "test -s /etc/letsencrypt/live/$domain/fullchain.pem && test -s /etc/letsencrypt/live/$domain/privkey.pem"
fi
sed "s/\${DOMAIN}/$domain/g" "nginx/$mode.conf.template" > nginx/default.conf
chmod 600 .env
docker compose up -d --build --wait --wait-timeout 300
# A running Nginx needs a reload when the generated configuration changes.
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload
