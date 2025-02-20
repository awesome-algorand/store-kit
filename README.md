# store-kit

> ![WARNING]
> This is an experimental project to test the viability of the box keys

A simple key-value store for Algorand Smart Contracts with ORM like mapping.

This project has been generated using AlgoKit. See below for default getting started instructions.

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
