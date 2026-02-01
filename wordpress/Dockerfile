FROM wordpress:php8.2-apache

# Install redis PHP extension
RUN pecl install redis \
    && docker-php-ext-enable redis

# Optional but recommended: install opcache (usually already enabled)
RUN docker-php-ext-install opcache