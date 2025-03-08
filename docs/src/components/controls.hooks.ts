import {createContext, useContext} from "react";
import {demoStore} from "@/store.ts";

export type ControlsContextState = {
  isLoading: boolean | null,
  isError: Error | null,
  setError: (error: Error) => void,
  state: any,
  setState: (state: any) => void,
}
export const ControlsContext = createContext<ControlsContextState>({isLoading: null, isError: null, setError: console.log, state: {...demoStore.state}, setState: console.log});

export function useControls(){
  const context = useContext(ControlsContext)
  if(!context) throw new Error('useControls must be used within a ControlsProvider')
  return context
}
