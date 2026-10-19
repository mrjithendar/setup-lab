FROM wordpress:php8.3-apache

ARG REDIS_VERSION=6.1.0
# Keep compilation memory bounded on small EC2/Lightsail instances.
ARG BUILD_JOBS=2

# Redis uses its default serializer; no extra compression libraries required.
RUN set -eux; \
    case "$BUILD_JOBS" in ''|*[!0-9]*|0) echo 'BUILD_JOBS must be a positive integer' >&2; exit 1;; esac; \
    MAKEFLAGS="-j${BUILD_JOBS}" pecl install "redis-${REDIS_VERSION}" \
    && docker-php-ext-enable redis \
    && rm -rf /tmp/pear \
    && php -r 'exit(extension_loaded("redis") && class_exists("Redis") ? 0 : 1);'

# PHP setting changes reuse the cached Redis compilation layer.
COPY php.ini /usr/local/etc/php/conf.d/uploads.ini
