import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { ALGORAND_CLIENT_REQUIRED } from "../errors.js";
import { PREFIX } from "./constants.js";
import { toPaths } from "./paths.js";
import get from "lodash.get";
import set from "lodash.set";
import { APPLICATION_ID_REQUIRED } from "./errors.js";
export function assemble(kvs) {
    const data = {};
    for (const [key, value] of kvs) {
        set(data, key.replace(PREFIX, ''), parseBigInt(value));
    }
    return data;
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
    if (typeof appId !== 'bigint') {
        throw new TypeError(APPLICATION_ID_REQUIRED);
    }
    const names = await algorand.app.getBoxNames(appId);
    const values = await algorand.app.getBoxValues(appId, names);
    let data = {};
    const decoder = new TextDecoder();
    for (let idx = 0; idx < names.length; idx++) {
        const bName = names[idx];
        const valueString = decoder.decode(values[idx]);
        set(data, bName.name.replace(PREFIX, ''), parseBigInt(valueString));
    }
    return data;
}
/**
 * Compares two objects and returns an array of paths that have different values.
 * @param a
 * @param b
 */
export function diff(a, b) {
    const pathsA = toPaths(a);
    const pathsB = toPaths(b);
    const paths = new Set([...pathsA, ...pathsB]);
    const changes = [];
    paths.forEach(path => {
        if (get(a, path) !== get(b, path)) {
            changes.push([`${PREFIX}${path}`, get(b, path)]);
        }
    });
    return changes;
}
export function deepMerge(target, source) {
    for (const key in source) {
        if (typeof target[key] === 'object' && typeof source[key] === 'object') {
            target[key] = deepMerge(target[key] || {}, source[key]);
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
}
//# sourceMappingURL=state.js.map