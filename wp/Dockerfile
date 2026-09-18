FROM wordpress:php8.3-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libzstd-dev \
        liblz4-dev \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get purge -y --auto-remove \
        libzstd-dev \
        liblz4-dev \
    && rm -rf /var/lib/apt/lists/*