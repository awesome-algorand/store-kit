/**
 * Represents an error that occurs when the size of an object `key` or `value` exceeds the maximum allowed size.
 */
export declare class MaxSizeError extends TypeError {
    constructor(message: string);
}
/**
 * Calculates the minimum balance requirement (MBR) for an object.
 *
 * @param {any} obj The object for which to calculate the MBR.
 * @param {(string|undefined)[]} paths Precomputed paths of the object.
 *
 * @throws {TypeError} Throws a `TypeError` if the object is undefined.
 * @throws {MaxSizeError} Throws a {@link MaxSizeError} if the object key or value exceeds the maximum size.
 *
 * @example
 * ## Basic Usage
 * ```typescript
 * // Define an object
 * const obj = {
 *   key: "value"
 * }
 * // Calculate the MBR
 * const mbr = toMBR(obj)
 * ```
 *
 * ## Cached Paths
 * Using the {@link paths} parameter
 * ```typescript
 * // Define an object
 * const obj = {
 *  key: "value"
 * }
 * // Calculate the paths
 * const paths = toPaths(obj)
 * // Calculate the MBR
 * const mbr = toMBR(obj, paths)
 * ```
 */
export declare function toMBR(obj: any, paths?: (string | undefined)[]): bigint;
/**
 * Recursively generates the paths for all keys in an object or array, formatted as dot notation.
 *
 * @param {any} obj The object or array for which to generate key paths.
 * @param {string} parentKey The key or path of the parent object, used to build the complete key paths.
 * @return {string[]} An array of strings representing the paths of the keys in dot notation.
 */
export declare function toPaths(obj: any, parentKey?: string): (string | undefined)[];
