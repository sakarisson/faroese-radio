FROM node:carbon
WORKDIR /app

RUN npm i -g nodemon babel-cli create-react-app concurrently

COPY wait-for-it.sh /wait-for-it.sh 
RUN chmod +x /wait-for-it.sh

EXPOSE 7777
