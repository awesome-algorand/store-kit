import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { bearStore } from "@/store.ts";
import { ModalToggle } from "@/components/wallet/modal-toggle.tsx";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import type { WalletManager } from "@txnlab/use-wallet";
import type { ControlsContextState } from "@/components/controls.hooks.tsx";

function AccountDetailsHeader({
  manager,
  controls,
}: {
  manager: WalletManager;
  controls: ControlsContextState;
}) {
  if (!manager.activeWallet) {
    return null;
  }
  return (
    <CardHeader>
      <CardTitle className="truncate">
        {manager.activeAddress || "Unknown"}
      </CardTitle>
      <CardDescription className="truncate">
        Wallet Balance: {controls.state.balance} <strong>ALGO</strong>
      </CardDescription>
    </CardHeader>
  );
}

function ApplicationDetails({ controls }: { controls: ControlsContextState }) {
  return (
    <CardContent>
      <p>
        App Balance: {controls.state.contract.balance?.microAlgo().algos}{" "}
        <strong>ALGO</strong>
      </p>
      <p>
        MBR: {controls.state.contract.stats.mbr?.algos} <strong>ALGO</strong>
      </p>
      <p>Transactions: {bearStore.toChunks().flatMap((v) => v).length}</p>
    </CardContent>
  );
}

export function Controls({
  open,
  onOpenChange,
  controls,
  manager,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  controls: ControlsContextState;
  manager: WalletManager;
  isLoading: boolean;
}) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className={`not-content space-y-2 border-2 border-b-background ${open ? "rounded-xl" : "rounded-3xl"} mt-6`}
    >
      <div className="flex items-center justify-between space-x-4 pr-4">
        <ModalToggle />
        <div>
          {manager.activeWallet && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
      </div>
      <CollapsibleContent>
        <Card className={"rounded-b-xl rounded-t-none bg-background"}>
          <AccountDetailsHeader controls={controls} manager={manager} />
          <ApplicationDetails controls={controls} />
          <CardFooter>
            {controls.state.contract.appId && (
              <a
                target="_blank"
                href={`https://lora.algokit.io/${controls.state.network}/application/${controls.state.contract.appId}`}
                rel="noreferrer"
              >
                Open in Lora
              </a>
            )}
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
