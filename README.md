# ION Minter — Webclient

An open source token deployer webapp for the ION (Ice Open Network) blockchain, based on the [token contracts starter template](https://github.com/windbit/ion-minter-contract).

## How to use

Make sure you have an ION wallet with at least 1.25 ION balance.

Open the deploy form in your web browser: https://ion-minter.windbit.dev

To use the Testnet version open this link: https://ion-minter.windbit.dev?testnet=true

> Safety Notice: The form is based on this repo and served from the Docker image at `ghcr.io/windbit/ion-token-minter`.

Click the "Connect Wallet" button to connect your wallet.

Fill in the information about your token in the form — choose a name, ticker and image URL.

Deploy and approve the deploy transaction in your wallet.

Once the token is deployed, the deploying wallet will receive all the tokens that were minted, and the form will encourage you to revoke ownership.

## Forking / Running your own instance

> This project is based on [create-react-app](https://create-react-app.dev/).

Clone or fork the project.

Run `npm install`

Copy `.env.example` to `.env` and adjust values if needed.

Run `npm start`

Open `http://localhost:3000`

## Is this tool safe?

Yes. See https://github.com/windbit/ion-minter-contract#qa-is-this-contract-deployer-safe

# License

MIT
