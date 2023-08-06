FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

ENV MESSAGE "Hello IHUB developers!"

WORKDIR /home/dev

COPY --chown=dev . /home/dev 

RUN npm install

CMD ["node", "app.js"]
