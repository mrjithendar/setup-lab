sudo mkdir -p /opt/wordpress/{wordpress,db,redis,nginx,certbot/www,certbot/conf}
cd /opt/wordpress

sudo vim /opt/wordpress/.env

sudo vim /opt/wordpress/docker-compose.yml

sudo vim /opt/wordpress/nginx/default.conf

sudo dnf install -y certbot; sudo mkdir -p /opt/wordpress/certbot/www

sudo certbot certonly --webroot -w /opt/wordpress/certbot/www \
  -d jithendar.com -d www.jithendar.com

# /opt/wordpress/certbot/conf/live/jithendar.com/