import React, { createContext, type ReactNode, useState } from "react";
import { useLoading } from "@/hooks/use-loading.tsx";
import { bearStore } from "@/store.ts";
import { useStore } from "@tanstack/react-store";

export type ControlsContextState = {
  isError: Error | null;
  setError: (error: Error) => void;
  state: any;
  setState: (state: any) => void;
};
export const ControlsContext = createContext<ControlsContextState | null>(null);

export function useControls() {
  const context = React.useContext(ControlsContext);
  if (!context)
    throw new Error("useControls must be used within a ControlsProvider");
  return context;
}

export function UseControls({ children }: { children: ReactNode }) {
  const bears = useStore(bearStore);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState(() => bears);
  return (
    <ControlsContext.Provider
      value={{ isError: error, setError, state, setState }}
    >
      {children}
    </ControlsContext.Provider>
  );
}

export function withControls<TProps>(Component: React.ComponentType<TProps>) {
  return (props: TProps) => {
    const controls = useControls();
    return <Component controls={controls} {...props} />;
  };
}
export function withControlsContext<TProps>(
  Component: React.ComponentType<TProps>,
) {
  return (props: TProps) => {
    const WrappedComponent = withControls<TProps>(Component);
    return (
      <UseControls>
        <WrappedComponent {...props} />
      </UseControls>
    );
  };
}
