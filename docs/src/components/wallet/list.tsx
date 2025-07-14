import React from "react";
import clsx from "clsx";
import { useNetwork, useWallet } from "@txnlab/use-wallet-react";
import { NetworkId, WalletId } from "@txnlab/use-wallet";

export function List({
  className,
  onConnect,
}: {
  onConnect: () => void;
  className?: string;
}) {
  const walletManager = useWallet();
  const { activeNetwork } = useNetwork();

  const NETWORKS = [NetworkId.LOCALNET, NetworkId.FNET];
  const ALLOWED = [WalletId.KMD, WalletId.LUTE];
  return (
    <div
      className={clsx([className, "mt-2", "bg-stone-950", "rounded-md"])}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      {walletManager.wallets
        .filter(
          (w) =>
            (NETWORKS.includes(activeNetwork as NetworkId) &&
              ALLOWED.includes(w.id as WalletId)) ||
            !NETWORKS.includes(activeNetwork as NetworkId),
        )
        .map((wallet) => (
          <button
            key={wallet.id}
            onClick={async () => {
              await wallet.connect();
              onConnect();
            }}
            className="gap-2 p-2 text-sm flex items-center max-h-10 overflow-hidden"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            <img
              className="h-8 w-8"
              alt={`${wallet.metadata.name} logo`}
              src={wallet.metadata.icon}
            />
            {wallet.metadata.name}
          </button>
        ))}
    </div>
  );
}
