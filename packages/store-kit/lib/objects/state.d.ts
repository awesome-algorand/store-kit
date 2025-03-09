import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import type { KeyValue } from "./type";
/**
 * Assembles a structured object from a list of key-value pairs, processes the keys
 * by removing a predefined prefix, and parses the values as BigInt.
 *
 * @param {KeyValue[]} kvs - An array of key-value pairs where each pair contains
 * a key as a string and a value to be processed.
 * @return A structured object of type T, assembled and sorted by keys.
 */
export declare function assemble<T>(kvs: KeyValue[]): T;
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
 * Compares two objects and returns an array of key-value pairs that represent the differences
 * between the two objects.
 *
 * @param {any} a - The first object to compare.
 * @param {any} b - The second object to compare.
 * @return An array of key-value pairs where the key is the modified path (prefixed),
 * and the value is the value from the second object at that path.
 */
export declare function diff<T>(a: T, b: T): KeyValue[];
/**
 * Recursively merges the properties of a source object into a target object.
 * If both the target and source properties are objects, it merges their properties deeply.
 * If not, it overwrites the target property with the source property.
 *
 * @param {any} target - The target object to merge properties into.
 * @param {any} source - The source object whose properties are to be merged into the target object.
 * @return The merged target object.
 */
export declare function deepMerge<T>(target: T, source: T): T;
/**
 *
 * @todo
 * @param a
 * @param b
 */
export declare function convergence<T>(a: T, b: T): void;
