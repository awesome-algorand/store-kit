import chalk, {supportsColor} from 'chalk'

import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import {AnyUpdater, Store as BaseStore} from '@tanstack/store';
import {NetworkId, WalletManager} from "@txnlab/use-wallet";
import {decodeAddress} from "algosdk";

import {get, LodashClient, LodashFactory} from "./lodash/index.js";

import {assemble, deepMerge, diff, fromBoxes, toChunks, toMBR} from "./objects/index.js";

import type {Deployer, StoreInterface} from "./types.js";

import {
  ACTIVE_ADDRESS_REQUIRED,
  ALGORAND_CLIENT_REQUIRED,
  TYPED_CLIENT_EXISTS,
  TYPED_CLIENT_REQUIRED,
  WALLET_MANAGER_EXISTS,
  WALLET_MANAGER_REQUIRED
} from "./errors";
import {getClient, NotFoundError} from "./clients.js";
import {PREFIX} from "./objects/constants.js";

const TAG = supportsColor ? '[' + chalk.bold('Store') + chalk.cyan('Kit') + ']' : '[StoreKit]'
const ALGOKIT = supportsColor ? chalk.bold("@algokit") + "/" +  chalk.cyanBright('clients') : '@algokit/clients'
const TXNLAB = supportsColor ? chalk.bold("@txnlab") +"/" + chalk.green('use-wallet') : '@txnlab/use-wallet'

type StoreStatus = 'unknown' | 'existing' | 'new'

/**
 * A specialized `Store` class extending from [@tanstack/store](https://tanstack.com/store),
 * designed for managing and interacting with application-level state on the Algorand blockchain.
 *
 * The class provides methods to deploy, initialize, save,
 * and retrieve application state stored in Algorand application storage boxes.
 * It leverages the [AlgorandClient](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/docs/code/classes/types_algorand_client.AlgorandClient.md)
 * for blockchain interactions and a {@link Deployer} for deploying and signing transactions.
 *
 * ## Get Started
 * ```typescript
 * import {Store} from '@awesome-algorand/store-kit'
 * const store = new Store({
 *   foo: "bar",
 *   baz: 123,
 * })
 *
 * await store.setAlgorand(algorand).init("contract-name")
 *
 * ```
 * See the {@link Store.constructor} method for more information on how to instantiate the class.
 *
 * @template T The type of the state managed by the store. This may be omitted in favor of type inference.
 */
export class Store<TState> extends BaseStore<TState> implements StoreInterface<TState> {
  status: StoreStatus = 'unknown'
  dirty: boolean = true
  deltas = new Map<string, string>()
  network: NetworkId = NetworkId.LOCALNET
  /**
   * Represents an instance of AlgorandClient, which provides mechanisms to interact
   * with the Algorand blockchain network.
   *
   * The `algorand` variable can be used to perform various operations such as
   * querying blockchain data, submitting transactions, and interacting with Algorand smart contracts.
   *
   * It acts as an interface to communicate with the Algorand network through
   * methods exposed by the AlgorandClient.
   */
  protected algorand: AlgorandClient | null = null

  /**
   * Represents an optional WalletManager instance.
   *
   * This variable can hold an instance of WalletManager or remain undefined.
   * It is typically used to manage and interact with wallet-related operations.
   *
   * @type {WalletManager | undefined}
   */
  protected manager: WalletManager | null = null

  /**
   * Experimental: On-chain client for the Lodash application.
   */
  protected client: LodashClient | null = null

  /**
   * @inheritDoc Deployer
   */
  protected deployer: Deployer | null = null

  appId: bigint | null = null

