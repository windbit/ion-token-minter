import { TonClient } from "ton";
import { getNetwork } from "./hooks/useNetwork";

const MAINNET_DEFAULT = "https://api.mainnet.ice.io/http/v2/jsonRPC";
const TESTNET_DEFAULT = "https://api.testnet.ice.io/http/v2/jsonRPC";

function getEndpointUrl(): string {
  const network = getNetwork(new URLSearchParams(window.location.search));

  if (network === "testnet") {
    return process.env.REACT_APP_ION_RPC_URL_TESTNET || TESTNET_DEFAULT;
  }

  return process.env.REACT_APP_ION_RPC_URL || MAINNET_DEFAULT;
}

const endpoint = getEndpointUrl();
const apiKey = process.env.REACT_APP_ION_API_KEY;

const client = new TonClient({ endpoint, apiKey });

export async function getClient() {
  return client;
}

export async function getEndpoint() {
  return endpoint;
}
