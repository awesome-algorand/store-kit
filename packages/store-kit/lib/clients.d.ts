import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { LodashClient } from "./lodash/index.js";
export declare class NotFoundError extends Error {
}
export declare function getClient(algorand: AlgorandClient, q?: string | bigint | null, name?: string): Promise<LodashClient>;