  /**
   * A specialized `Store` class extending from [@tanstack/store](https://tanstack.com/store),
   * designed for managing and interacting with application-level state on the Algorand blockchain.
   *
   * Stores need both a valid {@link Deployer} and {@link AlgorandClient} to interact with the blockchain.
   * This is done via the {@link Store.setAccount} and {@link Store.setAlgorand} methods respectively
   * @example
   * #### Create
   *
   * ```typescript
   * import {Store} from '@awesome-algorand/store-kit'
   *
   * const bearStore = new Store({
   *   count: 5,
   *   species: "Grizzly"
   * })
   * ```
   * @example
   * #### Configure
   *
   * ```typescript
   * import {AlgorandClient} from '@algorandfoundation/algokit-utils'
   * bearStore
   *   .setAlgorand(AlgorandClient.fromEnvironment())
   * ```
   * @example
   * #### Add Account
   *
   * ```typescript
   * await bearStore
   *   // Add a Deployer account to the store
   *   .setAccount(await algorand.account.fromEnvironment('DEPLOYER'))
   *
   * ```
   * @example
   * #### Deploy
   * ```typescript
   * await bearStore
   *   // initialize the typed clients and deploy the contract by default
   *   .init('grizzly-bears')
   *
   *  console.log(bearStore.appId)
   *  ```
   *  @example
   *  #### Hydrate
   *
   *  > [!WARNING]
   *  > Only hydrate the store when it has been initialized
   *
   *  ```typescript
   *  await bearStore
   *    // Set the application id and rehydrate the store
   *    .setAppId(1337n)
   *  ```
   *
   *
   * @param {TState} initialState initial data to populate the store with
   */
  constructor(initialState: TState) {
    super(initialState, {
      onUpdate: async () => {
        console.log(`${TAG} 🔀 Updated State`, this.state)
        // Handle dirty state saves
        if(this.client && this.dirty && this.deltas.size > 0) {
          await this.save()
          this.dirty = false
          this.deltas.clear()
        }
        if(this.dirty && this.deltas.size === 0) {
          this.dirty = false
        }
      },
      updateFn: (previous)=>{
        this.dirty = true
        return (updater: AnyUpdater) => {
          console.log(`${TAG} ⚡️ Emit state change`, previous)

          const nextState = updater(previous)

          if(this.client) {
           diff(previous, nextState).forEach((diff: [path: string, value: string]) => this.deltas.set(...diff))
          }
          return nextState
        }
      }
    });
  }

  async balance() {
    console.log(`${TAG} 💰 Getting Application Balance`)
    if(!this.algorand || !this.client) {
      return 0n
    }
    const account = await this.algorand.client.algod.accountInformation(this.client.appAddress).do()
    return account.amount
  }
  setAccount(deployer: Deployer | null, sync: boolean) {
    console.log(`${TAG} ⚙️ Setting Account: ${deployer}`)
    this.deployer = deployer
    return this
  }
  async setAppId(appId: bigint, sync: boolean){
    console.log(`${TAG} ⚙️ Setting AppId: ${appId}`)
    if(sync && !this.algorand){
      throw new Error(ALGORAND_CLIENT_REQUIRED)
    }
    if(sync && this.algorand){
      this.client = await getClient(this.algorand, appId)
    }
    this.appId = appId
    return this
  }
  toMBR(){
    return toMBR(this.state)
  }
  /**
   * Binds the provided `WalletManager` to the current instance.
   * If the `WalletManager` has an active address, it initializes the `deployer` object
   * using the active address and transaction signer. Additionally, sets up a subscription
   * to handle state changes in the `WalletManager`.
   *
   * @param {WalletManager} manager - The wallet manager instance to be bound.
   */
  setManager(manager: WalletManager | null) {
    console.log(`${TAG} ⚙️ Setting up ${TXNLAB}`)
    if(manager === null) {
      this.manager = null
      return this
    }
    if(this.manager instanceof WalletManager) {
      throw new Error(WALLET_MANAGER_EXISTS)
    }
    if(!(manager instanceof WalletManager)) {
      throw new TypeError(WALLET_MANAGER_REQUIRED)
    }

    // update the non-reactive manager state
    this.manager = manager

    // set the deployer if the manager has an active address
    if(manager.activeAddress){
      this.deployer = {
        addr: decodeAddress(manager.activeAddress),
        signer: manager.transactionSigner,
      }
    }

    if(manager.activeNetwork){
      this.network = manager.activeNetwork as NetworkId
    }
    // handle state changes in the WalletManager
    manager.subscribe((state: WalletManager | any)=>{
      // console.log(`${TAG} WalletManager State Change:`, state)

      const isActiveWithoutDeployer = manager.activeAddress !== null && this.deployer === null
      const isActiveWithDeployer = manager.activeAddress !== null && this.deployer !== null

      if(!manager.activeAddress){
        if(this.deployer !== null)
          console.log(`${TAG} 🛑 Removing the Deployer`)
        this.deployer = null
        return
      }

      const isChangedAddress = manager?.activeAddress !== this.deployer?.addr.toString()
      const isChangedSigner = manager?.transactionSigner !== this.deployer?.signer
      if (isActiveWithoutDeployer || (isActiveWithDeployer && (isChangedAddress || isChangedSigner)) ){
        console.log(`${TAG} 🔐 Updating the Deployer from ${this.deployer?.addr.toString() || "null"} to ${manager.activeAddress}`)
        this.deployer = {
          addr: decodeAddress(manager.activeAddress!),
          signer: manager.transactionSigner,
        }
        if(this.client){
          console.log(this.client.appClient.state)
        }
      }

      if(state.activeNetwork !== this.network || manager.activeNetwork !== this.network){
        console.log(`${TAG} ⚡️ Updating the Network state from ${this.network} to ${state.activeNetwork}`)
        this.network = manager.activeNetwork as NetworkId
      }
    })
    return this
  }

