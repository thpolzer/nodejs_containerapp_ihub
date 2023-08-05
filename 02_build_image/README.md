#1 Dockerfile

https://hub.docker.com/_/node

FROM node:20.4.0

ADD . .

CMD ["node", "app.js"]

#2 Run

docker build -t simpleapp .