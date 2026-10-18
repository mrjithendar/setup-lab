#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mode=${1:-http}
case "$mode" in http|https) ;; *) echo "Usage: $0 [http|https]" >&2; exit 1;; esac
domain=$(python3 -c 'import json; print(json.load(open("config.json"))["DOMAIN"])')
[[ "$domain" =~ ^[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?$ ]] || { echo 'DOMAIN must be an unquoted hostname or IPv4 address.' >&2; exit 1; }
bash compose.sh config --quiet
mkdir -p nginx certbot/www certbot/conf
if [[ "$mode" == https ]]; then
  bash compose.sh run --rm --entrypoint sh certbot -c "test -s /etc/letsencrypt/live/$domain/fullchain.pem && test -s /etc/letsencrypt/live/$domain/privkey.pem"
fi
sed "s/\${DOMAIN}/$domain/g" "nginx/$mode.conf.template" > nginx/default.conf
bash compose.sh up -d --build --wait --wait-timeout 300
# A running Nginx needs a reload when the generated configuration changes.
bash compose.sh exec -T nginx nginx -t
bash compose.sh exec -T nginx nginx -s reload
