import { expect, test, describe, beforeAll } from 'vitest';
import { Store } from './Store';
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { NetworkId, WalletId, WalletManager } from "@txnlab/use-wallet";
globalThis.prompt = () => {
    return "";
};
describe('Store', async () => {
    let _algorand;
    let _manager;
    // Connect to the KMD Wallet
    // TODO: Mock Wallet
    beforeAll(async () => {
        _algorand = AlgorandClient.fromEnvironment();
        _manager = new WalletManager({
            wallets: [WalletId.KMD],
            defaultNetwork: NetworkId.LOCALNET
        });
        await _manager.wallets[0].connect();
    });
    test('new Store()', async () => {
        const store = new Store({ anything: "is", possible: "here" });
        store.subscribe(() => {
            console.log("Triggered");
        });
        store.setState(() => ({ anything: "is", possible: "herez" }));
        expect(store).toBeDefined();
        store.setAlgorand(_algorand);
        store.setManager(_manager);
        await store.init();
    });
});
//# sourceMappingURL=Store.spec.js.map