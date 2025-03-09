import {useWallet} from "@txnlab/use-wallet-react";
import { useEffect, useState} from "react";
import type {Wrapper} from "@/hooks/types.ts";
import { bearStore } from "@/store";
import {useStore} from "@tanstack/react-store";
export function useLoading() {
  const [isLoading, setIsLoading] = useState(true)

  const manager = useWallet();
  const bears = useStore(bearStore)

  useEffect(()=>{
    if(manager.isReady){
      setIsLoading(false)
    }
  }, [manager.isReady])
  return isLoading
}

export function withLoading<TProps>(Component: any){
  return (props: TProps)=>{
    const isLoading = useLoading()
    return (<Component isLoading={isLoading} {...props} />)
  }
}
