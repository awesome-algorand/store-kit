import {bench, describe, expect} from "vitest";
import {toMBR} from "./payments";
import {faker} from "@faker-js/faker";
const TOTAL = 100
export function createRandomUser() {
  return {
    appId: faker.number.int(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
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
describe("Feature Collection", () => {
  if(typeof process.env.INTEGRATION === 'undefined'){
    global.fetch = createMockFetch()
  }
  bench("empty input", async () => {
    await toFeatureCollection([])
  })
  bench("full fixture", async () => {
    await toFeatureCollection(fullFixtures as NfdRecordCollection)
  });
  bench("tiny fixture", async () => {
    await toFeatureCollection(tinyFixtures as NfdRecordCollection)
  });
  bench("brief fixture", async () => {
    await toFeatureCollection(briefFixtures as NfdRecordCollection)
  });
});
