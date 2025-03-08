import {JsonForms} from "@jsonforms/react";
import {vanillaCells, vanillaRenderers, JsonFormsStyleContext} from "@jsonforms/vanilla-renderers";
import {useStore} from "@tanstack/react-store";
import { demoStore} from '@/store'
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
  const [dirty, setDirty] = useState(demoStore.dirty || false)
  const demo = useStore(demoStore)
  const [data, setData] = useState(demo)
  const isLoading = useLoading()

  useEffect(() => {
    const stateSync = setTimeout(()=>{
      if(diff(data, demo).length > 0) {
        demoStore.setState(()=>data)
        setDirty(false)
      }
    }, 1000)
    return ()=> clearTimeout(stateSync)
  }, [data, demo]);
  if(isLoading){
    return <div className="min-h-52"><Spinner/></div>
  }

  return (<JsonFormsStyleContext.Provider value={styleContextValue}>
    <div className="min-h-52">
    <JsonForms
      data={data}
      renderers={vanillaRenderers}
      cells={vanillaCells}
      onChange={({ data }) => {
        setDirty(true)
        setData(data)
      }}
    />
    {dirty && <p>Records are dirty</p>}
    </div>
  </JsonFormsStyleContext.Provider>)
}

export function Preview() {
  return (<UseWallet>
    <ReactPreview/>
  </UseWallet>)
}
