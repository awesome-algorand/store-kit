import {useStore} from "@tanstack/react-store";
import { useWallet, useNetwork } from "@txnlab/use-wallet-react";
import {isModalOpen} from "@/store";
import {UseWallet} from "./provider.tsx";
import { List } from "./list.tsx";
import {NetworkToggle} from "@/components/network/network-toggle.tsx";
import { Button } from "../ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {cn} from "@/lib/utils.ts";

function ReactModal(){
  const $isModalOpen = useStore(isModalOpen);
  const manager = useWallet()
  const isDisconnected = manager.activeWallet?.isConnected === false
  return (
    <div className={`relative z-10 ${$isModalOpen ? "" : "hidden"}`} role="dialog" aria-modal="true">
      <div className={`fixed inset-0 z-auto w-screen h-screen transition-opacity bg-stone-950 ${$isModalOpen ? "opacity-80" : "opacity-0"}`} aria-hidden={!$isModalOpen}></div>
      <div className={cn("fixed inset-0 z-10 w-screen flex min-h-full items-center justify-center", `transition-opacity ${$isModalOpen ? "opacity-100" : "opacity-0"}`)}>
      <Card>
      <CardHeader>
        <CardTitle>Configure Wallet</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <List/>
      </CardContent>
      <CardFooter className={cn("sm:flex sm:flex-row-reverse sm:px-6")}>
        {!isDisconnected &&<Button variant="destructive" onClick={() => {
          manager.activeWallet?.disconnect().then(()=>{
            isModalOpen.setState(()=>false)
          })
        }}>Deactivate</Button>}

        <Button variant="secondary" onClick={() => isModalOpen.setState(()=>false)}>Cancel
        </Button>
        <NetworkToggle />
      </CardFooter>
    </Card>
      </div>
    </div>
  )
  return (
    <div className={`overflow-hidden h-full w-full relative z-10 ${$isModalOpen ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={`fixed inset-0 bg-gray-950/75 transition-opacity ${$isModalOpen ? "opacity-100" : "opacity-0"}`} aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${$isModalOpen ? "opacity-100" : "opacity-0"}`}>
            <div className="modal-content bg-stone-950 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24"
                       strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-900" id="modal-title">{isDisconnected ? "Connect Wallet" : "Welcome"}</h3>
                  <List/>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-stone-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button variant="destructive" onClick={() => isModalOpen.setState(()=>false)}>Deactivate
              </Button>
              <Button variant="secondary" onClick={() => isModalOpen.setState(()=>false)}>Cancel
              </Button>
              <NetworkToggle />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export function Modal(){
  return (
    <UseWallet>
      <ReactModal/>
    </UseWallet>
  )
}
