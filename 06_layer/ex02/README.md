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

Beweis:

docker build -t layerapp:v01 .

 => [internal] load build definition from Dockerfile                                                                                                                         0.0s
 => => transferring dockerfile: 182B                                                                                                                                         0.0s
 => [internal] load .dockerignore                                                                                                                                            0.0s
 => => transferring context: 52B                                                                                                                                             0.0s
 => [internal] load metadata for docker.io/library/node:20.5.0-alpine                                                                                                        4.1s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                  0.0s
 => [1/5] FROM docker.io/library/node:20.5.0-alpine@sha256:59ecf4c430fc6e15b3e6f2ee3ae8fa9773b2508856baf376fcd9ad7b1e6934a9                                                  0.0s
 => => resolve docker.io/library/node:20.5.0-alpine@sha256:59ecf4c430fc6e15b3e6f2ee3ae8fa9773b2508856baf376fcd9ad7b1e6934a9                                                  0.0s
 => [internal] load build context                                                                                                                                            0.0s
 => => transferring context: 252B                                                                                                                                            0.0s
 => CACHED [2/5] RUN adduser -D dev                                                                                                                                          0.0s
 => CACHED [3/5] WORKDIR /home/dev                                                                                                                                           0.0s
 => CACHED [4/5] COPY --chown=dev . /home/dev                                                                                                                                0.0s
 => [5/5] RUN npm install                                                                                                                                                    2.1s
 => exporting to image                                                                                                                                                       0.1s
 => => exporting layers                                                                                                                                                      0.1s
 => => writing image sha256:dc06f1a2bddbb23aa320cda2c6563eddd469e046ed31b68de8b7878f4d3cbee9                                                                                 0.0s
 => => naming to docker.io/library/layerapp:v01  



 [+] Building 6.7s (11/11) FINISHED                                                                                                                                          docker:default
 => [internal] load build definition from Dockerfile                                                                                                                                  0.0s
 => => transferring dockerfile: 182B                                                                                                                                                  0.0s
 => [internal] load .dockerignore                                                                                                                                                     0.0s
 => => transferring context: 52B                                                                                                                                                      0.0s
 => [internal] load metadata for docker.io/library/node:20.5.0-alpine                                                                                                                 4.4s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                           0.0s
 => [1/5] FROM docker.io/library/node:20.5.0-alpine@sha256:59ecf4c430fc6e15b3e6f2ee3ae8fa9773b2508856baf376fcd9ad7b1e6934a9                                                           0.0s
 => => resolve docker.io/library/node:20.5.0-alpine@sha256:59ecf4c430fc6e15b3e6f2ee3ae8fa9773b2508856baf376fcd9ad7b1e6934a9                                                           0.0s
 => [internal] load build context                                                                                                                                                     0.0s
 => => transferring context: 397B                                                                                                                                                     0.0s
 => CACHED [2/5] RUN adduser -D dev                                                                                                                                                   0.0s
 => CACHED [3/5] WORKDIR /home/dev                                                                                                                                                    0.0s
 => [4/5] COPY --chown=dev . /home/dev                                                                                                                                                0.0s
 => [5/5] RUN npm install                                                                                                                                                             2.1s
 => exporting to image                                                                                                                                                                0.1s
 => => exporting layers  


 -> Lösung:

 FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev package.json /home/dev 
COPY --chown=dev package-lock.json /home/dev

RUN npm install

COPY --chown=dev . /home/dev 

CMD ["node", "app.js"]


# Speicherbedarf

docker images

docker build -t layerapp1:v01 .

REPOSITORY       TAG       IMAGE ID       CREATED          SIZE
layerapp1        v01       b0c61baa2c34   11 seconds ago   186MB
layerapp         v01       c2bbd941972a   22 minutes ago   186MB
<none>           <none>    dc06f1a2bddb   52 minutes ago   186MB

Mit Hilfe des Layer-Konzepts erkennt Docker, dass immer dasselbe Base Image verwendet wird.
-> layerapp und layerapp1 haben in Wahrheit keinen Speicherplatzbedarf von 186 MB, dies ist nur der aggregierte Wert.

# Anzahl Layer minimieren

RUN-Kommandos mit && verketten

Bsp.:

FROM node:20.5.0-alpine

RUN adduser -D dev
USER dev

WORKDIR /home/dev

COPY --chown=dev . /home/dev 

RUN apk update
RUN apk add curl
RUN npm install

# best practise
# RUN apk update && apk add curl && npm install

CMD ["node", "app.js"]




