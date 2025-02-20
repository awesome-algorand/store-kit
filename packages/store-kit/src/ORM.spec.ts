import { expect, test } from "vitest";
import { Orm } from "./ORM";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import { NetworkId, WalletId, WalletManager } from "@txnlab/use-wallet";

globalThis.prompt = () => {
  return "";
};

test.skip("Orm", async () => {
  const algorand = AlgorandClient.fromEnvironment();
  const manager = new WalletManager({
    wallets: [WalletId.KMD],
    defaultNetwork: NetworkId.LOCALNET,
  });

  await manager.wallets[0].connect();
  const orm = new Orm({ algorand, manager });

  // Create a unique ID for the store
  const store = await orm.create("com.awesomealgo.users.JohnDoe", {
    name: "test",
    new: "things",
  });
  // store.setState({name: "John Doe", age: 42})
  await store.init();
  // await store.save()
});
