import {AlgorandClient} from "@algorandfoundation/algokit-utils";

import type {SigningAccount, TransactionSignerAccount} from "@algorandfoundation/algokit-utils/types/account";
import type {Address} from "algosdk";

// Lodash Set Clients and Store
import { Store } from '@tanstack/store';
import {LodashClient, LodashFactory} from "./Lodash.js";
import {toPaths} from "./toPaths.js";
import set from 'lodash.set';
import get from 'lodash.get';

// Deployer Type
export type Deployer =  Address & TransactionSignerAccount & { account: SigningAccount }

/**
 * Represents the parameters required for initializing and interacting with the TealKit library.
 *
 * @template T - A generic type representing additional options/configurations specific to the implementation.
 *
 * @property {AlgorandClient} algorand - Instance of the Algorand client used for network interactions.
 * @property {Deployer} deployer - Instance responsible for contract deployment and management.
 * @property {bigint} [appId] - Optional identifier for the associated application on the Algorand blockchain.
 * @property {T} [options] - Optional additional configuration or options specific to the use case.
 */
export type StoreKitParams<T> = {
  algorand: AlgorandClient;
  deployer: Deployer
  appId?: bigint;
  options?: T;
}

export class StoreKit<T> extends Store<T> {
  appId?: bigint;
  // TODO: Wallet Manager
  //manager: WalletManager
  deployer: Deployer
  algorand: AlgorandClient
  factory: LodashFactory
  client?: LodashClient

  constructor({ algorand, deployer, appId, options }: StoreKitParams<T>) {
    // Ensure algorand is provided
    if (typeof algorand === "undefined" || !(algorand instanceof AlgorandClient)) {
      throw new TypeError("algorand is required")
    }
    // Ensure deployer is provided
    if (typeof deployer === "undefined") {
      throw new TypeError("deployer is required")
    }

    // Super Size Me!
    super(options || {} as T);

    // Ensure appId is a bigint
    if(typeof appId !== "undefined" && typeof appId !== "bigint") {
      throw new TypeError("appId must be a bigint")
    } else if (typeof appId === "bigint") {
      this.appId = appId
    }

    this.algorand = algorand;
    this.deployer = deployer;
    this.factory = algorand.client.getTypedAppFactory(LodashFactory, {
      defaultSender: deployer.addr,
    })
    this.client = undefined
  }
  async init() {
    if(typeof this.client !== "undefined") {
      throw new Error("Already initialized")
    }
    if(typeof this.appId === "undefined") {
      const { appClient, result } = await this.factory.deploy({ onUpdate: 'append', onSchemaBreak: 'append' })
      // TODO: MBR
      if (['create', 'replace'].includes(result.operationPerformed)) {
        await this.algorand.send.payment({
          amount: (1).algo(),
          sender: this.deployer.addr,
          receiver: appClient.appAddress,
        })
      }
      this.client = appClient
      this.appId = appClient.appId
      console.log(`Deployed app with id: ${this.appId}`)
    } else {
      this.client = this.factory.getAppClientById({ appId: this.appId })
    }

  }
  // TODO: MBR
  async save(deployer?: Deployer) {
    // Ensure the app has been initialized
    if(typeof this.client === "undefined") {
      throw new TypeError("Ensure init has been run before saving")
    }
    // Ensure a deployer is provided
    if(typeof this.deployer === "undefined" && typeof deployer === "undefined") {
      throw new TypeError("Deployer is required")
    }
    // Save State On-Chain
    await Promise.all(
      // Map State to Lodash Paths
      toPaths(this.state, undefined)
        // Filter out undefined paths
        .filter(path=>typeof path !== 'undefined' &&
          (
            typeof get(this.state, path) === 'string' ||
            typeof get(this.state, path) === 'number' ||
            typeof get(this.state, path) === 'bigint'
          )
        )
        // Send each path to the network
        .map((path) => {
          console.log(`Saving ${path} with value: ${get(this.state, path as string)}`)
          return this.client?.send.set({
            args: { path: path as string, value: get(this.state, path as string).toString() },
            boxReferences: [`orm_${path}`]
          })
        })
    )
  }

  async assemble(): Promise<T> {
    if(typeof this.appId === "undefined") {
      throw new TypeError("Ensure init has been run before saving")
    }
    const names = await this.algorand.app.getBoxNames(this.appId)
    const values = await this.algorand.app.getBoxValues(this.appId, names)
    let data = {}
    const decoder = new TextDecoder()
    names.forEach((bName, idx) => {
      const valueString = decoder.decode(values[idx])
      let value: string | bigint
      try{
        value = BigInt(valueString)
      } catch (e) {
        value = valueString
      }
      set(data, bName.name.replace("orm_", ''), value)
    })
    return data as T
  }
}
