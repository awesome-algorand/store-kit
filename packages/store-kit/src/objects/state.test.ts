import { expect, test, describe } from "vitest";
import { assemble, deepMerge, diff } from "./state";
import { ASSEMBLE, DIFF } from "./state.fixtures";

describe("storekit/objects/state", () => {
  test("assemble", () => {
    ASSEMBLE.map(({ args, expected }) => {
      expect(assemble(args)).toEqual(expected);
      expect(Object.keys(assemble(args))).toEqual(Object.keys(expected));
    });
  });
  test("diff", () => {
    DIFF.map(({ args, expected }) => {
      expect(diff(...args)).toEqual(expected);
    });
  });
  test("deepMerge", () => {
    ASSEMBLE.map(({ args }) => {
      const result = deepMerge({ a: args[0] }, { b: args[1] });
      expect(result).toBeDefined();
    });
  });
});
