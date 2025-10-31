import { expect, test, describe } from "vitest";
import { getIsPositionPassed as fn } from "../src/lib/get-is-position-passed";
import { SnakeDirection as SD } from "../src/lib/types";

describe("getIsPositionPassed", () => {
  test("X_PLUS same values", () => {
    expect(fn(0, 0, 0, 0, SD.X_PLUS)).toBe(true);
    expect(fn(10, 10, 10, 10, SD.X_PLUS)).toBe(true);
  });
  
  test("X_PLUS for X values", () => {
    expect(fn(0, 0, 1, 0, SD.X_PLUS)).toBe(true);
    expect(fn(0, 0, 2, 0, SD.X_PLUS)).toBe(true);
    expect(fn(0, 0, 3, 0, SD.X_PLUS)).toBe(true);

    expect(fn(1, 0, 0, 0, SD.X_PLUS)).toBe(false);
    expect(fn(2, 0, 0, 0, SD.X_PLUS)).toBe(false);
  });
  test("X_NEGATIVE for X values", () => {
    expect(fn(0, 0, -2, 0, SD.X_NEGATIVE)).toBe(true);
    expect(fn(0, 0, -1, 0, SD.X_NEGATIVE)).toBe(true);
    expect(fn(0, 0, 0, 0, SD.X_NEGATIVE)).toBe(true);
    expect(fn(0, 0, 1, 0, SD.X_NEGATIVE)).toBe(false);
    expect(fn(0, 0, 2, 0, SD.X_NEGATIVE)).toBe(false);
    expect(fn(0, 0, 3, 0, SD.X_NEGATIVE)).toBe(false);

    expect(fn(1, 0, 3, 0, SD.X_NEGATIVE)).toBe(false);
    expect(fn(2, 0, 3, 0, SD.X_NEGATIVE)).toBe(false);

    expect(fn(3, 0, 3, 0, SD.X_NEGATIVE)).toBe(true);

  });
  test("Z_PLUS for X values", () => {
    expect(fn(0, -1, 0, 0, SD.Z_PLUS)).toBe(true);
    expect(fn(0, 0, 0, 0, SD.Z_PLUS)).toBe(true);
    expect(fn(0, 1, 0, 0, SD.Z_PLUS)).toBe(false);
    expect(fn(0, 2, 0, 0, SD.Z_PLUS)).toBe(false);

  });
  test("Z_NEGATIVE for X values", () => {
    expect(fn(0, -2, 0, 0, SD.Z_NEGATIVE)).toBe(false);
    expect(fn(0, -2, 0, -1, SD.Z_NEGATIVE)).toBe(false);
    expect(fn(0, -2, 0, -2, SD.Z_NEGATIVE)).toBe(true);
    expect(fn(0, -2, 0, -3, SD.Z_NEGATIVE)).toBe(true);

  });

});
