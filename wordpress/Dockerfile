FROM wordpress:php8.2-fpm

RUN pecl install redis \
    && docker-php-ext-enable redis