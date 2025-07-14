import type { WalletManager } from "@txnlab/use-wallet";
import { useStore } from "@tanstack/react-store";
import { bearStore } from "@/store.ts";
import React, { useEffect, useState } from "react";
import { toMBR, toPaths } from "@awesome-algorand/store-kit/objects";
import { UseWallet } from "@/hooks/use-wallet.tsx";
import { Editor } from "@/components/editor.tsx";
import { useControls, UseControls } from "./controls.hooks";
import { useLoading } from "@/hooks/use-loading.tsx";

export function EditorController() {
  const isLoading = useLoading();
  const controls = useControls();
  // Hydrate the State
  const demo = useStore(bearStore);
  const [json, setJson] = useState<string>(
    demo
      ? JSON.stringify(
          demo,
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          2,
        )
      : "",
  );

  const [error, setError] = useState<any>(null);

  // Handle changes from the Store
  useEffect(() => {
    if (isLoading || bearStore.status !== "ready") return;
    setJson(
      JSON.stringify(
        demo,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        2,
      ),
    );
  }, [demo, controls, bearStore]);

  return (
    <Editor
      app={{
        appId: controls.state.contract.appId
          ? Number(controls.state.contract.appId)
          : null,
        address: controls.state.contract.address?.toString() || null,
        balance: controls.state.contract.balance
          ? Number(controls.state.contract.balance.microAlgo().algos)
          : null,
        stats: {
          mbr: Number(toMBR(demo).microAlgo().algos),
          keys: toPaths(demo).length,
        },
      }}
      onDeploy={() => {
        window.location.reload();
      }}
      onChange={({ newValue, name }) => {
        return newValue;
      }}
      onDelete={() => {
        console.log("delete");
      }}
      onAdd={() => {
        console.log("add");
      }}
      onUpdate={() => {
        console.log("update");
      }}
      onEdit={({ path, newValue, currentValue }) => {
        const currentType = typeof currentValue;

        switch (currentType) {
          case "string":
            break;
          case "number":
          case "bigint":
            break;
        }
        if (Array.isArray(newValue)) {
          console.log("edit array");
        }

        console.log("edit", path, newValue, currentValue, currentType);
      }}
      json={json}
      error={error}
      isLoading={isLoading}
    />
  );
}

export const EditorIsland = () => {
  return (
    <UseWallet>
      <UseControls>
        <EditorController />
      </UseControls>
    </UseWallet>
  );
};
export default EditorIsland;
