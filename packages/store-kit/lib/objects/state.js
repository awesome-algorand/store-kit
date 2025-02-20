import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ALGORAND_CLIENT_REQUIRED } from "../errors.js";
import { PREFIX } from "./constants.js";
import { toPaths } from "./paths.js";
import get from "lodash.get";
import set from "lodash.set";
import { APPLICATION_ID_REQUIRED } from "./errors.js";
/**
 * Assembles a structured object from a list of key-value pairs, processes the keys
 * by removing a predefined prefix, and parses the values as BigInt.
 *
 * @param {KeyValue[]} kvs - An array of key-value pairs where each pair contains
 * a key as a string and a value to be processed.
 * @return A structured object of type T, assembled and sorted by keys.
 */
export function assemble(kvs) {
    const data = {};
    for (const [key, value] of kvs) {
        set(data, key.replace(PREFIX, ""), parseBigInt(value));
    }
    return Object.keys(data)
        .sort()
        .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});
}
export function parseBigInt(valueString) {
    let value;
    value = parseInt(valueString);
    if (isNaN(value)) {
        value = valueString;
    }
    return value;
}
/**
 * Assembles data from an Algorand application by retrieving and processing box names and their values.
 *
 * @param {AlgorandClient} algorand - The Algorand client instance to interact with the blockchain.
 * @param {bigint} appId - The ID of the application to retrieve the data from.
 *
 * @throws {TypeError} If the provided `algorand` parameter is not an instance of `AlgorandClient`.
 * @throws {TypeError} If the provided `appId` is not of type `bigint`.
 */
export async function fromBoxes(algorand, appId) {
    if (!(algorand instanceof AlgorandClient)) {
        throw new TypeError(ALGORAND_CLIENT_REQUIRED);
    }
    if (typeof appId !== "bigint") {
        throw new TypeError(APPLICATION_ID_REQUIRED);
    }
    const names = await algorand.app.getBoxNames(appId);
    const values = await algorand.app.getBoxValues(appId, names);
    const data = {};
    const decoder = new TextDecoder();
    for (let idx = 0; idx < names.length; idx++) {
        const bName = names[idx];
        const valueString = decoder.decode(values[idx]);
        set(data, bName.name.replace(PREFIX, ""), parseBigInt(valueString));
    }
    return Object.keys(data)
        .sort()
        .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});
}
/**
 * Compares two objects and returns an array of key-value pairs that represent the differences
 * between the two objects.
 *
 * @param {any} a - The first object to compare.
 * @param {any} b - The second object to compare.
 * @return An array of key-value pairs where the key is the modified path (prefixed),
 * and the value is the value from the second object at that path.
 */
export function diff(a, b) {
    const pathsA = toPaths(a);
    const pathsB = toPaths(b);
    const paths = new Set([...pathsA, ...pathsB]);
    const changes = [];
    paths.forEach((path) => {
        if (get(a, path) !== get(b, path)) {
            changes.push([`${PREFIX}${path}`, get(b, path)]);
        }
    });
    return changes;
}
/**
 * Recursively merges the properties of a source object into a target object.
 * If both the target and source properties are objects, it merges their properties deeply.
 * If not, it overwrites the target property with the source property.
 *
 * @param {any} target - The target object to merge properties into.
 * @param {any} source - The source object whose properties are to be merged into the target object.
 * @return The merged target object.
 */
export function deepMerge(target, source) {
    for (const key in source) {
        const currentTarget = target[key];
        const currentSource = source[key];
        if (typeof currentTarget === "object" &&
            typeof currentSource === "object") {
            target[key] = deepMerge(currentTarget, currentSource);
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
}
/**
 *
 * @todo
 * @param a
 * @param b
 */
export function convergence(a, b) {
    const delta = diff(a, b);
    if (delta.length > 0) {
        const obj = assemble(delta);
        console.log(obj, delta);
    }
}
//# sourceMappingURL=state.js.map