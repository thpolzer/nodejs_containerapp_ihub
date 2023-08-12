FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev . /home/dev 

RUN npm install

CMD ["node", "app.js"]

###############################

 FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev package.json /home/dev 
COPY --chown=dev package-lock.json /home/dev

RUN apk add curl && \
    npm install

COPY --chown=dev . /home/dev 

CMD ["node", "app.js"]