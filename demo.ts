/**
 * This is a demo script that creates random users and locations and deploys them to the Algorand blockchain
 *
 * The script also captures the statistics like the total MBR of all users and locations,
 * the average MBR, and the max and min MBR.
 *
 *
 *
 */
import { createWriteStream, unlinkSync, existsSync } from "fs";
import { AlgorandClient, Config } from "@algorandfoundation/algokit-utils";
import { Store } from "./packages/store-kit/src";
import { diff, toMBR, toPaths } from "./packages/store-kit/src/objects";
import { Semaphore } from "async-mutex";
import { faker } from "@faker-js/faker";
import { NetworkId, WalletId, WalletManager } from "@txnlab/use-wallet";
import { format } from "@fast-csv/format";

const mutex = new Semaphore(25);
const TOTAL = 200;

if (existsSync("_users.csv")) unlinkSync("_users.csv");
if (existsSync("_locations.csv")) unlinkSync("_locations.csv");
if (existsSync("_mbr.csv")) unlinkSync("_mbr.csv");

const userStream = format({ delimiter: "," });
userStream.pipe(createWriteStream("_users.csv"));
userStream.write([
  "appId",
  "username",
  "email",
  "avatar",
  "password",
  "birthdate",
  "registeredAt",
]);
const locationStream = format({ delimiter: "," });
locationStream.pipe(createWriteStream("_locations.csv"));
locationStream.write(["appId", "userId", "country", "city", "state"]);
const mbrStream = format({ delimiter: "," });
mbrStream.pipe(createWriteStream("_mbr.csv"));
mbrStream.write([
  "appId",
  "user-size",
  "user-mbr",
  "locations-size",
  "locations-mbr",
  "locations-count",
  "total-mbr",
]);

Config.configure({
  debug: false,
  logger: {
    verbose(message: string, ...optionalParams) {},
    debug(message: string, ...optionalParams) {},
    info(message: string, ...optionalParams) {},
    warn(message: string, ...optionalParams) {},
    error(message: string, ...optionalParams) {},
  },
});

// Previously used complex object for PoC
const TEST_OBJECT = {
  yo: "homie",
  foo: { bar: "baz" },
  numbers: 200,
  smoochie: "land",
  bignums: BigInt(2222),
  arr: [1, 2, 3],
  wierdArr: [1, "two", BigInt(3), { really: "wierd", nested: [1, 2, 3] }],
};

export function createRandomUser() {
  const data = {
    appId: faker.number.int(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    // WEN HERMES VAULT!?!?
    // password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
  userStream.write([
    data.appId,
    data.username,
    data.email,
    data.avatar,
    data.birthdate,
    data.registeredAt,
  ]);
  return data;
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: TOTAL,
});

export function createRandomLocation() {
  const data = {
    appId: faker.number.int(),
    userId: faker.helpers.arrayElement(users).appId,
    country: faker.location.country(),
    city: faker.location.city(),
    // streetAddress: faker.location.streetAddress(),
    // zipCode: faker.location.zipCode(),
    state: faker.location.state(),
  };
  locationStream.write([
    data.appId,
    data.userId,
    data.country,
    data.city,
    data.state,
  ]);
  return data;
}

export const locations = faker.helpers.multiple(createRandomLocation, {
  count: TOTAL / 2,
});

const data = users.reduce(
  (acc, user) => {
    const uLocations = locations.filter(
      (location) => location.userId === user.appId,
    );
    acc[user.appId] = {
      total: BigInt(0),
      user: toMBR(user),
      locations: uLocations.map((location) => toMBR(location)),
    };

    const locationMbr = acc[user.appId].locations.reduce(
      (acc, location) => acc + location,
      0n,
    );
    acc[user.appId].total = locationMbr + acc[user.appId].user;

    // @ts-expect-error, let me be in peace
    const userSize = diff({}, user).reduce(
      (acc, kv) => acc + kv[0].length + kv[1].toString().length,
      0,
    );
    const locationSize = diff([], uLocations).reduce(
      (acc, kv) => acc + kv[0].length + kv[1].toString().length,
      0,
    );
    mbrStream.write([
      user.appId,
      userSize,
      acc[user.appId].user,
      locationSize,
      locationMbr,
      uLocations.length,
      acc[user.appId].total,
    ]);
    return acc;
  },
  {} as { [key: string]: { user: bigint; locations: bigint[]; total: bigint } },
);

const totals = Object.keys(data).map((k) => data[k].total);
const totalMBR = totals.reduce((p, c) => p + c, BigInt(0));
const averageMBR = totalMBR / BigInt(totals.length);

console.log(`Example User:`, faker.helpers.arrayElement(users));
console.log(`Example Location:`, faker.helpers.arrayElement(locations));

console.log(`Total Users: ${users.length}`);
console.log(`Total Locations: ${locations.length}`);
console.log(`Total MBR: ${totalMBR.microAlgo().algo}`);
console.log(`Average MBR: ${averageMBR.microAlgo().algo}`);
console.log(
  `Max MBR: ${totals.reduce((p, c) => (p > c ? p : c)).microAlgo().algo}`,
);
console.log(
  `Min MBR: ${totals.reduce((p, c) => (p < c ? p : c)).microAlgo().algo}`,
);

console.log(
  `Deploying Store with ${users.length} users and ${locations.length} locations`,
);

const algorand = AlgorandClient.fromEnvironment();
const deployer = await algorand.account.fromEnvironment("DEPLOYER");
const balance = await algorand.client.algod
  .accountInformation(deployer.addr)
  .do()
  .then((info) => info.amount);

const manager = new WalletManager({
  wallets: [WalletId.KMD],
  defaultNetwork: NetworkId.LOCALNET,
});
globalThis.prompt = () => {
  return "";
};
await manager.wallets[0].connect();

console.log(`Deploying with ${manager.activeAddress}`);
console.log(`Account balance: ${balance.microAlgo().algo}`);
console.log(
  `Deploying to ${await algorand.client.network().then((n) => n.genesisId)}`,
);

await Promise.all(
  users.map(async (user) => {
    const store = new Store(user);
    store.setAlgorand(algorand);
    store.setManager(manager);
    await mutex.runExclusive(async () => {
      await store.init(`user-${user.appId.toString()}`);
      console.log(await store.assemble());
    });
  }),
);

console.log(`Deployed ${users.length} users`);

await Promise.all(
  locations.map(async (user) => {
    const store = new Store(user);
    store.setAlgorand(algorand);
    store.setManager(manager);
    await mutex.runExclusive(async () => {
      await store.init(`location-${user.appId.toString()}`);
      console.log(await store.assemble());
    });
  }),
);

console.log(`Deployed ${locations.length} locations`);

const resultBalance = await algorand.client.algod
  .accountInformation(deployer.addr)
  .do()
  .then((info) => info.amount);
const bDiff = balance - resultBalance;
console.log(`Deployed with ${bDiff.microAlgo().algo} spent`);
console.log(
  `Final Average: ${(bDiff / BigInt(users.length)).microAlgo().algos}`,
);

locationStream.end();
userStream.end();
mbrStream.end();
