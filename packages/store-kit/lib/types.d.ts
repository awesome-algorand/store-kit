import type { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { WalletManager } from "@txnlab/use-wallet";
/**
 * Represents a smart contract wallet capable of signing transactions.
 * A `Deployer` is critical for managing interactions with Algorand smart contracts. It
 * facilitates operations such as deploying and interacting with applications by ensuring
 * all transactions are signed appropriately. See [AppDeployer](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/docs/code/classes/types_app_deployer.AppDeployer.md)
 * for more information
 *
 * @example
 * ## From Environment
 * ```typescript
 * const deployer =
 *   const deployer = await algorand.account.fromEnvironment('DEPLOYER')
 * ```
 * ## From Mnemonic
 * ```typescript
 * const deployer = await algorand.account.fromMnemonic("example deployer mnemonic")
 * ```
 *
 * ## From KMD
 * ```typescript
 * const deployer = await algorand.account.fromKmd('DEPLOYER')
 * ```
 */
export type Deployer = TransactionSignerAccount;
export interface StoreInterface<TState> {
    subscribe(callback: (state: any) => void): void;
    state: TState;
    /**
     * Sets the manager for the store.
     *
     * @param {WalletManager | null} manager - The manager instance to be set, or null to unset the manager.
     */
    setManager(manager: WalletManager | null): this;
    /**
     * Sets the Algorand client for the store.
     *
     * @param {AlgorandClient | null} algorand - The Algorand client instance to set, or null to unset it.
     * @return {StoreInterface<TState>} The store instance with the updated Algorand client.
     */
    setAlgorand(algorand: AlgorandClient | null): this;
    /**
     * Sets the account for the given deployer and determines synchronization behavior.
     *
     * This will override any TransactionSigners associated with the WalletManager.
     *
     * @param {Deployer | null} deployer - The deployer instance to set, or null to clear the account.
     * @param {boolean} sync - A boolean indicating whether the account should be synchronized.
     */
    setAccount(deployer: Deployer | null, sync: boolean): this;
    /**
     * Sets the application ID for the store.
     *
     * @param {bigint} appId - The application ID to associate with the store.
     * @param {boolean} [sync] - Optionally trigger all lifecycle events, defaults to false
     */
    setAppId(appId: bigint, sync: boolean): Promise<this>;
    /**
     * Merges and consolidates the required components or elements into a single state object.
     *
     * @return {TState} The resulting state after the assembly process is completed.
     */
    assemble(): Promise<TState>;
}
