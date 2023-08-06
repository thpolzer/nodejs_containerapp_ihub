FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

ENV SERVERNAME localhost

WORKDIR /home/dev

# das ADD-Komando läuft standardmäßig unter root und muss nun auf node gemapped werden
ADD --chown=dev . /home/dev 
RUN npm install

CMD ["node", "app.js"]