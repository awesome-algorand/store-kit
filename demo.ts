/**
 * This is a demo script that creates random users and locations and deploys them to the Algorand blockchain
 *
 * The script also captures the statistics like the total MBR of all users and locations,
 * the average MBR, and the max and min MBR.
 *
 *
 *
 */
import {AlgorandClient, Config} from "@algorandfoundation/algokit-utils";
import {Store} from "./src";
import {toMBR} from "./src/objects";
import {Semaphore} from 'async-mutex';
import {faker} from '@faker-js/faker';

const mutex = new Semaphore(25);
const TOTAL = 100


Config.configure({
  debug: false,
  logger: {
    verbose(message: string, ...optionalParams) {

    },
    debug(message: string, ...optionalParams) {

    },
    info(message: string, ...optionalParams) {

    },
    warn(message: string, ...optionalParams) {

    },
    error(message: string, ...optionalParams) {

    },
  }
})

// Previously used complex object for PoC
const TEST_OBJECT = {
  yo: "homie",
  foo: {bar: "baz"},
  numbers: 200,
  smoochie: "land",
  bignums: BigInt(2222),
  arr: [1, 2, 3],
  wierdArr: [1, "two", BigInt(3), {really: "wierd", nested: [1, 2, 3]}]
}

export function createRandomUser() {
  return {
    appId: faker.number.int(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    // WEN HERMES VAULT!?!?
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: TOTAL,
});

export function createRandomLocation() {
  return {
    appId: faker.number.int(),
    userId: faker.helpers.arrayElement(users).appId,
    country: faker.location.country(),
    city: faker.location.city(),
    // streetAddress: faker.location.streetAddress(),
    // zipCode: faker.location.zipCode(),
    state: faker.location.state(),

  };
}

export const locations = faker.helpers.multiple(createRandomLocation, {
  count: TOTAL/2,
});

const data = users.reduce((acc, user) => {
  acc[user.appId] = {
    total: BigInt(0),
    user: toMBR(user),
    locations: locations.filter((location) => location.userId === user.appId).map((location) => toMBR(location)),
  }
  acc[user.appId].total = acc[user.appId].locations.reduce((acc, location) => acc + location, acc[user.appId].user)
  return acc
}, {} as { [key: string]: { user: bigint, locations: bigint[], total: bigint } })


const totals = Object.keys(data).map(k => data[k].total)
const totalMBR = totals.reduce((p, c) => p + c, BigInt(0))
const averageMBR = totalMBR / BigInt(totals.length)

console.log(`Example User:`, faker.helpers.arrayElement(users))
console.log(`Example Location:`, faker.helpers.arrayElement(locations))

console.log(`Total Users: ${users.length}`)
console.log(`Total Locations: ${locations.length}`)
console.log(`Total MBR: ${totalMBR.microAlgo().algo}`)
console.log(`Average MBR: ${averageMBR.microAlgo().algo}`)
console.log(`Max MBR: ${totals.reduce((p, c) => p > c ? p : c).microAlgo().algo}`)
console.log(`Min MBR: ${totals.reduce((p, c) => p < c ? p : c).microAlgo().algo}`)


console.log(`Deploying Store with ${users.length} users and ${locations.length} locations`)

const algorand = AlgorandClient.fromEnvironment()
const deployer = await algorand.account.fromEnvironment('DEPLOYER')
const balance = await algorand.client.algod.accountInformation(deployer.addr).do().then((info) => info.amount)
console.log(`Deploying with ${deployer.addr}`)
console.log(`Account balance: ${balance.microAlgo().algo}`)
console.log(`Deploying to ${await algorand.client.network().then((n) => n.genesisId)}`)

await Promise.all(users.map(async (user) => {
  const store = new Store({algorand, deployer, options: user})
  await mutex.runExclusive(async () => {
    await store.init(`user-${user.appId.toString()}`)
  })
}))

console.log(`Deployed ${users.length} users`)

await Promise.all(locations.map(async (user) => {
  const store = new Store({algorand, deployer, options: user})
  await mutex.runExclusive(async () => {
    await store.init(`location-${user.appId.toString()}`)
  })
}))

console.log(`Deployed ${locations.length} locations`)

const resultBalance = await algorand.client.algod.accountInformation(deployer.addr).do().then((info) => info.amount)
const diff = balance - resultBalance
console.log(`Deployed with ${diff.microAlgo().algo} spent`)
console.log(`Final Average: ${(diff / BigInt(users.length)).microAlgo().algos}`)
