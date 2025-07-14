import type { ReactNode } from "react";
import { WalletProvider, useWallet } from "@txnlab/use-wallet-react";
import { walletManager } from "@/store";
import type { Wrapper } from "@/hooks/types.ts";
import { withLoading } from "@/hooks/use-loading.tsx";

/**
 * Wallet Provider
 *
 * @param children
 * @constructor
 */
export function UseWallet({ children }: { children: ReactNode }) {
  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
}
