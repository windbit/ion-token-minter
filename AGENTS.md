# ION Minter

## Описание проекта

ION Minter — веб-приложение для деплоя Jetton-контрактов в сети ION (Ice Open Network).

### Ключевые возможности

- Deploy Jetton-контракта через форму с onchain/offchain метаданными
- Просмотр деталей задеплоенного jetton (адрес, total supply, metadata)
- Mint / Burn / Revoke ownership / Update metadata через UI
- Подключение ION-кошелька через `@ion-gateway/ui-react`
- Поддержка mainnet и testnet (через query-параметр `?testnet=true`)

## Разработка проекта

### Первый запуск

1. Убедитесь, что у вас установлены `npm` и `node` (см. `.nvmrc`, если он появится; иначе — Node 22+).
2. В корне выполните `npm install` для установки зависимостей.
3. Скопируйте `.env.example` в `.env` и при необходимости подправьте значения.
4. Запустите `npm start` для старта в режиме разработки.

### Переменные окружения

- `REACT_APP_ION_RPC_URL` — URL ION RPC mainnet (jsonRPC v2). По умолчанию `https://api.mainnet.ice.io/http/v2/jsonRPC`.
- `REACT_APP_ION_RPC_URL_TESTNET` — URL ION RPC testnet. По умолчанию `https://api.testnet.ice.io/http/v2/jsonRPC`.
- `REACT_APP_ION_API_KEY` — API-ключ для RPC (опционально).
- `REACT_APP_MANIFEST_URL` — URL `tonconnect-manifest.json` для `@ion-gateway/ui-react`. По умолчанию `https://ion-minter.windbit.dev/tonconnect-manifest.json`.

### Скрипты

- `npm start` — режим разработки (CRA dev server).
- `npm run build` — сборка для продакшена (`build/` + копия `index.html` как `404.html`).
- `npm test` — запуск unit-тестов (Jest через `react-app-rewired`).

### Деплой

- `Dockerfile` собирает приложение в multi-stage и упаковывает статику в `nginx:alpine`.
- `scripts/deploy.sh` — собирает образ `ghcr.io/windbit/ion-token-minter`, пушит в GHCR и через `ssh infra` подтягивает его на инфре в `/srv/ion-minter`.
- `deploy/nginx.conf` — конфиг nginx с SPA-фолбэком и динамическим `tonconnect-manifest.json` (по `$host`).

## TODO (после миграции)

### Брендинг и ассеты

- `public/favicon.ico`, `public/logo192.png`, `public/logo512.png`, `public/og-image.jpg`, `src/assets/icons/logo.svg` — скопированы из `ion-dns-frontend` как временный плейсхолдер. Нужны финальные ION-Minter-ассеты (favicon, OG-картинка с подписью «ION Minter»).
- `src/assets/icons/coin-logo.svg` — серая jetton-плейсхолдер-иконка, не TON-брендирована, оставлена как есть. Если хочется фирменный fallback — заменить.
- `public/og-image.jpg` — текущий файл с картинкой ION DNS оставлен в репозитории, но `og:image` / `twitter:image` / `itemprop=image` мета-теги в `public/index.html` временно удалены, чтобы DNS-картинка не вылезала в превью соцсетей. После создания минтер-специфичной картинки заменить файл и вернуть мета-теги (`og:image`, `og:image:width=1200`, `og:image:height=630`, `twitter:image`, `twitter:card=summary_large_image`).

### TonConnect / ION Wallet

- Подтвердить, что `@ion-gateway/ui-react@^2.1.1-beta.0` совместим с текущим набором `@ton/*` пакетов в `ion-token-minter` (тут используется legacy-пакет `ton@^12.1.5`, не `@ton/ton`).
- При желании — обновить `ton@^12.1.5` → `@ton/ton@^16` по аналогии с `ion-dns-frontend` (потребует адаптации `lib/jetton-minter.ts`, `lib/contract-deployer.ts` и т.д., объём отдельной задачи).

### RPC / эксплорер

- `src/utils/index.ts#scannerUrl` теперь возвращает `https://explorer.ice.io/address` для всех случаев (sandbox/mainnet/jetton). Уточнить, есть ли в `explorer.ice.io` отдельный путь `/jetton/` для Jetton-контрактов и обновить, если есть.
- Sandbox-режим (`?sandbox`) ранее использовал `sandbox.tonwhales.com` — сейчас тоже идёт на `explorer.ice.io`. Если sandbox в ION-инфре есть — добавить отдельный URL.

### Соцсети / поддержка

- Из футера убраны Telegram-канал и Orbs-attribution. При появлении ION-каналов — добавить.
- Footer copyright `© windbit` — заменить на финальную формулировку (например, `© ION` или название юрлица).

### Контракт

- Описание формы и popup'ы ссылаются на `windbit/ion-minter-contract`. Этот репозиторий должен существовать (форк `ton-blockchain/minter-contract`) с актуальными разделами `#jetton-metadata-field-best-practices` и `#protect-yourself-and-your-users` — иначе ссылки в UI будут 404.

### Тесты

- `src/App.test.tsx` тестирует сериализацию контракта, не TON-брендинг — менять не требуется.
- При апгрейде `@ton/ton`/`@ton/core` пересобрать тесты.

### Прочее

- Скрипт `deploy: gh-pages -d build` и devDep `gh-pages` удалены — переехали на Docker-деплой.
- `@orbs-network/ton-access` удалён, RPC-эндпоинт читается из env (см. `src/lib/get-ton-client.ts`).
