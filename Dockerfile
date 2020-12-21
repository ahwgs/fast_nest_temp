FROM node

MAINTAINER ahwgs <ah_wgs@126.com>

COPY --chown=app:app . /app/src

# RUN cd /app/src && \
#   rm -rf node_modules && \
#   npm install cnpm --registry=https://registry.npm.taobao.org && \
#   cnpm run install && \
#   cnpm run build && \
#   cnpm run start && \
#   rm -rf node_modules 

RUN cd /app/src && \
  npm run build && \
  rm -rf node_modules 

WORKDIR /app/src
