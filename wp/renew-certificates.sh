#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
exec 9>/run/lock/jithendar-cert-renew.lock
flock -n 9 || exit 0
docker compose run --rm certbot renew --webroot -w /var/www/certbot "$@"
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload
