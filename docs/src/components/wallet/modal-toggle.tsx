import React from "react";
import type { ReactNode } from "react";

import { useStore } from "@tanstack/react-store";
import { useWallet } from "@txnlab/use-wallet-react";
import { isModalOpen } from "@/store";
import { Icon, WalletIcon } from "./icons.tsx";
import { UseWallet } from "@/hooks/use-wallet.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useLoading } from "@/hooks/use-loading.tsx";
import { Button } from "@/components/ui/button.tsx";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex text-center align-center items-center justify-center">
      {children}
    </div>
  );
}
function ReactModalToggle() {
  const manager = useWallet();
  const $isModalOpen = useStore(isModalOpen);
  const isLoading = useLoading();
  if (isLoading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Button
        className="rounded-3xl"
        onClick={() => {
          isModalOpen.setState(() => !$isModalOpen);
        }}
      >
        {manager.isReady && manager.activeWallet && (
          <WalletIcon className="rounded-3xl" />
        )}
        {!manager.activeWallet && <Icon alt="Wallet Icon">Connect Wallet</Icon>}
      </Button>
    </Wrapper>
  );
}
export function ModalToggle() {
  return (
    <UseWallet>
      <ReactModalToggle />
    </UseWallet>
  );
}
