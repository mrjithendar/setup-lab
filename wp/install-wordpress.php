<?php
// Run only through docker compose exec; this file is not served by Apache.
define('WP_INSTALLING', true);
require '/var/www/html/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/upgrade.php';
if (is_blog_installed()) {
    fwrite(STDOUT, "WordPress is already installed; existing administrator preserved.\n");
    exit(0);
}
$_SERVER['HTTP_HOST'] = getenv('DOMAIN');
$_SERVER['HTTPS'] = 'on';
$result = wp_install(getenv('DOMAIN'), getenv('WORDPRESS_ADMIN_USER'),
    getenv('WORDPRESS_ADMIN_EMAIL'), true, '', getenv('SHARED_PASSWORD'));
if (is_wp_error($result)) {
    fwrite(STDERR, "WordPress installation failed.\n");
    exit(1);
}
update_option('home', 'https://' . getenv('DOMAIN'));
update_option('siteurl', 'https://' . getenv('DOMAIN'));
fwrite(STDOUT, "WordPress administrator created using the shared AWS password.\n");
