docker pull node:16.20-alpine

-> 4 Layer:
16.20-alpine: Pulling from library/node
31e352740f53: Already exists 
a1e50b3961de: Pull complete 
fdc5b5e5fbfe: Pull complete 
55fd4a41ee80: Pull complete 
Digest: sha256:6c381d5dc2a11dcdb693f0301e8587e43f440c90cdb8933eaaaabb905d44cdb9
Status: Downloaded newer image for node:16.20-alpine
docker.io/library/node:16.20-alpine

Layer: Wann immer Änderungen an einem Image vorgenommen werden, entsteht ein neuer Layer
    - Also: Wenn Änderungen an einem Image vorgenommen werden, entsteht ein neues Image (ein Image ist immutabel)  
    - Neues Image: Delta zum vorhergehenden Image (keine komplette Kopie)
    - Analogie: Stapel von Klarsichtfolien, die übereinanderliegen, jedes neue Image enthält nur die Änderungen  


# 2 Scratch-Image

Leeres Image, wird benötigt, wenn man ein komplett neues Image erstellt (ohne verfügbare Base Images)

Dockerfile

FROM scratch

-> Bestimmte Befehle erzeugen bei Ausführung einen eigenen Layer:
    RUN
    COPY
    ADD
-> Befehle ohne Erzeugung eines Layers (verändern nur Eigenschaften eines bestehenden Images):
    WORKDIR
    CMD

Obergrenze: 127 Layer

Ziel: Anzahl der Layewr minimieren#


# 3 Warum gibt es Layer?

## 3.1 Caching

docker build verwendet intern einen Cache, und die Layer werden nur dann neu erzeugt, wenn diese nicht bereits vorhanden sind.

-> Beispiel (app.js)

FROM node:16.20-alpine

ADD . .

CMD ["node", "app.js"]

docker build -t layerapp .


[+] Building 0.1s (7/7) FINISHED                                                                                                                                            docker:default
 => [internal] load .dockerignore                                                                                                                                                     0.0s
 => => transferring context: 2B                                                                                                                                                       0.0s
 => [internal] load build definition from Dockerfile                                                                                                                                  0.0s
 => => transferring dockerfile: 94B                                                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:16.20-alpine                                                                                                                  0.0s
 => [internal] load build context                                                                                                                                                     0.0s
 => => transferring context: 2.12kB                                                                                                                                                   0.0s
 => [1/2] FROM docker.io/library/node:16.20-alpine                                                                                                                                    0.0s
 => [2/2] ADD . .                                                                                                                                                                     0.0s
 => exporting to image                                                                                                                                                                0.0s
 => => exporting layers                                                                                                                                                               0.0s
 => => writing image sha256:8eacb64bf2581f1adf9f0c742f38db17178bf546e35681a928fe987b5bf7a911                                                                                          0.0s
 => => naming to docker.io/library/layerapp 


 -> Änderung des Codes (z.B. Änderung der Message)

 [+] Building 0.1s (7/7) FINISHED                                                                                                                                            docker:default
 => [internal] load .dockerignore                                                                                                                                                     0.0s
 => => transferring context: 2B                                                                                                                                                       0.0s
 => [internal] load build definition from Dockerfile                                                                                                                                  0.0s
 => => transferring dockerfile: 94B                                                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:16.20-alpine                                                                                                                  0.0s
 => [internal] load build context                                                                                                                                                     0.0s
 => => transferring context: 4.43kB                                                                                                                                                   0.0s
 => CACHED [1/2] FROM docker.io/library/node:16.20-alpine                                                                                                                             0.0s
 => [2/2] ADD . .                                                                                                                                                                     0.0s
 => exporting to image                                                                                                                                                                0.0s
 => => exporting layers                                                                                                                                                               0.0s
 => => writing image sha256:ca64ab4c85479d96f3188f21155e9f670d96878a476cb95971f98bcf13211231                                                                                          0.0s
 => => naming to docker.io/library/layerapp  

 -> bis ADD gecacht

 Caching kann deaktiviert werden mit --no-cache

 ADD berechnet einen Hashwert für das komplette Verzeichnis
