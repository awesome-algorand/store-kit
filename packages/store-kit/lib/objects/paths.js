/**
 * Recursively generates the paths for all keys in an object or array, formatted as dot notation.
 *
 * @param {any} obj The object or array for which to generate key paths.
 * @param {string} parentKey The key or path of the parent object, used to build the complete key paths.
 * @return {string[]} An array of strings representing the paths of the keys in dot notation.
 */
export function toPaths(obj, parentKey) {
    /**
     * The result array to be returned.
     */
    let result;
    // TODO: exclude the parent key from the result
    if (Array.isArray(obj)) {
        // Map the Array to paths
        result = obj.flatMap((obj, idx) => toPaths(obj, (parentKey || '') + '[' + idx++ + ']'));
    }
    // TODO: better object detection
    else if (Object.prototype.toString.call(obj) === '[object Object]') {
        // Map the Object Keys to paths
        result = Object.keys(obj)
            .flatMap((key) => toPaths(obj[key], key)
            .map((subkey) => (parentKey ? parentKey + '.' : '') + subkey));
    }
    // If the object is not an array or object, return an empty array
    else {
        result = [];
    }
    // Return the result array with the parent key appended
    if (parentKey)
        return [...result, parentKey];
    else
        return result;
}
//# sourceMappingURL=paths.js.map