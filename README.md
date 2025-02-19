# store-kit

A simple key-value store for Algorand Smart Contracts with ORM like mapping.

This project has been generated using AlgoKit. See below for default getting started instructions.

## Justification

Records in Algorand Smart Contracts are stored as key-value pairs.
This is a simple key-value store that allows you to store and retrieve data from the blockchain.
By leveraging a standard schema and key specification,
you can easily store and retrieve data from the blockchain and map it to a more complex object.

### Why:

The napkin math is around ~$42 for 1000 User records for MBR which would be reclaimable 
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

This library provides an interface and utilites to interact with the Algorand Blockchain and the Store.

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
    options: {
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

## TODO:

- [X] Explain Why
- [ ] Reactive Store [WIP]
- [ ] Read/Write Throughput and Limitations with concrete examples/fixtures
- [ ] V2: ORM like mapping with Factory or "$ref" key
