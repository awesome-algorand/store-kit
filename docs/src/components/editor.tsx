import React from "react";
import { useStore } from "@tanstack/react-store";
import { bearStore } from "@/store.ts";
import * as JSONEdit from "json-edit-react";
import { Button } from "./ui/button";
import { ModalToggle } from "@/components/wallet/modal-toggle.tsx";
import { useNetwork, useWallet } from "@txnlab/use-wallet-react";

type AppMetadata = {
  appId: number | null;
  address: string | null;
  balance: number | null;
  stats: {
    mbr: number | null;
    keys: number | null;
  };
};
type EditorProps = {
  json: string;
  onChange: JSONEdit.OnChangeFunction;
  onDelete: JSONEdit.UpdateFunction;
  onAdd: JSONEdit.UpdateFunction;
  onUpdate: JSONEdit.UpdateFunction;
  onEdit: JSONEdit.UpdateFunction;
  error: Error | null;
  app: AppMetadata;
  isLoading: boolean;
};
const ROOT = "[StoreKit]";
export function Editor(props: EditorProps) {
  const { app, error, onChange, onDelete, onAdd, onUpdate, onEdit } = props;
  const bears = useStore(bearStore);
  const manager = useWallet();
  const { activeNetwork } = useNetwork();
  return (
    <div className="not-content min-h-64">
      <div className="text-lg text-gray-500 mb-2" style={{ marginTop: "10px" }}>
        {app.appId && (
          <div
            className="flex items-center space-x-2 justify-between"
            style={{ marginTop: "10px" }}
          >
            <p className="text-lg truncate">
              {"Edit the"}
              <strong>{" state "}</strong>
              {"object 🤯, or use the above controls"}
            </p>
            <div className="truncate text-lg no-underline decoration-none">
              {`ID: ${app.appId} 🎉 `}

              <Button
                className="text-lg text-underline bg-stone-950 border"
                size="sm"
                role="link"
                asChild
              >
                <a
                  className="not-content no-underline visited:text-lg"
                  href={`https://lora.algokit.io/${activeNetwork}/application/${app.appId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`View on Lora`}
                </a>
              </Button>
            </div>
          </div>
        )}
        {!app.appId && !manager.activeWallet && (
          <div
            className="flex items-center space-x-2"
            style={{ marginTop: "10px" }}
          >
            {"Get started by clicking"}
            <ModalToggle />
          </div>
        )}
        {!app.appId && manager.activeWallet && (
          <div>
            Application not found, deploy a fresh Store using the{" "}
            <strong>Deploy</strong> button
          </div>
        )}
      </div>
      <JSONEdit.JsonEditor
        maxWidth={"100%"}
        restrictTypeSelection={[
          "string",
          "number",
          // TODO: boolean support
          // "boolean",
          "object",
          "array",
        ]}
        rootName={ROOT}
        className="w-full"
        restrictAdd={({ path }) => !app.appId || path[0] !== "state"}
        restrictDelete={({ path }) =>
          !app.appId ||
          path[0] !== "state" ||
          (path[0] === "state" && path.length === 1)
        }
        restrictEdit={({ path, value }) =>
          !app.appId ||
          path[0] !== "state" ||
          typeof value === "object" ||
          Array.isArray(value)
        }
        data={{ state: bears, contract: app }}
        theme={JSONEdit.candyWrapperTheme}
        onChange={onChange}
        onDelete={onDelete}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onEdit={onEdit}
      />
      {/*<Textarea*/}
      {/*  className="resize-y min-h-52"*/}
      {/*  value={json || ""}*/}
      {/*  onChange={onChange}*/}
      {/*/>*/}
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {error.message || "Invalid JSON"}
        </div>
      )}
    </div>
  );
}
