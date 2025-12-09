FROM node:18.20.8-slim

WORKDIR /app
ADD . /app
RUN npm i

EXPOSE 8080

ENTRYPOINT ["node","app.js"]