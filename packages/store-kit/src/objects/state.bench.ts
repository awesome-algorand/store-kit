import { bench, describe } from "vitest";
import { ASSEMBLE } from "./state.fixtures";

import { assemble, diff, deepMerge } from "./state";

describe("storekit/objects/state", () => {
  bench("assemble", () => {
    bench("empty", () => {
      assemble([]);
    });
    bench("small", () => {
      for (const { args } of ASSEMBLE) {
        assemble(args);
      }
    });
    bench("medium", () => {
      for (const { args } of ASSEMBLE) {
        assemble(args);
      }
    });
  });
  bench("diff", () => {
    bench("empty", () => {
      diff(
        { another: "key", hello: "world" },
        { another: "key", hello: "world" },
      );
    });
    bench("small", () => {
      for (const _ of ASSEMBLE) {
        diff(
          { another: "key", hello: "world" },
          { another: "key", hello: "world" },
        );
      }
    });
    bench("medium", () => {
      for (const _ of ASSEMBLE) {
        diff(
          { another: "key", hello: "world" },
          { another: "key", hello: "world" },
        );
      }
    });
  });
  bench("deepMerge", () => {
    bench("empty", () => {
      deepMerge(
        { another: "key", hello: "world" },
        { another: "key", hello: "world" },
      );
    });
    bench("small", () => {
      for (const _ of ASSEMBLE) {
        deepMerge(
          { another: "key", hello: "world" },
          { another: "key", hello: "world" },
        );
      }
    });
    bench("medium", () => {
      for (const _ of ASSEMBLE) {
        deepMerge(
          { another: "key", hello: "world" },
          { another: "key", hello: "world" },
        );
      }
    });
  });
});
