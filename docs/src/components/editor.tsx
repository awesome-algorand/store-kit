import {useEffect, useState} from "react";
import { UseWallet } from "./wallet/provider";
import {useLoading} from "@/hooks/use-loading.ts";
import {useStore} from '@tanstack/react-store'
import {bearStore} from "@/store.ts";
import { Spinner } from "./ui/spinner";
import { Textarea } from "@/components/ui/textarea"

export function ReactEditor() {
  const [tab, setTab] = useState<'render' | 'schema' | 'data' >('render')
  const [schema, setSchema] = useState<any|null>(null)
  const demo = useStore(bearStore)
  const [json, setJson] = useState<string>(demo ? JSON.stringify(demo, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2) : '')
  const [error, setError] = useState<any>(null)
  const isLoading = useLoading()

  useEffect(()=>{
    if(isLoading || bearStore.status !== 'ready') return
    console.log(`[Editor] Updating JSON Data ${Object.keys(demo).length}`)
    setJson(JSON.stringify(demo, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  }, [demo])
  if(isLoading){
    return <div className="min-h-52 border rounded-md flex w-full border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
      <Spinner className={'h-24 w-24 m-auto'}/>
    </div>
  }
  return (<>

      <Textarea  className="resize-y min-h-52" value={json || ""} onChange={(e)=>{
        setJson(e.target.value)
        try{
          const json = JSON.parse(e.target.value)
          if(Object.keys(json).length === 0) throw new Error('Object is missing values')
          if(bearStore.status === 'ready'){
            bearStore.setState(()=>json)
          }

          setError(null)
        } catch(e) {
          setError(e)
        }
      }}/>
        {error && (
          <div style={{color: 'red', marginTop: '10px'}}>
            <strong>Error:</strong> {error.message || 'Invalid JSON'}
          </div>
        )}

  </>)
}

export function Editor() {
  return (<UseWallet>
    <ReactEditor/>
  </UseWallet>)
}
