import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import {WalletManager} from "@txnlab/use-wallet";
import {LodashFactory} from "./lodash/index.js";
import {Store} from "./Store.js";
import {fromBoxes} from "./objects/state.js";

export class Orm{
  private readonly _algorand: AlgorandClient;
  private readonly _manager: WalletManager;


  private readonly stores: Map<bigint, bigint[]> = new Map<bigint, bigint[]>();

  constructor({algorand, manager} : {algorand: AlgorandClient, manager: WalletManager}){
    this._algorand = algorand
    this._manager = manager
  }
  /**
   * Experimental: Factory for the Lodash application.
   */
  protected factory: LodashFactory | null = null
  async add<T>(appId: bigint, refs?: bigint[]): Promise<Store<T>>{
    if(this.stores.has(appId)){
      throw new Error(`Store with appId ${appId} already exists`)
    }
    const store = new Store<T>(await fromBoxes<T>(this._algorand, appId))
    await store.setAlgorand(this._algorand)
          .setManager(this._manager)
          .setAppId(appId, true)
    await store.init()
    this.stores.set(appId, refs || [])
    return store
  }

  async create<T>(name:string, initialState: T, refs?: bigint[]): Promise<Store<T>>{
    const store = new Store<T>(initialState)
    store.setAlgorand(this._algorand)
          .setManager(this._manager)
    await store.init(name)
    if(typeof store.appId === 'undefined'){
      throw new Error(`Failed to initialize store with name ${name}`)
    }
    return store
  }
}
