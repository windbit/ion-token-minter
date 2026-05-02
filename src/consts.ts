import { getNetwork } from "./lib/hooks/useNetwork";
const ROUTES = {
  deployer: "/",
  jetton: "/jetton",
  jettonId: "/jetton/:id",
};

const APP_GRID = 1156;

const LOCAL_STORAGE_PROVIDER = "wallet_provider";

const APP_DISPLAY_NAME = "ION MINTER";

const JETTON_DEPLOYER_CONTRACTS_GITHUB = "https://github.com/windbit/ion-minter-contract";

const JETTON_DEPLOYER_WEBCLIENT_GITHUB = "https://github.com/windbit/ion-token-minter";

const JETTON_BEST_PRACTICES_URL = `${JETTON_DEPLOYER_CONTRACTS_GITHUB}#jetton-metadata-field-best-practices`;

const JETTON_SAFETY_URL = `${JETTON_DEPLOYER_CONTRACTS_GITHUB}#protect-yourself-and-your-users`;

const EXAMPLE_ADDRESS =
  getNetwork(new URLSearchParams(window.location.search)) === "testnet"
    ? "EQBP4L9h4272Z0j_w9PE2tjHhi8OwkrRbTmatKszMyseis05"
    : "EQD-LkpmPTHhPW68cNfc7B83NcfE9JyGegXzAT8LetpQSRSm";

const SEARCH_HISTORY = "searchHistory";

export {
  ROUTES,
  LOCAL_STORAGE_PROVIDER,
  APP_GRID,
  JETTON_DEPLOYER_CONTRACTS_GITHUB,
  JETTON_DEPLOYER_WEBCLIENT_GITHUB,
  JETTON_BEST_PRACTICES_URL,
  JETTON_SAFETY_URL,
  APP_DISPLAY_NAME,
  EXAMPLE_ADDRESS,
  SEARCH_HISTORY,
};
