# 1 Problemstellung

Es gibt Programmiersprachen, die nicht zur Laufzeit kompiliert werden, sondern zuvor, z.B C++, TypeScript, Scala

-> Problem: Wo packe ich den Compileschritt hin?

# 2 Konvertierung der Applikation in TypeScript

npm install @types/node @types/express

-> Installation Compiler


npm install typescript ts-node --save-dev
(ts-node=Wrapper, der es ermöglicht, dass TS mit node gestartet und zur Laufzeit kompiliert wird,
dev dependency -> wird nur zur Entwicklungszeit benötigt)

-> Starten
npx ts-node lib/app.ts

-> Kompilieren
npx tsc
(hierzu wird tsconfig.json benötigt)

-> Test: node build/app.js

# 3 Image erstellen

## Dockerfile

FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev package.json /home/dev 
COPY --chown=dev package-lock.json /home/dev

RUN npm install

COPY --chown=dev . /home/dev 

RUN npx tsc

CMD ["node", "app.js"]

######################
-> Problem: Das Image ist viel zu voll, denn der ganze Quellcode liegt ja noch drin, ebenso der TypeScript-Compiler und die Dec-Dependencies
######################

-> Mögliche Lösung: Aufräumen nach RUN npx install

FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev package.json /home/dev 
COPY --chown=dev package-lock.json /home/dev

RUN npm install

COPY --chown=dev . /home/dev 

RUN npx tsc

RUN rm -rf lib

CMD ["node", "app.js"]


Aber: Nutzt nichts, denn die vorherigen Layer werden ja nicht gelöscht, sondern es wird ein neuer Layer hinzugefügt!
Man macht das Problem dadurch also nur noch schlimmer:-(


# 4 Lösung: Multistage Build

-> Grundidee: In einem Dockerfile können mehrere Images definiert werden

Also:
- ein Image, in dem sich die Entwicklung-Dateien befinden
- ein ("Produktions-")Image, in dem sich die kompilierten Ergebnisse befinden

## Dockerfile

FROM node:20.5.0-alpine AS builder

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev package.json /home/dev 
COPY --chown=dev package-lock.json /home/dev

RUN npm install

COPY --chown=dev . /home/dev 

RUN npx tsc

# --------------------------------------------------------------

FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --from=builder /home/dev/package.json ./package.json
COPY --from=builder /home/dev/package-lock.json ./package-lock.json
COPY --from=builder /home/dev/build ./build
COPY --from=builder /home/dev/public ./public

# lib-Ordner (Entwicklungsartefakte) wird nicht übernommen, ebensowenig node_modules!

# keine dev-dependencies
RUN npm install --production

CMD ["node", "app.js"]



# 5 Test

## build
docker build -t multistage:v02 .

## Überprüfung der Image-Größe
docker images 

## Start des Containers
docker run --name multistageapp -p 3000:4000 multistage:v02

