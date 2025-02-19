/**
 * Default export includes the contract class and the types used by the contract class.
 *
 * > [!WARNING]
 * > This contract is experimental and may be subject to change.
 * > It is the minimal viable product (MVP) for the Lodash application.
 * > It is not recommended for production use, it does not include any guarantees or warranties.
 *
 * @module lodash
 *
 * @example
 * ## Basic Usage
 * ```typescript
 * // Example Imports
 * import {LodashFactory} from "@awesome-algorand/lodash";
 * import type {LodashClient} from "@awesome-algorand/lodash";
 *
 * // Integrates with the AlgorandClient
 * import {AlgorandClient} from "@algorandfoundation/algokit-utils";
 * const algorand = AlgorandClient.fromEnvironment()
 *
 * // Create the Factory
 * const factory = algorand.client.getTypedAppFactory(LodashFactory, {
 *   defaultSender: deployer.addr,
 * })
 * ```
 */
export * from './client.js';
