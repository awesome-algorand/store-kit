import { UseWallet } from "@/hooks/use-wallet.tsx";
import React, { useState } from "react";
import { Controls } from "@/components/controls.tsx";

import { useControls, UseControls } from "@/components/controls.hooks.tsx";
import { useWallet } from "@txnlab/use-wallet-react";
import type { WalletManager } from "@txnlab/use-wallet";

export function ControlsController() {
  const controls = useControls();
  const manager = useWallet();
  const [open, setOpen] = useState(false);
  return (
    <Controls
      open={open}
      onOpenChange={setOpen}
      controls={controls}
      manager={manager as unknown as WalletManager}
      isLoading={!manager.isReady}
    />
  );
}
export const ControlsIsland = () => {
  return (
    <UseWallet>
      <UseControls>
        <ControlsController />
      </UseControls>
    </UseWallet>
  );
};
export default ControlsIsland;
