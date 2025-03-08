import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { WalletManager } from "@txnlab/use-wallet";
import { LodashFactory } from "./lodash/index.js";
import { Store } from "./Store.js";
export declare class Orm {
    private readonly _algorand;
    private readonly _manager;
    private readonly stores;
    constructor({ algorand, manager }: {
        algorand: AlgorandClient;
        manager: WalletManager;
    });
    /**
     * Experimental: Factory for the Lodash application.
     */
    protected factory: LodashFactory | null;
    add<T>(appId: bigint, refs?: bigint[]): Promise<Store<T>>;
    create<T>(name: string, initialState: T, refs?: bigint[]): Promise<Store<T>>;
}
