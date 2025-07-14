import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { Store as BaseStore } from "@tanstack/store";
import { NetworkId, WalletManager } from "@txnlab/use-wallet";
import { LodashClient } from "./lodash/index.js";
import type { Deployer, StoreInterface } from "./types.js";
export type StoreStatus = "unknown" | "loading" | "ready";
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
export declare class Store<TState> extends BaseStore<TState> implements StoreInterface<TState> {
    status: StoreStatus;
    deltas: Map<string, string>;
    network: NetworkId;
    get dirty(): boolean;
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
    protected algorand: AlgorandClient | null;
    /**
     * Represents an optional WalletManager instance.
     *
     * This variable can hold an instance of WalletManager or remain undefined.
     * It is typically used to manage and interact with wallet-related operations.
     *
     * @type {WalletManager | undefined}
     */
    protected manager: WalletManager | null;
    /**
     * Experimental: On-chain client for the Lodash application.
     */
    client: LodashClient | null;
    /**
     * @inheritDoc Deployer
     */
    protected deployer: Deployer | null;
    appId: bigint | null;
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
    constructor(initialState: TState, options?: {
        sync?: boolean;
    });
    balance(): Promise<bigint>;
    setAccount(deployer: Deployer | null, sync: boolean): this;
    setAppId(appId: bigint, sync: boolean): Promise<this>;
    toMBR(): bigint;
    /**
     * Binds the provided `WalletManager` to the current instance.
     * If the `WalletManager` has an active address, it initializes the `deployer` object
     * using the active address and transaction signer. Additionally, sets up a subscription
     * to handle state changes in the `WalletManager`.
     *
     * @param {WalletManager} manager - The wallet manager instance to be bound.
     */
    setManager(manager: WalletManager | null): this;
    /**
     * Binds the provided `AlgorandClient` to the current instance.
     * @param algorand
     */
    setAlgorand(algorand: AlgorandClient): this;
    /**
     * Binds the provided `LodashClient` to the current instance.
     * @param client
     * @param sync
     */
    setClient(client: LodashClient, sync?: boolean): Promise<Store<TState>>;
    findExistingClient(name?: string): Promise<LodashClient | null>;
    /**
     * Initializes the store with the provided configurations.
     * This method sets up a client instance, handles deployment if necessary, and syncs the state as required.
     *
     * @param {string} [name="Lodash"] The identifier or name of the app/client to be initialized.
     * @param {boolean} [sync=true] Indicates whether to synchronize the state after initialization.
     * @throws Error Will throw an error if a client already exists, if the Algorand client is missing,
     *         or if required prerequisites for initialization or deployment are not met.
     */
    init(name?: string, sync?: boolean): Promise<this>;
    /**
     * TODO: get delta and update MBR
     */
    toMBRDelta(): Promise<bigint | 0>;
    toChunks(): (string | undefined)[][];
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
    save(): Promise<void>;
    converge(state: any): Promise<import("./lodash/client.js").LodashComposer<[]>>;
    /**
     * Assembles and retrieves data stored in the storage boxes of an application, decodes the content, and formats it into a structured object.
     *
     * @return {Promise<T>} Returns a Promise that resolves to an object of type T, containing the decoded and processed data from the application storage boxes.
     * @throws {TypeError} Throws an error if the client is undefined, indicating that initialization has not been completed.
     */
    assemble(): Promise<TState>;
    destroy(state: TState): Promise<void>;
}
