// Import CSS in Provider for Client Hydration
import '@/tailwind.css'
import {Button} from "@/components/ui/button.tsx";
import {demoStore} from "@/store.ts";
import {UseWallet} from "@/components/wallet/provider.tsx";
import {ModalToggle} from "@/components/wallet/modal-toggle.tsx";
import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from "react";
import {useWallet, useNetwork} from "@txnlab/use-wallet-react";
import {useStore} from "@tanstack/react-store";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useLoading} from "@/hooks/use-loading.ts";
import {ClientManager} from "@algorandfoundation/algokit-utils/types/client-manager";
import { Checkbox } from "@/components/ui/checkbox"
import type {CheckedState} from "@radix-ui/react-checkbox";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ControlsContext} from "@/components/controls.hooks.ts";
import {cn} from "@/lib/utils.ts";
import {deepMerge, toMBR} from "@awesome-algorand/store-kit/objects";
import type {AlgoAmount} from "@algorandfoundation/algokit-utils/types/amount";

export function CheckboxWithLabel({id, label, checked, onCheckedChange }:  {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: CheckedState) => void
}) {
  return (
    <div className="not-content items-top flex space-x-2 items-center justify-center">
      <Checkbox
        id={id} checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}


export function ControlsProvider({children}: { children: ReactNode}){
  const isLoading = useLoading()
  const [error, setError] = useState<Error|null>(null)
  const [state, setState] = useState(demoStore.state)
  return (
    <ControlsContext.Provider value={{isLoading, isError: error, setError, state, setState}}>
      {children}
    </ControlsContext.Provider>
  )

}

export function ReactControls({}){

  const isLoading = useLoading()
  const [mbr, setMBR] = useState<AlgoAmount>(0n as unknown as AlgoAmount)
  const [appId, setAppId] = useState<bigint|null>(null)
  const demo = useStore(demoStore)
  const [walletBalance, setWalletBalance] = useState(0n)
  const [appBalance, setAppBalance] = useState(0n)
  const manager = useWallet()
  const {activeNetwork, activeNetworkConfig} = useNetwork()

  useEffect(()=>{
    if(!manager.isReady || !demoStore.appId) return
    if(demoStore.appId !== appId) {
      setAppId(demoStore.appId)
    }
    demoStore.assemble().then((boxData)=>{
      const result = toMBR(deepMerge(boxData, demo)).microAlgo()
      console.log('[Starlight Docs] Assembling MBR', result)
      setMBR(result)
    })

    demoStore.balance().then((b)=>{
      setAppBalance(b)
    })
  }, [manager.isReady, demoStore.appId, demo])

  useEffect(() => {
    if(!manager.isReady) return
    console.log('[Starlight Docs] Setting Algod Client', activeNetworkConfig.algod.baseServer)
    manager.setAlgodClient(ClientManager.getAlgodClient({
      server: activeNetworkConfig.algod.baseServer,
      token: activeNetworkConfig.algod.token as string,
      port: activeNetworkConfig.algod.port,
    }))
  }, [activeNetwork]);

  useEffect(() => {
    if(!manager.activeAddress || !manager.isReady) return
    manager.algodClient.accountInformation(manager.activeAddress).do().then(r=>{
      console.log('[Starlight Docs] Setting Wallet Balance', r.amount, '')
      setWalletBalance(r.amount)
    })
  }, [manager]);
  if(isLoading){
    return <Card className={cn('h-full min-h-96 mt-3')}><Spinner className={'h-full min-h-96 mt-3'}/></Card>
  }


  return(
    <Card className={cn("not-content mt-3")}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Wallet Balance: {walletBalance} <strong>ALGO</strong></p>
        <p>Wallet Address: {manager.activeAddress}</p>
        <p>App Balance: {appBalance.microAlgo().algos} <strong>ALGO</strong></p>
        <p>MBR: {mbr.algos} <strong>ALGO</strong></p>
        <p>Transactions: {demoStore.toChunks().flatMap(v=>v).length}</p>
        <p>Cost: {demoStore.toChunks().flatMap(v=>v).length}</p>
      </CardContent>
      <CardFooter>
        {manager.activeWallet && <Button variant="secondary" disabled={!demoStore.dirty} onClick={()=>{demoStore.client ? demoStore.save() : demoStore.init()}}>{demoStore.client ? "Save" : "Deploy"}</Button>}
        <ModalToggle/>
        <CheckboxWithLabel label={"Enable Autosave"} checked={false} onCheckedChange={()=>{}} id="autosave"/>
        {appId && <Button variant="destructive" disabled={!demoStore.appId} onClick={()=>{demoStore.destroy()}}>{"Destroy"}</Button>}
        {appId && <a target="_blank" href={`https://lora.algokit.io/${activeNetwork}/application/${appId}`}>Open in Lora</a>}
      </CardFooter>

    </Card>

  )
}

export function Controls(){
  return (
    <UseWallet>
      <ControlsProvider>
        <ReactControls/>
      </ControlsProvider>
    </UseWallet>
  )
}
