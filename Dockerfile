# Сборка
FROM node:22-alpine AS builder

ARG REACT_APP_ION_RPC_URL
ARG REACT_APP_ION_RPC_URL_TESTNET
ARG REACT_APP_ION_API_KEY
ARG REACT_APP_MANIFEST_URL

WORKDIR /app

RUN apk add bash

RUN bash -c "env | grep REACT_APP || true"

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

ARG ENV_CONTENT

RUN bash -c "echo $ENV_CONTENT > .env"
COPY . .

RUN npm run build

# Копирование статики в контейнер с Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
