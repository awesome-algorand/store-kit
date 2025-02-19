import {AlgorandClient} from "@algorandfoundation/algokit-utils";
import {StoreKit} from "./src";


async function test(){
  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  const myHomie = new StoreKit({
    algorand,
    deployer,
    appId: BigInt(1025),
    options: {
      yo: "homie",
      foo: { bar: "baz" },
      numbers: 200,
      bignums: BigInt(2222),
      arr: [1, 2, 3],
      wierdArr: [1, "two", BigInt(3), { really: "wierd" }]
    }
  })

  await myHomie.init()
  await myHomie.save()

  // TODO: make the homie reactive
  myHomie.subscribe((state) => {
    console.log(state)
  })
  // TODO: make the homie reactive
  console.log(await myHomie.assemble())
}

test()
