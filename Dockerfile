FROM node:16 AS builder
ENV TZ=Europe/Kiev
WORKDIR /home
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build:prod
EXPOSE 3002
ENTRYPOINT ["node", "./dist/main.js"]