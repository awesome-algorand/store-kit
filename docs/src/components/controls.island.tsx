import { UseWallet, withManager } from "@/hooks/use-wallet.tsx";
import React, { type ReactNode, useState } from "react";
import { Controls } from "@/components/controls.tsx";
import { useLoading } from "@/hooks/use-loading.tsx";
import { bearStore } from "@/store.ts";

import {
  UseControls,
  withControls,
  withControlsContext,
} from "@/components/controls.hooks.tsx";

export function ControlsController({ controls, manager, isLoading }) {
  console.log(controls, manager, isLoading);
  return (
    <Controls controls={controls} manager={manager} isLoading={isLoading} />
  );
}
export const ControlsIsland = withManager(
  withControlsContext(ControlsController),
);
export default ControlsIsland;
