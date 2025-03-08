import { decodeAddress, isValidAddress } from "algosdk";
import { LodashClient } from "./lodash/index.js";
export class NotFoundError extends Error {
}
function isNotFoundError(e) {
    return e.message.includes("not found") || e.message.includes("No app ID found");
}
export async function getClient(algorand, q, name) {
    const type = typeof q;
    switch (type) {
        case "string":
            if (isValidAddress(q)) {
                return await algorand.client.getTypedAppClientByCreatorAndName(LodashClient, {
                    creatorAddress: decodeAddress(q),
                    appName: name,
                }).catch((e) => {
                    // TODO: get exceptions upstream?
                    if (isNotFoundError(e)) {
                        throw new NotFoundError(e.message);
                    }
                    else {
                        throw e;
                    }
                });
            }
            else {
                throw new Error("Invalid address");
            }
        case "bigint":
            return algorand.client.getTypedAppClientById(LodashClient, { appId: q });
        default:
            return await algorand.client.getTypedAppClientByNetwork(LodashClient).catch((e) => {
                // TODO: get exceptions upstream?
                if (isNotFoundError(e)) {
                    throw new NotFoundError(e.message);
                }
                else {
                    throw e;
                }
            });
    }
}
//# sourceMappingURL=clients.js.map