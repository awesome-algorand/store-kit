import { AlgorandClient } from "@algorandfoundation/algokit-utils";
// Lodash Set Clients and Store
import { Store as BaseStore } from '@tanstack/store';
import { LodashFactory } from "./lodash/index.js";
import { toPaths } from "./objects/index.js";
import set from 'lodash.set';
import get from 'lodash.get';
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
export class Store extends BaseStore {
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
    algorand;
    // TODO: Wallet Manager
    //manager: WalletManager
    /**
     * Experimental: On-chain client for the Lodash application.
     */
    client;
    /**
     * @inheritDoc Deployer
     */
    deployer;
    /**
     * Experimental: Factory for the Lodash application.
     */
    factory;
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
    constructor(params) {
        const { algorand, deployer, appId, options } = params;
        // Ensure algorand is provided
        if (typeof algorand === "undefined" || !(algorand instanceof AlgorandClient)) {
            throw new TypeError("algorand is required");
        }
        // Ensure deployer is provided
        if (typeof deployer === "undefined") {
            throw new TypeError("deployer is required");
        }
        // Super Size Me!
        super(options || {});
        this.factory = algorand.client.getTypedAppFactory(LodashFactory, {
            defaultSender: deployer.addr,
        });
        // Ensure appId is a bigint
        if (typeof appId !== "undefined" && typeof appId !== "bigint") {
            throw new TypeError("appId must be a bigint");
        }
        else if (typeof appId === "bigint") {
            this.client = this.factory.getAppClientById({ appId });
        }
        this.algorand = algorand;
        this.deployer = deployer;
        this.client = undefined;
    }
    /**
     * Initializes the instance by deploying the required application and setting up necessary configurations.
     * Throws an error if already initialized.
     * Deploys the application using the provided factory and performs payment if the result operation requires it.
     *
     * @return {Promise<void>} A promise that resolves when the initialization process is complete.
     * @throws {Error} Throws an error if the method is called more than once.
     */
    async init() {
        if (typeof this.client !== "undefined") {
            throw new Error("Already initialized");
        }
        const { appClient, result } = await this.factory.deploy({ onUpdate: 'append', onSchemaBreak: 'append' });
        // TODO: MBR
        if (['create', 'replace'].includes(result.operationPerformed)) {
            await this.algorand.send.payment({
                amount: (1).algo(),
                sender: this.deployer.addr,
                receiver: appClient.appAddress,
            });
        }
        this.client = appClient;
        console.log(`Deployed app with id: ${appClient.appId}`);
    }
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
    async save(deployer) {
        // Ensure the app has been initialized
        if (typeof this.client === "undefined") {
            throw new TypeError("Ensure init has been run before saving");
        }
        // Ensure a deployer is provided
        if (typeof this.deployer === "undefined" && typeof deployer === "undefined") {
            throw new TypeError("Deployer is required");
        }
        // Save State On-Chain
        await Promise.all(
        // Map State to Lodash Paths
        toPaths(this.state, undefined)
            // Filter out undefined paths
            .filter(path => typeof path !== 'undefined' &&
            (typeof get(this.state, path) === 'string' ||
                typeof get(this.state, path) === 'number' ||
                typeof get(this.state, path) === 'bigint'))
            // Send each path to the network
            .map((path) => {
            console.log(`Saving ${path} with value: ${get(this.state, path)}`);
            return this.client?.send.set({
                args: { path: path, value: get(this.state, path).toString() },
                boxReferences: [`orm_${path}`]
            });
        }));
    }
    /**
     * Assembles and retrieves data stored in the storage boxes of an application, decodes the content, and formats it into a structured object.
     *
     * @return {Promise<T>} Returns a Promise that resolves to an object of type T, containing the decoded and processed data from the application storage boxes.
     * @throws {TypeError} Throws an error if the client is undefined, indicating that initialization has not been completed.
     */
    async assemble() {
        if (typeof this.client === "undefined") {
            throw new TypeError("Ensure init has been run before saving");
        }
        const names = await this.algorand.app.getBoxNames(this.client.appId);
        const values = await this.algorand.app.getBoxValues(this.client.appId, names);
        let data = {};
        const decoder = new TextDecoder();
        names.forEach((bName, idx) => {
            const valueString = decoder.decode(values[idx]);
            let value;
            try {
                value = BigInt(valueString);
            }
            catch (e) {
                value = valueString;
            }
            set(data, bName.name.replace("orm_", ''), value);
        });
        return data;
    }
}
//# sourceMappingURL=Store.js.map