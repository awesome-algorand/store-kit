/**
 * Recursively generates the paths for all keys in an object or array, formatted as dot notation.
 *
 * @param {any} obj The object or array for which to generate key paths.
 * @param {string} parentKey The key or path of the parent object, used to build the complete key paths.
 * @return {string[]} An array of strings representing the paths of the keys in dot notation.
 */
export function toPaths(obj: any, parentKey?: string): (string|undefined)[] {
  let result: (string|undefined)[];
  // TODO: exclude the parent key from the result
  if (Array.isArray(obj)) {
    let idx = 0;
    result = obj.flatMap(function (obj) {
      return toPaths(obj, (parentKey || '') + '[' + idx++ + ']');
    });
  }
  // TODO: better object detection
  else if (Object.prototype.toString.call(obj) === '[object Object]') {
    result = Object.keys(obj).flatMap(function (key) {
      return toPaths(obj[key], key).map(function (subkey : string | undefined) {
        return (parentKey ? parentKey + '.' : '') + subkey;
      });
    });
  }
  else {
    result = [];
  }
  return [...result, parentKey ];
}
