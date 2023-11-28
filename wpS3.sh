https://aws.amazon.com/blogs/compute/deploying-a-highly-available-wordpress-site-on-amazon-lightsail-part-2-using-amazon-s3-with-wordpress-to-securely-deliver-media-files/

ACCESS_KEY=""
SECRET_KEY=""

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

certbot certonly --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare.ini -d jithendar.com,*.jithendar.com --preferred-challenges dns-01 --dns-cloudflare-propagation-seconds 30