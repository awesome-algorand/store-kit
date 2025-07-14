import { Store } from "@tanstack/store";
import {
  NetworkId,
  WalletId,
  WalletManager,
  type WalletManagerConfig,
} from "@txnlab/use-wallet";
import { Store as StoreKit } from "@awesome-algorand/store-kit";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ClientManager } from "@algorandfoundation/algokit-utils/types/client-manager";
import { QueryClient } from "@tanstack/react-query";
// Disable prompt for password
globalThis.prompt = () => {
  return "";
};
export const options = {
  wallets: [WalletId.KMD],
  defaultNetwork: NetworkId.LOCALNET,
};

// Create a manager instance
export const walletManager = new WalletManager(options as WalletManagerConfig);

function getIndexerFromManager(manager: WalletManager) {
  switch (manager.activeNetwork) {
    case NetworkId.MAINNET:
      return {
        server: "https://mainnet-idx.4160.nodely.dev",
        token: "",
        port: 443,
      };
    case NetworkId.TESTNET:
      return {
        server: "https://testnet-idx.4160.nodely.dev",
        token: "",
        port: 443,
      };
    case NetworkId.FNET:
      return {
        server: "https://fnet-idx.4160.nodely.dev",
        token: "",
        port: 443,
      };
    case NetworkId.LOCALNET:
      return {
        server: "http://localhost",
        token:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        port: 8980,
      };
    default:
      throw new Error("Invalid network");
  }
}
const algorand = AlgorandClient.fromClients({
  algod: walletManager.algodClient,
  indexer: ClientManager.getIndexerClient(getIndexerFromManager(walletManager)),
});
export const isModalOpen = new Store(false);

export const queryClient = new QueryClient();

export const DEFAULT_STATE = {
  count: 5,
  type: "Grizzly",
};
export const bearStore = new StoreKit(DEFAULT_STATE, { sync: false })
  .setAlgorand(algorand)
  .setManager(walletManager);

if (walletManager.activeAddress) {
  bearStore.init();
}
