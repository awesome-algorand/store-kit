export declare function toChunks(obj: any): (string | undefined)[][];
/**
 * Splits a given string into chunks of specified size.
 *
 * @param {string} value - The string to be divided into chunks.
 * @param {number} size - The size of each chunk.
 * @return {string[]} An array containing the string chunks.
 */
export declare function chunkValue(value: string, size: number): string[];
/**
 * Splits a given value into chunks based on the size limitation of an ABI interface.
 *
 * The key is used to calculate the chunk size based on the limitation of the ABI interface.
 * The value is then split into chunks based on the calculated chunk size.
 *
 * @param {string} key - A string representing the key whose length is used to calculate the chunk size.
 * @param {string} value - The string value to be chunked.
 * @return {string[]} An array of string chunks derived from the provided value.
 */
export declare function chunkKeyValue(key: string, value: string): string[];
