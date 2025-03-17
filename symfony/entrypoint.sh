#!/bin/sh
set -e

php bin/console doctrine:migration:migrate --no-interaction
chown -R www-data:www-data /symfony/var /symfony/vendor
chmod -R 775 /symfony/var /symfony/vendor

exec php-fpm