  /**
   * Binds the provided `AlgorandClient` to the current instance.
   * @param algorand
   */
  setAlgorand(algorand: AlgorandClient) {
    console.log(`${TAG} ⚙️ Setting up ${ALGOKIT}`)
    this.algorand = algorand
    return this
  }

  /**
   * Binds the provided `LodashClient` to the current instance.
   * @param client
   * @param sync
   */
  async setClient(client: LodashClient, sync: boolean = true): Promise<Store<TState>> {
    console.log(`${TAG} Setting Client: ${client}`)
    if(typeof this.algorand === "undefined") {
      throw new TypeError("AlgorandClient is required")
    }
    this.client = client
    if(sync){
      // Will trigger the proxy to update the state
      this.state = await this.assemble()
    }
    return this
  }

  /**
   * Initializes the store with the provided configurations.
   * This method sets up a client instance, handles deployment if necessary, and syncs the state as required.
   *
   * @param {string} [name="Lodash"] The identifier or name of the app/client to be initialized.
   * @param {boolean} [sync=true] Indicates whether to synchronize the state after initialization.
   * @throws Error Will throw an error if a client already exists, if the Algorand client is missing,
   *         or if required prerequisites for initialization or deployment are not met.
   */
  async init(name: string= "Lodash", sync: boolean = true) {
    console.log(`${TAG} 🎉 Initializing Store with ${name} ${sync ? "and syncing" : "without syncing"}`)
    // Client should not exist
    if (this.client) {
      throw new Error(TYPED_CLIENT_EXISTS)
    }
    // Algorand client is required for creating the clients and deploying
    if(!this.algorand) {
      throw new Error(ALGORAND_CLIENT_REQUIRED)
    }
    let type: 'unknown' | 'existing' | 'new' = 'unknown'
    // TODO: Think about this problem a bit more, possibly at the ORM/Registry level
    try {
      // Try to find an existing client
      this.client = await getClient(this.algorand, this.appId? this.appId : this.deployer ? this.deployer.addr.toString() : null, name)
      console.log(`${TAG} 🍻 Welcome back! Loading existing store: ${name}`)
      this.appId = this.client.appId
      type = 'existing'
    } catch (e) {
      if(e instanceof NotFoundError){
        // Exit early when we cannot deploy
        if(sync && !this.deployer) {
          throw new Error(ACTIVE_ADDRESS_REQUIRED)
        }
        // Handle deploying the contracts
        if(sync && this.deployer){
          console.log(`${TAG} 🚀 Deploying App: ${name}`)
          const factory = this.algorand.client.getTypedAppFactory(LodashFactory, {
            deletable: true,
            defaultSender: this.deployer.addr,
            defaultSigner: this.deployer.signer
          })
          const {appClient} = await factory.deploy({ onUpdate: 'append', onSchemaBreak: 'append', appName: name })
          await appClient.appClient.fundAppAccount({
            amount: toMBR(this.state).microAlgo(),
            sender: this.deployer.addr,
          })
          this.client = appClient
          this.appId = appClient.appId
          type = 'new'
        } else {
          throw e
        }
      } else {
        throw e
      }
    }

    if(sync){
      if(type === 'new'){
        await this.save()
      } else if (type === 'existing'){
        console.log('Assmble the existing object')
        const boxState = await this.assemble()
        this.setState(()=>boxState)
      }

    }

    return this
  }

