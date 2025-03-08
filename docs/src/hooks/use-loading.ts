import {useWallet} from "@txnlab/use-wallet-react";
import {useEffect, useState} from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true)

  const manager = useWallet();

  useEffect(()=>{
    if(manager.isReady){
      setIsLoading(false)
    }
  }, [manager.isReady])
  return isLoading
}
