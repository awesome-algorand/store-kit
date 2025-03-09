import {JsonForms} from "@jsonforms/react";
import {vanillaCells, vanillaRenderers, JsonFormsStyleContext} from "@jsonforms/vanilla-renderers";
import {useStore} from "@tanstack/react-store";
import { bearStore} from '@/store'
import {UseWallet} from "@/components/wallet/provider.tsx";
import {useLoading} from "@/hooks/use-loading.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useEffect, useState} from "react";
import {diff} from '@awesome-algorand/store-kit/objects'
import {Button} from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils";
const styleContextValue = { styles: [
    {
      name: 'control.input',
      classNames: ['shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline']
    },
    {
      name: 'input.description',
      classNames: ['block text-gray-700 text-sm font-bold mb-2'],
    },
    {
      name: 'control.select',
      classNames: ['select'],
    },
    {
      name: 'control.checkbox',
      classNames: ['checkbox'],
    },
    {
      name: 'control.radio',
      classNames: ['radio'],
    },
    {
      name: 'array.button',
      classNames: ['custom-array-button']
    }
  ]};
export function ReactPreview() {
  const [dirty, setDirty] = useState(false)
  const demo = useStore(bearStore, (state)=>state)
  const [_data, setData] = useState(()=>demo)
  const isLoading = useLoading()

  useEffect(() => {
    if(isLoading) return
    if(diff(_data, demo).length > 0) {
      setData(demo)
    }
  }, [demo]);

  if(isLoading){
    return <div className="min-h-52"><Spinner/></div>
  }

  return (<JsonFormsStyleContext.Provider value={styleContextValue}>
    <div className="min-h-52">
    <JsonForms
      data={_data}
      renderers={vanillaRenderers}
      cells={vanillaCells}
      onChange={({ data }) => {
        bearStore.state = data
        // bearStore.setState(()=>data)
        setData(data)
        setDirty(true)
      }}
    />
    {dirty &&<div className={cn("flex")}><Button onClick={()=>{
      bearStore.state = _data
      bearStore.save()
    }} variant="default" color="green-900" >Save</Button> <p>Records are dirty</p></div>}
    </div>
  </JsonFormsStyleContext.Provider>)
}

export function Preview() {
  return (<UseWallet>
    <ReactPreview/>
  </UseWallet>)
}
