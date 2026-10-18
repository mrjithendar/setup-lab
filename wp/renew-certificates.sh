#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
exec 9>/run/lock/wordpress-cert-renew.lock
flock -n 9 || exit 0
bash compose.sh run --rm certbot renew --webroot -w /var/www/certbot "$@"
bash compose.sh exec -T nginx nginx -t
bash compose.sh exec -T nginx nginx -s reload
