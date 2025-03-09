import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { bearStore } from "@/store.ts";
import { ModalToggle } from "@/components/wallet/modal-toggle.tsx";
import { useEffect, useState } from "react";
import { useWallet, useNetwork } from "@txnlab/use-wallet-react";
import { useStore } from "@tanstack/react-store";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useLoading } from "@/hooks/use-loading.tsx";
import { ClientManager } from "@algorandfoundation/algokit-utils/types/client-manager";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
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
import { deepMerge, toMBR } from "@awesome-algorand/store-kit/objects";
import type { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";

export function CheckboxWithLabel({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: CheckedState) => void;
}) {
  return (
    <div className="not-content items-top flex space-x-2 items-center justify-center">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}

export function StateButton() {
  useStore(bearStore);
  const isLoading = useLoading();
  const manager = useWallet();

  const ACTIONS: { [k: string]: () => any } = {
    unknown: () => bearStore.init(),
    ready: () => bearStore.save(),
  };
  const LABELS: { [k: string]: any } = {
    unknown: "Deploy",
    loading: <Spinner />,
    ready: "Save",
  };
  const VARIANTS: {
    [k: string]:
      | "secondary"
      | "destructive"
      | "ghost"
      | "outline"
      | "default"
      | "link"
      | null
      | undefined;
  } = {
    unknown: manager.activeWallet ? "secondary" : "destructive",
    loading: "ghost",
    ready: "outline",
  };
  return (
    <Button
      variant={VARIANTS[bearStore.status]}
      onClick={ACTIONS[bearStore.status]}
    >
      {isLoading ? "Loading..." : LABELS[bearStore.status]}
    </Button>
  );
}

export function Controls({ controls }: { controls: any }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mbr, setMBR] = useState<AlgoAmount>(0n as unknown as AlgoAmount);
  const [appId, setAppId] = useState<bigint | null>(null);
  const demo = useStore(bearStore);
  const [walletBalance, setWalletBalance] = useState(0n);
  const [appBalance, setAppBalance] = useState(0n);
  const manager = useWallet();
  const { activeNetwork, activeNetworkConfig } = useNetwork();

  useEffect(() => {
    if (!manager.isReady || !bearStore.appId) return;
    if (bearStore.appId !== appId) {
      setAppId(bearStore.appId);
    }

    bearStore.balance().then((b) => {
      setAppBalance(b);
    });
  }, [manager.isReady, bearStore.appId, demo]);

  useEffect(() => {
    if (!manager.isReady) return;
    console.log(
      "[Starlight Docs] Setting Algod Client",
      activeNetworkConfig.algod.baseServer,
    );
    // manager.setAlgodClient(
    //   ClientManager.getAlgodClient({
    //     server: activeNetworkConfig.algod.baseServer,
    //     token: activeNetworkConfig.algod.token as string,
    //     port: activeNetworkConfig.algod.port,
    //   }),
    // );
  }, [activeNetwork]);

  useEffect(() => {
    if (!manager.activeAddress || !manager.isReady || !bearStore.client) return;
    bearStore.assemble().then((boxData) => {
      const result = toMBR(deepMerge(demo, boxData)).microAlgo();
      console.log("[Starlight Docs] Assembling MBR", result);
      setMBR(result);
    });
  }, [demo]);

  useEffect(() => {
    if (!manager.activeAddress || !manager.isReady) return;
    manager.algodClient
      .accountInformation(manager.activeAddress)
      .do()
      .then((r) => {
        console.log("[Starlight Docs] Setting Wallet Balance", r.amount, "");
        setWalletBalance(r.amount);
      });
  }, [manager]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`not-content space-y-2 border-2 border-b-background ${isOpen ? "rounded-xl" : "rounded-3xl"} mt-6`}
    >
      <div className="flex items-center justify-between space-x-4 pr-4">
        <ModalToggle />
        <div>
          {manager.activeWallet && (
            <Button
              variant="secondary"
              disabled={!bearStore.dirty}
              onClick={() => {
                bearStore.client ? bearStore.save() : bearStore.init();
              }}
            >
              {bearStore.client ? "Save" : "Deploy"}
            </Button>
          )}
          {manager.activeWallet && <StateButton />}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <Card className={"rounded-b-xl rounded-t-none bg-background"}>
          <CardHeader>
            <CardTitle className="truncate">
              {manager.activeAddress || "Unknown"}
            </CardTitle>
            <CardDescription className="truncate">
              Wallet Balance: {walletBalance} <strong>ALGO</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              App Balance: {appBalance.microAlgo().algos} <strong>ALGO</strong>
            </p>
            <p>
              MBR: {mbr.algos} <strong>ALGO</strong>
            </p>
            <p>Transactions: {bearStore.toChunks().flatMap((v) => v).length}</p>
            <p>Cost: {bearStore.toChunks().flatMap((v) => v).length}</p>
          </CardContent>
          <CardFooter>
            <CheckboxWithLabel
              label={"Enable Autosave"}
              checked={false}
              onCheckedChange={() => {}}
              id="autosave"
            />
            {appId && (
              <Button
                variant="destructive"
                disabled={!bearStore.appId}
                onClick={() => {
                  bearStore.destroy();
                }}
              >
                {"Destroy"}
              </Button>
            )}
            {appId && (
              <a
                target="_blank"
                href={`https://lora.algokit.io/${activeNetwork}/application/${appId}`}
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
