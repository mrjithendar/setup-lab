https://aws.amazon.com/blogs/compute/deploying-a-highly-available-wordpress-site-on-amazon-lightsail-part-2-using-amazon-s3-with-wordpress-to-securely-deliver-media-files/

ACCESS_KEY=AKIAIOSFODNN7jithendar
SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYjithendarKEY

cat <<EOT >> credfile.txt

define( 'AS3CF_SETTINGS', serialize( array (

    'provider' => 'aws',

    'access-key-id' => '$ACCESS_KEY',

    'secret-access-key' => '$SECRET_KEY',

) ) );

EOT

sed -i "/define( 'WP_DEBUG', false );/r credfile.txt" /var/www/html/wp-config.php

wp media offload

root@localhost password
CREATE DATABASE wordpress CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'jithendar'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'jithendar'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;

server {
    listen 80;
    listen [::]:80;

    root /var/www/jithendar.com/;

    index index.html;

    server_name jithendar.com www.jithendar.com;

    access_log /var/log/nginx/jithendar.com.access.log;
    error_log /var/log/nginx/jithendar.com.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}

sudo certbot certonly --agree-tos --email i@jithendar.com --webroot -w /var/lib/letsencrypt/ -d jithendar.com -d www.jithendar.com