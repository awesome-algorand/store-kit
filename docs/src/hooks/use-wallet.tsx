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
function withWallet<TProps>(Component: any) {
  return (props: TProps) => {
    const manager = useWallet();
    return <Component manager={manager} {...props} />;
  };
}
export function withManager<TProps>(Component: any) {
  return (props: TProps) => {
    const HoC = withWallet<TProps>(withLoading<TProps>(Component));
    return (
      <UseWallet>
        <HoC {...props} />
      </UseWallet>
    );
  };
}
