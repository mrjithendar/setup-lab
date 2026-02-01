docker compose down
docker compose build wordpress; docker compose up -d


chmod 600 cloudflare.ini

docker compose run --rm certbot certonly --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini --dns-cloudflare-propagation-seconds 60 \
  -d jithendar.com -d '*.jithendar.com'

docker compose run --rm certbot renew --force-renewal
docker compose run --rm certbot renew --dry-run

docker restart nginx-server

cat <<EOF | sudo tee /etc/sysctl.d/99-redis.conf
vm.overcommit_memory = 1
EOF

sudo sysctl --system

