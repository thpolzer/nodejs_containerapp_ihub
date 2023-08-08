# Beispiel mit Dependencies

Dockerfile:

FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev . /home/dev 

RUN npm install

CMD ["node", "app.js"]


################# Problem #################

Jedes Mal, wenn im Code etwas geändert wird, wird im COPY-Befehl der Cache invalidiert und damit erneut npm install ausgeführt

