FROM node:carbon
WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm i

RUN npm i -g nodemon babel-cli

COPY . .

COPY wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

EXPOSE 7777
