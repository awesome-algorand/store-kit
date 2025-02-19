import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { Store as BaseStore } from '@tanstack/store';
import { LodashClient, LodashFactory } from "./lodash/index.js";
import type { Deployer, Params } from "./types";
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
 *    algorand,
 *    deployer,
 *    options: {
 *      foo: "bar",
 *      baz: 123,
 *    },
 * })
 * ```
 * See the {@link Store.constructor} method for more information on how to instantiate the class.
 *
 * @template T The type of the state managed by the store. This may be omitted in favor of type inference.
 */
export declare class Store<T> extends BaseStore<T> {
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
    protected algorand: AlgorandClient;
    /**
     * Experimental: On-chain client for the Lodash application.
     */
    protected client?: LodashClient;
    /**
     * @inheritDoc Deployer
     */
    protected readonly deployer: Deployer;
    /**
     * Experimental: Factory for the Lodash application.
     */
    protected factory: LodashFactory;
    /**
     * Constructs an instance of the class with the specified parameters.
     *
     * @template T The type of the state managed by the store. This may be omitted in favor of type inference.
     *
     * @throws {TypeError} Throws `TypeError` if algorand client not valid or a deployer is not defined.
     *
     * @example
     * ## Basic Usage
     * ```typescript
     * // Import the AlgorandClient
     * import {AlgorandClient} from "@algorandfoundation/algokit-utils";
     * // Import the Store class
     * import {Store} from "./src";
     * const algorand = AlgorandClient.fromEnvironment()
     * const deployer = await algorand.account.fromEnvironment('DEPLOYER')
     * const store = new Store({
     *   algorand,
     *   deployer,
     *   options: {
     *    foo: "bar",
     *    baz: 123,
     *   },
     * })
     * ```
     */
    constructor(params: Params<T>);
    /**
     * Initializes the instance by deploying the required application and setting up necessary configurations.
     * Throws an error if already initialized.
     * Deploys the application using the provided factory and performs payment if the result operation requires it.
     *
     * @return {Promise<void>} A promise that resolves when the initialization process is complete.
     * @throws {Error} Throws an error if the method is called more than once.
     */
    init(): Promise<void>;
    /**
     * Saves the current state to the network. This method ensures that the app is initialized
     * and a deployer is provided before attempting to save. It synchronizes the state by mapping
     * paths to their respective values and storing them on-chain.
     *
     * @param {Deployer} [deployer] - Optional deployer instance if one is not already defined for the object.
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
    save(deployer?: Deployer): Promise<void>;
    /**
     * Assembles and retrieves data stored in the storage boxes of an application, decodes the content, and formats it into a structured object.
     *
     * @return {Promise<T>} Returns a Promise that resolves to an object of type T, containing the decoded and processed data from the application storage boxes.
     * @throws {TypeError} Throws an error if the client is undefined, indicating that initialization has not been completed.
     */
    assemble(): Promise<T>;
}
