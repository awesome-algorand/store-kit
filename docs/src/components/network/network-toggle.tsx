import {Button} from "@/components/ui/button.tsx";
import {NetworkId, useNetwork, useWallet} from "@txnlab/use-wallet-react";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NetworkToggle() {
  const manager = useWallet()
  const {
    activeNetwork,
    setActiveNetwork,
    networkConfig
  } = useNetwork()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Switch Network</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Networks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(networkConfig).map((networkId) => (
          <DropdownMenuCheckboxItem
            key={networkId}
            checked={networkId === activeNetwork}
            onCheckedChange={(checked)=>{
              if(checked && networkId !== activeNetwork) {
                setActiveNetwork(networkId)
              }
            }}
          >{networkId}</DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>


  )
}
