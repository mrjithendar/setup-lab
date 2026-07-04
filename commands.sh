#!/usr/bin/env bash
#
# Operational runbook for the setup-lab stack.
# Fails fast so a broken step never leaves the stack in a half-applied state.
set -euo pipefail

docker compose down

# Rebuild first; only bring the stack up if the build actually succeeded.
docker compose build wordpress
docker compose up -d

chmod 600 cloudflare.ini

docker compose run --rm certbot certonly --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini --dns-cloudflare-propagation-seconds 60 \
  -d jithendar.com -d '*.jithendar.com'

docker compose run --rm certbot renew --force-renewal
docker compose run --rm certbot renew --dry-run

docker restart nginx-server

# Verify the redis PHP extension is actually loaded, and fail loudly if it is not.
if ! docker exec wordpress-app php -m | grep -q redis; then
  echo "ERROR: redis PHP extension is not loaded in wordpress-app" >&2
  exit 1
fi

cat <<EOF | sudo tee /etc/sysctl.d/99-redis.conf
vm.overcommit_memory = 1
EOF

sudo sysctl --system
