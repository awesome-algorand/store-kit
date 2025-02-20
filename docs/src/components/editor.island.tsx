import type { WalletManager } from "@txnlab/use-wallet";
import { useStore } from "@tanstack/react-store";
import { bearStore } from "@/store.ts";
import React, { useEffect, useState } from "react";
import type { OnChangeFunction } from "json-edit-react";
import { toMBR, toPaths } from "@awesome-algorand/store-kit/objects";
import { withManager } from "@/hooks/use-wallet.tsx";
import { Editor } from "@/components/editor.tsx";

export function EditorController({
  isLoading,
}: {
  isLoading: boolean;
  manager: WalletManager;
}) {
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
    console.log(`[Editor] Updating JSON Data ${Object.keys(demo).length}`);
    setJson(
      JSON.stringify(
        demo,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        2,
      ),
    );
  }, [demo]);

  // Handle changes from the Editor
  const onChange: OnChangeFunction = ({ newValue, name }) => {
    console.log(`[Editor] Updating JSON Data ${newValue} ${name}`);
    if (bearStore.status === "ready") {
      console.log("STATE");
      // bearStore.setState(() => json);
    }
    return newValue;
  };
  return (
    <Editor
      app={{
        appId: bearStore.appId ? Number(bearStore.appId) : null,
        address: bearStore.client?.appAddress.toString() || null,
        balance: null,
        stats: {
          mbr: Number(toMBR(demo).microAlgo().algos),
          keys: toPaths(demo).length,
        },
      }}
      onChange={onChange}
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

export const EditorIsland = withManager(EditorController);
export default EditorIsland;
