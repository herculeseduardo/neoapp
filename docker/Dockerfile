FROM node:12.2.0-alpine AS package

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./.sequelizerc /app/.sequelizerc
COPY ./docker/entrypoint.sh /app/entrypoint.sh

WORKDIR /app

RUN apk add --no-cache git python make g++
RUN npm install --only=production

FROM node:12.2.0-alpine
COPY --from=package /app /app
COPY ./src /app/src

WORKDIR /app

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]