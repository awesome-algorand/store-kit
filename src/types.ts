import type {Address} from "algosdk";
import type {SigningAccount, TransactionSignerAccount} from "@algorandfoundation/algokit-utils/types/account";
import {AlgorandClient} from "@algorandfoundation/algokit-utils";

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
export type Deployer = Address & TransactionSignerAccount & { account: SigningAccount }


/**
 * Represents the parameters required for initializing and interacting with the `StoreKit` library.
 *
 * @template T The type of the state managed by the store. This may be omitted in favor of type inference.
 *
 * @example
 * ```typescript
 * const algorand = AlgorandClient.fromEnvironment()
 * const deployer = await algorand.account.fromEnvironment('DEPLOYER')
 * const params = {
 *  algorand,
 *  deployer,
 *  options: {
 *    foo: "bar"
 *  }
 * }
 * ```
 *
 */
export type Params<T> = {
  /**
   * Instance of the [AlgorandClient](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/docs/code/classes/types_algorand_client.AlgorandClient.md)
   * used for network interactions.
   */
  algorand: AlgorandClient;
  /**
   * @inheritDoc Deployer
   */
  deployer: Deployer
  /**
   * Optional identifier for the associated application on the Algorand blockchain.
   *
   * When provided, the `appId` is used to identify the application state managed by the store.
   * Otherwise, the store will attempt to deploy a new contract.
   */
  appId?: bigint;
  /**
   * Optional additional configuration or options specific to the use case.
   */
  options?: T;
}
