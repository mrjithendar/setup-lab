#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# A rerun must not temporarily downgrade an existing HTTPS site.
mode=http
[[ ! -s "certbot/conf/live/$DOMAIN/fullchain.pem" ]] || mode=https
bash setup.sh "$mode"
# Initialize before enabling public application access.
bash compose.sh exec -T wordpress php < install-wordpress.php
bash issue-certificate.sh "$WORDPRESS_ADMIN_EMAIL"
bash install-renewal.sh
curl --fail --silent --show-error --output /dev/null "https://$DOMAIN/"
echo "Ready: https://$DOMAIN/wp-admin/ (password: AWS secret $DOMAIN)"
