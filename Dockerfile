FROM node:carbon
WORKDIR /app

COPY ./app .

RUN npm i

RUN npm i -g nodemon babel-cli

COPY wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

EXPOSE 7777
