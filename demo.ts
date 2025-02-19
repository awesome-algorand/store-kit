import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import {Store} from "./src";
import {toMBR} from "./src/objects";


async function test(){
  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  const myHomie = new Store({
    algorand,
    deployer,
    // appId: BigInt(1025),
    options: {
      yo: "homie",
      foo: { bar: "baz" },
      numbers: 200,
      smoochie: "land",
      bignums: BigInt(2222),
      arr: [1, 2, 3],
      wierdArr: [1, "two", BigInt(3), { really: "wierd", nested: [1,2,3] }]
    }
  })
  // Create Contract
  await myHomie.init()
  console.log(toMBR(myHomie.state))
  // Save State
  await myHomie.save()

  // TODO: make the homie reactive
  myHomie.subscribe((state) => {
    console.log(state)
  })
  // TODO: make the homie reactive
  console.log(JSON.stringify(await myHomie.assemble(), (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
}

test()
