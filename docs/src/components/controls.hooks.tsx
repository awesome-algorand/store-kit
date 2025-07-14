import React, {
  createContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { bearStore } from "@/store.ts";
import { useStore } from "@tanstack/react-store";
import type { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import type { Address } from "algosdk";
import { useNetwork, useWallet } from "@txnlab/use-wallet-react";
import { deepMerge, toMBR } from "@awesome-algorand/store-kit/objects";

export type ControlState = {
  balance: bigint;
  address: string | null;
  network: string | null;
  contract: {
    appId: bigint | null;
    address: Address | null;
    balance: bigint | null;
    stats: {
      mbr: AlgoAmount | null;
      keys: number | null;
    };
  };
};

export type ControlsContextState = {
  isError: Error | null;
  setError: (error: Error) => void;
  state: ControlState;
};
export const ControlsContext = createContext<ControlsContextState | null>(null);

export function useControls() {
  const context = React.useContext(ControlsContext);
  if (!context)
    throw new Error("useControls must be used within a ControlsProvider");
  return context;
}

export function UseControls({ children }: { children: ReactNode }) {
  const bears = useStore(bearStore);
  const manager = useWallet();
  const [error, setError] = useState<Error | null>(null);

  const [mbr, setMBR] = useState<AlgoAmount>(0n as unknown as AlgoAmount);
  const [appId, setAppId] = useState<bigint | null>(null);
  const [walletBalance, setWalletBalance] = useState(0n);
  const [appBalance, setAppBalance] = useState(0n);
  const { activeNetwork, activeNetworkConfig } = useNetwork();

  useEffect(() => {
    if (!manager.isReady || !bearStore.appId) return;
    if (bearStore.appId !== appId) {
      setAppId(bearStore.appId);
    }

    bearStore.balance().then((b) => {
      setAppBalance(b);
    });
  }, [manager.isReady, bearStore.appId, bears]);

  useEffect(() => {
    if (!manager.isReady) return;
    // TODO: Handle network changes
  }, [activeNetwork]);

  // Update MBR Data
  useEffect(() => {
    if (!manager.activeAddress || !manager.isReady || !bearStore.client) return;
    bearStore.assemble().then((boxData) => {
      const result = toMBR(deepMerge(bears, boxData)).microAlgo();
      setMBR(result);
    });
  }, [bears]);

  // Update Wallet
  useEffect(() => {
    if (!manager.activeAddress || !manager.isReady) return;
    manager.algodClient
      .accountInformation(manager.activeAddress)
      .do()
      .then((r) => {
        setWalletBalance(r.amount);
      });
  }, [manager]);

  return (
    <ControlsContext.Provider
      value={{
        isError: error,
        setError,
        state: {
          address: manager.activeAddress,
          balance: walletBalance,
          network: activeNetwork,
          contract: {
            appId: bearStore.appId,
            balance: appBalance,
            address: bearStore.client?.appAddress || null,
            stats: {
              mbr: mbr,
              keys: bearStore.toChunks().flatMap((v) => v).length,
            },
          },
        },
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
