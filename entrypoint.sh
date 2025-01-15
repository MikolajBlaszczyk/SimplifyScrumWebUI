#!/bin/sh

# Substitute environment variables in the Nginx configuration template
envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx
exec "$@"