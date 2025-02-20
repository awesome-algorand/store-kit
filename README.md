# store-kit

A simple key-value store for Algorand Smart Contracts with ORM like mapping.

This project has been generated using AlgoKit. See below for default getting started instructions.

## Justification

Records in Algorand Smart Contracts are stored as key-value pairs.
This is a simple key-value store that allows you to store and retrieve data from the blockchain.
By leveraging a standard schema and key specification,
you can easily store and retrieve data from the blockchain and map it to a more complex object.

### Why:

By sampling an average user record with a random number of associated locations, we find the following: 
```bash
Example User: {
  appId: 8355702757352782,
  username: 'Oma.OConner41',
  email: 'Kenneth_Altenwerth@yahoo.com',
  avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/90.jpg',
  password: 'KBWbPfMZzemeZwD',
  birthdate: 1995-05-10T20:02:24.043Z,
  registeredAt: 2024-08-15T15:38:54.886Z
}
Example Location: {
  appId: 1707885039888419,
  userId: 5757993133194675,
  country: 'Andorra',
  city: 'New Moises',
  state: 'Ohio'
}
Total Users: 100
Total Locations: 50
Total MBR: 32.5006
Average MBR: 0.325006
Max MBR: 0.8607
Min MBR: 0.2371
Deploying Store with 100 users and 50 locations
Deploying with VKW5JO3QOMT5DLF3WGTFVXDEBYZBTSW6BIDL6YSZJLMQ5YTGI3OGG3MYKA
Account balance: 1000
Deploying to dockernet-v1
Deployed 100 users
Deployed 50 locations
Deployed with 33.5506 spent
Final Average: 0.335506
```

The MBR is approximately `0.175` ALGO for the general use case which would be reclaimable 
(possibly by paying customers of the dapps that integrates). 
Most data requirements are Read heavy which would leverage the REST API. 
This would allow us to work with native Objects in our preferred language with Reactivity to the on-chain Boxes. 
It would also preserve and improve on Contract<->Contract integrations 
by having a standardized mapping of the keys to values.

### How:
Leverage lodash paths for JSON, which are similar to jq

```json
{
  "user":{
    "firstName": "Cosimo"
  }
}
```
Would be stored as:
```
orm_user.firstName: "Cosimo"
```

This library provides an interface and utilities to interact with the Algorand Blockchain and the Store.

## Getting Started

> It's best to use the AlgoKit CLI to start a localnet.

```bash
npm install awesome-algorand/store-kit --save
```

```javascript
import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import { Store } from '@awesome-algorand/store-kit';

const algorand = AlgorandClient.fromEnvironment()
const deployer = await algorand.account.fromEnvironment('DEPLOYER')

const myHomie = new Store({
    algorand,
    deployer,
    // appId: BigInt(1025), // Optional id to use for the app
    options: { // Also supports Arrays for full datasets. Can be fully dynamic, up to the constraints of the project
        yo: "homie",
        foo: { bar: "baz" },
        numbers: 200,
        bignums: BigInt(2222),
        arr: [1, 2, 3],
        wierdArr: [1, "two", BigInt(3), { really: "wierd" }]
    }
})

console.log()
// Sync the state manually with the blockchain
await myHomie.save()
// Get the state from the blockchain
console.log( await myHomie.assemble())
```

## Running the Demo

Clone this repository

```bash
git clone git@github.com:awesome-algorand/store-kit.git
```

Change into the directory

```bash
cd store-kit
```

Install the dependencies

```bash
algokit bootstrap all
```

Run the demo

```bash
algokit project deploy
```


## TODO:

- [X] Explain Why
- [ ] Reactive Store [WIP]
- [ ] Read/Write Throughput and Limitations with concrete examples/fixtures
  - [X] Generated Data with basic Use Case (demo)
  - [ ] Real World Use Case (demo)
  - [ ] Bulk Writes
- [ ] V2: ORM like mapping with Factory or "$ref" key
  - [ ] Atomically Composed Objects with References
