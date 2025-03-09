import {useEffect, useState} from "react";
import {useStore} from "@tanstack/react-store";

// Template Code
import {createRenderer, type RehypeExpressiveCodeOptions, type RehypeExpressiveCodeRenderer} from 'astro-expressive-code'
import { toHtml } from '@expressive-code/core/hast'
import Handlebars from "handlebars";

// Project Files
import templateSource from '@/templates/store.ts.hbs?raw'
import {Spinner} from "@/components/ui/spinner.tsx";
import {bearStore} from "@/store.ts";
import renderOptions from '../../ec.config.mjs'
import {useWallet} from "@txnlab/use-wallet-react";
import { UseWallet } from "./wallet/provider";
import {NetworkId, WalletId} from "@txnlab/use-wallet";

const template = Handlebars.compile(templateSource, {noEscape: true});

const PROVIDERS = {
  [WalletId.DEFLY]: {
    import: 'import {defly} from "@txnlab/use-wallet-react";',
  }
}

const WALLET_MANAGER_IMPORT = `import {WalletManager, WalletId, NetworkId} from "@txnlab/use-wallet-react";

// WalletManager from use-wallet
export const manager = new WalletManager({
  wallets: [
    WalletId.<KEY>,
  ],
  defaultNetwork: NetworkId.<ID>,
});
`
export function ReactStoreCode({type}: {type: 'txnlab' | 'algokit'}) {
  const manager =useWallet()
  const [hype, setHype] = useState<RehypeExpressiveCodeRenderer | null>(null)
  const demo = useStore(bearStore)
  const [html, setHtml] = useState('')

  useEffect(() => {
    if(hype) return
    createRenderer(renderOptions as RehypeExpressiveCodeOptions).then(r=>setHype(r)).catch(console.error)
  }, []);

  useEffect(() => {
    if(!hype) return
    hype.ec.render({
      code: template({
        manager: type === 'txnlab' ? WALLET_MANAGER_IMPORT : "",
        state: JSON.stringify(demo, (_, v) => typeof v === 'bigint' ? Number(v) : v, 2),
        actions: type === 'txnlab' ? `  .setManager(manager)\n  .init("bear-store")` : `  .setDeployer(await algorand.account.fromEnvironment('DEPLOYER'))\n  .init("bear-store")`,
      }),
      language: 'typescript',
    }).then((result)=>{
      setHtml(toHtml(result.renderedGroupAst))
    })
  }, [demo, hype, manager.activeWallet])

  if(!html)
    return (
        <div className="not-content expressive-code">
          <figure className="!p-0 !m-0">
            <pre className="!h-60">
              <Spinner className="h-24 w-24 m-auto"/>
            </pre>
          </figure>
        </div>
    )
  return (<div className="not-content" dangerouslySetInnerHTML={{__html: html}}></div>)
}

export function StoreCode({type}: {type: 'txnlab' | 'algokit'}) {
  return (
    <UseWallet>
    <ReactStoreCode type={type}/>
    </UseWallet>
  )
}
