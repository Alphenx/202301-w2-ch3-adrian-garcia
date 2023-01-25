import { strictEquals } from "./index.js";

test("strict equals of 1 and -1 should be false", () => {
  const result = strictEquals(1, -1);
  expect(result).toBe(false);
});
