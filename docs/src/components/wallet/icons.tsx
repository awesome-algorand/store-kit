import React from "react";
import { cn } from "@/lib/utils";
import { useWallet } from "@txnlab/use-wallet-react";
import type { ReactNode } from "react";

export function WalletIcon({ className }: { className?: string }) {
  const manager = useWallet();
  if (manager.isReady && manager.activeWallet) {
    return (
      <Icon
        className={cn(className)}
        src={manager.activeWallet.metadata.icon}
        alt={`${manager.activeWallet.id} Icon`}
      >
        {manager.activeWallet.id}
      </Icon>
    );
  }
  return (
    <div className={cn("text-sm font-semibold disabled", className)}>
      Loading
    </div>
  );
}

export function Icon({
  src,
  alt,
  className,
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      {src && (
        <img
          src={src}
          alt={alt || "Icon Image"}
          className={cn("h-8 w-8", className)}
        />
      )}
      <span className="text-sm font-semibold">{children}</span>
    </div>
  );
}
