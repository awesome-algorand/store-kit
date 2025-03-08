import { AlgorandClient } from "@algorandfoundation/algokit-utils";
export declare function assemble<T>(kvs: [string, string][]): T;
export declare function parseBigInt(valueString: string): string | number;
/**
 * Assembles data from an Algorand application by retrieving and processing box names and their values.
 *
 * @param {AlgorandClient} algorand - The Algorand client instance to interact with the blockchain.
 * @param {bigint} appId - The ID of the application to retrieve the data from.
 *
 * @throws {TypeError} If the provided `algorand` parameter is not an instance of `AlgorandClient`.
 * @throws {TypeError} If the provided `appId` is not of type `bigint`.
 */
export declare function fromBoxes<T>(algorand: AlgorandClient, appId: bigint): Promise<T>;
/**
 * Compares two objects and returns an array of paths that have different values.
 * @param a
 * @param b
 */
export declare function diff(a: any, b: any): [path: string, value: string][];
export declare function deepMerge(target: any, source: any): any;
