/**
 * Calculates the minimum balance requirement (MBR) for an object.
 *
 * @param {any} obj The object for which to calculate the MBR.
 * @param {(string|undefined)[]} pathsCache Precomputed paths of the object.
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
export declare function toMBR(obj: unknown, pathsCache?: (string | undefined)[]): bigint;
export declare function getMBRDifference(a: unknown, b: unknown): Promise<bigint>;
