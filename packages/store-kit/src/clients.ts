import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import {decodeAddress, isValidAddress} from "algosdk";
import {LodashClient} from "./lodash/index.js";

export class NotFoundError extends Error {
}

function isNotFoundError(e: Error | any) {
  return e.message.includes("not found") || e.message.includes("No app ID found")
}
export async function getClient(algorand: AlgorandClient, q?: string | bigint | null, name?: string) {
  const type = typeof q
  switch (type) {
    case "string":
      if (isValidAddress(q as string)) {
        return await algorand.client.getTypedAppClientByCreatorAndName(
          LodashClient,
          {
            creatorAddress: decodeAddress(q as string),
            appName: name,
          }
        ).catch((e: Error | any) => {
          // TODO: get exceptions upstream?
          if (isNotFoundError(e)) {
            throw new NotFoundError(e.message)
          } else {
            throw e
          }
        })
      } else {
        throw new Error("Invalid address")
      }
    case "bigint":
      return algorand.client.getTypedAppClientById(LodashClient, {appId: q as bigint})
    default:
        return await algorand.client.getTypedAppClientByNetwork(LodashClient).catch((e: Error | any) => {
          // TODO: get exceptions upstream?
          if (isNotFoundError(e)) {
            throw new NotFoundError(e.message)
          } else {
            throw e
          }
        })
  }
}
