#!/usr/bin/env bash

set -e

docker build --platform linux/amd64 \
  --build-arg ENV_CONTENT="$(cat .env)" \
  -t ghcr.io/windbit/ion-token-minter .
docker push ghcr.io/windbit/ion-token-minter

ssh infra 'set -e
cd /srv/ion-minter
docker compose pull ion-token-minter
docker compose up -d ion-token-minter'
