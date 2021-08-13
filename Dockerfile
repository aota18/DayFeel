FROM nginx:latest

VOLUME /dayfeel-app

ADD ./deploy/default.conf /etc/nginx/conf.d/default.conf

ADD ./build /usr/share/nginx/html
