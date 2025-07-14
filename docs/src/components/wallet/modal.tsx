import React from "react";
import { useStore } from "@tanstack/react-store";
import { useWallet, useNetwork } from "@txnlab/use-wallet-react";
import { bearStore, DEFAULT_STATE, isModalOpen } from "@/store";
import { UseWallet } from "@/hooks/use-wallet.tsx";
import { List } from "./list.tsx";
import { NetworkToggle } from "@/components/network/network-toggle.tsx";
import { Button } from "../ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils.ts";

function ReactModal() {
  const $isModalOpen = useStore(isModalOpen);
  const manager = useWallet();
  const { activeNetwork } = useNetwork();
  return (
    <div
      className={`relative z-10 ${$isModalOpen ? "" : "hidden"}`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 z-auto w-screen h-screen transition-opacity bg-stone-950 ${$isModalOpen ? "opacity-80" : "opacity-0"}`}
        aria-hidden={!$isModalOpen}
      ></div>
      <div
        className={cn(
          "fixed inset-0 z-10 w-screen flex min-h-full items-center justify-center",
          `transition-opacity ${$isModalOpen ? "opacity-100" : "opacity-0"}`,
        )}
      >
        <Card
          style={{
            minWidth: "400px",
          }}
        >
          <CardHeader>
            <CardTitle>Configure Wallet</CardTitle>
            <CardDescription>Network: {activeNetwork}</CardDescription>
          </CardHeader>
          <CardContent>
            <List
              onConnect={async () => {
                await bearStore.init();
                isModalOpen.setState(() => false);
              }}
            />
          </CardContent>
          <CardFooter className={cn("sm:flex sm:flex-row-reverse sm:px-6")}>
            {manager.activeWallet?.isConnected && (
              <Button
                variant="destructive"
                onClick={() => {
                  manager.activeWallet?.disconnect().then(async () => {
                    isModalOpen.setState(() => false);
                    await bearStore.destroy(DEFAULT_STATE);
                  });
                }}
              >
                Deactivate
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => isModalOpen.setState(() => false)}
            >
              Cancel
            </Button>
            {/*<NetworkToggle />*/}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export function Modal() {
  return (
    <UseWallet>
      <ReactModal />
    </UseWallet>
  );
}
