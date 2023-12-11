git pull

docker-compose down

docker volume ls -q | xargs -L1 docker volume rm

curl -sSLo nginx-conf/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf

docker-compose up -d --remove-orphans