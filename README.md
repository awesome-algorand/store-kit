# store-kit

A simple key-value store for Algorand Smart Contracts with ORM like mapping.

This project has been generated using AlgoKit. See below for default getting started instructions.

## Getting Started

> It's best to use the AlgoKit CLI to start a localnet.

```bash
npm install awesome-algorand/store-kit --save
```

```javascript
import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import { StoreKit } from '@awesome-algorand/store-kit';

const algorand = AlgorandClient.fromEnvironment()
const deployer = await algorand.account.fromEnvironment('DEPLOYER')

const myHomie = new StoreKit({
    algorand,
    deployer,
    // appId: BigInt(1025), // Optional id to use for the app
    options: {
        yo: "homie",
        foo: { bar: "baz" },
        numbers: 200,
        bignums: BigInt(2222),
        arr: [1, 2, 3],
        wierdArr: [1, "two", BigInt(3), { really: "wierd" }]
    }
})

// Sync the state manually with the blockchain
await myHomie.save()
// Get the state from the blockchain
console.log( await myHomie.assemble())
```

## TODO:

- [ ] Explain Why
- [ ] Reactive Store
- [ ] V2: ORM like mapping with Factory or "$ref" key
