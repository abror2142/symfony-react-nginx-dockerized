FROM php:8.2-fpm

RUN apt-get update && apt-get install zip unzip && docker-php-ext-install pdo pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /symfony

RUN chown -R www-data:www-data /symfony

COPY ./composer.* .

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY . .


RUN composer dump-autoload --optimize
