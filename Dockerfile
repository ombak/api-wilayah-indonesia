FROM node:alpine as base

RUN apk update && apk upgrade

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package*.json .

RUN rm -rf node_modules \
    && npm install --global nodemon \
    && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
