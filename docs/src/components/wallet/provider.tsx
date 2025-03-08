import '@/tailwind.css'
import type {ReactNode} from "react";
import {WalletProvider} from "@txnlab/use-wallet-react";
import {walletManager} from "@/store";

/**
 * Wallet Provider
 *
 * @param children
 * @constructor
 */
export function UseWallet({children}: {children: ReactNode}) {
  return (
    <WalletProvider manager={walletManager}>
      {children}
    </WalletProvider>
  )
}
