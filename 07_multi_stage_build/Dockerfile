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