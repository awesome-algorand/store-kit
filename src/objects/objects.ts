import get from "lodash.get";

const MAX_BOX_SIZE = 1024 * 32
const MAX_KEY_SIZE = 64

/**
 * Represents an error that occurs when the size of an object `key` or `value` exceeds the maximum allowed size.
 */
export class MaxSizeError extends TypeError {
  constructor(message: string) {
    super(message)
    this.name = "MaxSizeError"
  }
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
export function toMBR(obj: any, paths?: (string|undefined)[]): bigint {
  if(typeof obj === 'undefined') {
    throw new TypeError("Object is required")
  }
  if(typeof paths === 'undefined') {
    paths = toPaths(obj)
  } else {
    paths = paths.filter(path => typeof path !== 'undefined')
  }
  const baseLine = BigInt(2500)
  const multiplier = BigInt(400)
  const encoder = new TextEncoder()

  return paths.reduce((acc, path) => {
    const keySize = BigInt(encoder.encode(path).length)
    if(keySize > BigInt(MAX_KEY_SIZE)) {
      throw new MaxSizeError(`Key size exceeds maximum of ${MAX_KEY_SIZE}`)
    }

    const boxSize = BigInt(encoder.encode(get(obj, path || '')).length)
    if(boxSize > BigInt(MAX_BOX_SIZE)) {
      throw new MaxSizeError(`Box size exceeds maximum of ${MAX_BOX_SIZE}`)
    }

    return acc + (baseLine + (multiplier * (keySize + boxSize)))
  }, BigInt(0))
}

/**
 * Recursively generates the paths for all keys in an object or array, formatted as dot notation.
 *
 * @param {any} obj The object or array for which to generate key paths.
 * @param {string} parentKey The key or path of the parent object, used to build the complete key paths.
 * @return {string[]} An array of strings representing the paths of the keys in dot notation.
 */
export function toPaths(obj: any, parentKey?: string): (string|undefined)[] {
  /**
   * The result array to be returned.
   */
  let result: (string|undefined)[];

  // TODO: exclude the parent key from the result
  if (Array.isArray(obj)) {
    // Map the Array to paths
    result = obj.flatMap((obj, idx) => toPaths(obj, (parentKey || '') + '[' + idx++ + ']'));
  }
  // TODO: better object detection
  else if (Object.prototype.toString.call(obj) === '[object Object]') {
    // Map the Object Keys to paths
    result = Object.keys(obj)
      .flatMap((key) =>
        toPaths(obj[key], key)
          .map((subkey : string | undefined) => (parentKey ? parentKey + '.' : '') + subkey));
  }
  // If the object is not an array or object, return an empty array
  else {
    result = [];
  }

  // Return the result array with the parent key appended
  return [...result, parentKey ];
}
