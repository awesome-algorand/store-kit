import clsx from "clsx";
import {useWallet} from "@txnlab/use-wallet-react";



export function List({className}: {className?: string}) {
  const walletManager = useWallet()
  return (
    <div
      className={clsx([
        className,
        "mt-2",
        "bg-stone-950",
        "rounded-md",
      ])}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}>
      {walletManager.wallets.map((wallet, index) => (
        <button key={wallet.id} onClick={wallet.connect} className="gap-2 p-2 text-sm flex items-center max-h-10 overflow-hidden" role="menuitem" tabIndex={-1} id="menu-item-0"><img className="h-8 w-8" alt={`${wallet.metadata.name} logo`} src={wallet.metadata.icon}/>{wallet.metadata.name}</button>
      ))}
    </div>
  )
}
