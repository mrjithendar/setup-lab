FROM wordpress:php8.3-apache

# Redis uses its default serializer; no extra compression libraries required.
RUN pecl install redis-6.1.0 \
    && docker-php-ext-enable redis \
    && rm -rf /tmp/pear
COPY php.ini /usr/local/etc/php/conf.d/uploads.ini
