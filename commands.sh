docker network connect monitoring_monitoring_net nginx-server
docker restart nginx-server
docker network connect monitoring_monitoring_net n8n

chmod 600 cloudflare.ini

docker compose run --rm certbot certonly --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini --dns-cloudflare-propagation-seconds 60 \
  -d jithendar.com -d '*.jithendar.com'

docker compose run --rm certbot renew --force-renewal
docker compose run --rm certbot renew --dry-run

docker restart nginx-server
