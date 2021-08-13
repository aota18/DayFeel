FROM nginx:latest

VOLUME /

RUN rm -rf /etc/nginx/conf.d/default.conf

ADD ./deploy/default.conf /etc/nginx/conf.d/default.conf

ADD ./build /usr/share/nginx/html