  /**
   * TODO: get delta and update MBR
   */
  async toMBRDelta() {
    const delta = (await this.balance()) - toMBR(this.state)
    return delta <= 0 ? 0 : delta
  }

  toChunks(){
    return toChunks(this.state)
  }
  /**
   * Saves the current state to the network. This method ensures that the app is initialized
   * and a deployer is provided before attempting to save. It synchronizes the state by mapping
   * paths to their respective values and storing them on-chain.
   *
   * @return {Promise<void>} Resolves when the state has been successfully saved to the network.
   * @throws {TypeError} Throws an error if the app has not been initialized with a client or if a deployer is not provided.
   * @example
   * ## Basic Usage
   * ```typescript
   * // Import a custom Store instance
   * import {exampleStore} from "./exampleStore"
   * // Save the state to the network
   * await exampleStore.save()
   * ```
   * ## Custom Deployer
   * Deployer can be passed as an argument to the save method
   * ```typescript
   * // Import a custom Store instance
   * import {exampleStore} from "./exampleStore"
   * // Define a deployer
   * const deployer = await algorand.account.fromMnemonic("example deployer mnemonic")
   * // Save the state to the network
   * await exampleStore.save(deployer)
   * ```
   */
  async save(): Promise<void> {
    console.log(`${TAG} 💾 Saving State`)
    if(!this.algorand) {
      throw new TypeError("AlgorandClient is required")
    }
    // Ensure the app has been initialized
    if (!this.client) {
      throw new TypeError("Ensure init has been run before saving")
    }
    // Ensure a deployer is provided
    if (!this.deployer) {
      throw new TypeError("Deployer is required")
    }
    const balance = await this.balance();
    const boxData = await this.assemble()

    const requiredMbr =  toMBR(deepMerge(boxData, this.state)).microAlgo().microAlgos
    const needsFunding = balance < requiredMbr;
    console.log({balance, requiredMbr, needsFunding})
    // Save State On-Chain
    await Promise.all(
      toChunks(this.state).map(async (paths, idx) => {
        // TODO: Logical Grouping around Objects (aka Atomic Composed Objects)
        // TODO: Bulk Set/GET
        const atc = this.client!.newGroup()
        if(needsFunding && idx === 0) {
          console.log(`${TAG} Funding App Account`, requiredMbr, 'microAlgos', this.deployer)
          atc.addTransaction(await this.algorand!.createTransaction.payment({
            sender: this.deployer!.addr,
            receiver: this.client!.appAddress,
            amount: (requiredMbr - balance).microAlgo()
          }), this.deployer!.signer)
        }
        for (const path of paths) {
          console.debug(`%cGrouping ${path} with value: ${get(this.state, path as string)}`, 'color: green;')
          atc.set({
            args: {path: path as string, value: get(this.state, path as string).toString()},
            boxReferences: [`${PREFIX}${path}`],
            sender: this.deployer!.addr,
            signer: this.deployer!.signer
          })
        }
        return await atc.send()
      })
    )
  }

  /**
   * Assembles and retrieves data stored in the storage boxes of an application, decodes the content, and formats it into a structured object.
   *
   * @return {Promise<T>} Returns a Promise that resolves to an object of type T, containing the decoded and processed data from the application storage boxes.
   * @throws {TypeError} Throws an error if the client is undefined, indicating that initialization has not been completed.
   */
  async assemble(): Promise<TState> {
    if(!this.algorand) {
      throw new TypeError(ALGORAND_CLIENT_REQUIRED)
    }
    if(!this.client) {
      throw new TypeError(TYPED_CLIENT_REQUIRED)
    }
    return await fromBoxes<TState>(this.algorand, this.client?.appId)
  }

  async destroy() {
    if(!this.algorand){
      throw new Error(ALGORAND_CLIENT_REQUIRED)
    }
    if(!this.client){
      throw new Error(TYPED_CLIENT_REQUIRED)
    }
    const names = await this.algorand.app.getBoxNames(this.client.appId)
    console.log(names)
    await this.client.send.delete.bare({
      sender: this.deployer!.addr,
      signer: this.deployer!.signer,
      boxReferences: names.map(box => box.name),
    })
  }
}


