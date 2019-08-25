FROM nginx:1.17.3

COPY config/proxy.conf /etc/nginx/conf.d/default.conf