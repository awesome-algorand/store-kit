import { faker } from "@faker-js/faker";
import { KeyValue } from "./type";
const TOTAL = 100;
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
  count: TOTAL / 2,
});
export const ASSEMBLE: TestFixture<KeyValue[], object>[] = [
  {
    args: [
      ["hello", "world"],
      ["another", "key"],
    ],
    expected: { another: "key", hello: "world" },
  },
];

export const DIFF: TestFixture<[unknown, unknown], unknown>[] = [
  {
    args: [
      { another: "key", hello: "world" },
      { another: "key", hello: "world", additional: "key" },
    ],
    expected: [["orm_additional", "key"]],
  },
];

type TestFixture<TArgs, TExpected> = {
  args: TArgs;
  expected: TExpected;
};
