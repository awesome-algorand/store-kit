import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import type { SigningAccount, TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import type { Address } from "algosdk";
import { Store } from '@tanstack/store';
import { LodashClient, LodashFactory } from "./Lodash.js";
export type Deployer = Address & TransactionSignerAccount & {
    account: SigningAccount;
};
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
    deployer: Deployer;
    appId?: bigint;
    options?: T;
};
export declare class StoreKit<T> extends Store<T> {
    appId?: bigint;
    deployer: Deployer;
    algorand: AlgorandClient;
    factory: LodashFactory;
    client?: LodashClient;
    constructor({ algorand, deployer, appId, options }: StoreKitParams<T>);
    init(): Promise<void>;
    save(deployer?: Deployer): Promise<void>;
    assemble(): Promise<T>;
}
