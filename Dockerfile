FROM node:14.17.3-alpine3.11

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
