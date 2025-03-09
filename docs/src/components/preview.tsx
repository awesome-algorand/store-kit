import {JsonForms} from "@jsonforms/react";
import {vanillaCells, vanillaRenderers, JsonFormsStyleContext} from "@jsonforms/vanilla-renderers";
import {useStore} from "@tanstack/react-store";
import { bearStore} from '@/store'
import {UseWallet} from "@/components/wallet/provider.tsx";
import {useLoading} from "@/hooks/use-loading.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useEffect, useState} from "react";
import {diff} from '@awesome-algorand/store-kit/objects'
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
  const demo = useStore(bearStore, (state)=>state)
  const [data, setData] = useState(bearStore.state)
  const isLoading = useLoading()

  if(isLoading){
    return <div className="min-h-52"><Spinner/></div>
  }

  return (<JsonFormsStyleContext.Provider value={styleContextValue}>
    <div className="min-h-52">
    <JsonForms
      data={demo}
      renderers={vanillaRenderers}
      cells={vanillaCells}
      onChange={({ data }) => {
        if(diff(data, demo).length > 0) {
          bearStore.setState(()=>data)
        }
      }}
    />
    {bearStore.dirty && <p>Records are dirty</p>}
    </div>
  </JsonFormsStyleContext.Provider>)
}

export function Preview() {
  return (<UseWallet>
    <ReactPreview/>
  </UseWallet>)
}
