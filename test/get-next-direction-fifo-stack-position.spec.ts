import { expect, test, describe } from "vitest";
import { getNextDirectionFIFOStackPosition as fn } from "../src/helper/get-next-direction-fifo-stack-position";
import { SnakeDirection as SD } from "../src/helper/types";

describe("getNextDirectionFIFOStackPosition", () => {
  test("X_PLUS for positive values", () => {
    expect(fn(0, 0, SD.X_PLUS)).toEqual({ x: 0, z: 0 });
    expect(fn(0.29, 0, SD.X_PLUS)).toEqual({ x: 1, z: 0 });

    expect(fn(0.3, 9, SD.X_PLUS)).toEqual({ x: 1, z: 9 });
    expect(fn(0.5, 9, SD.X_PLUS)).toEqual({ x: 1, z: 9 });
    expect(fn(0.75, 9, SD.X_PLUS)).toEqual({ x: 1, z: 9 });
    expect(fn(0.95, 9, SD.X_PLUS)).toEqual({ x: 1, z: 9 });
  });
  test("X_PLUS for minus values", () => {
    expect(fn(-1, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.1, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.2, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.3, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.4, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.5, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.6, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.7, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.8, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.9, 9, SD.X_PLUS)).toEqual({ x: -1, z: 9 });
    expect(fn(-2, 9, SD.X_PLUS)).toEqual({ x: -2, z: 9 });
    expect(fn(-2.1, 9, SD.X_PLUS)).toEqual({ x: -2, z: 9 });
  });

  test("X_NEGATIVE for positive values", () => {
    expect(fn(0, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.1, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.2, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.3, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.4, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.5, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.6, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.7, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.8, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(0.9, 9, SD.X_NEGATIVE)).toEqual({ x: 0, z: 9 });
    expect(fn(1, 9, SD.X_NEGATIVE)).toEqual({ x: 1, z: 9 });
  });
  test("X_NEGATIVE for negative values", () => {
    expect(fn(-0.1, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.2, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.3, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.4, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.5, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.6, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.7, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.8, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-0.9, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-1, 9, SD.X_NEGATIVE)).toEqual({ x: -1, z: 9 });
    expect(fn(-1.1, 9, SD.X_NEGATIVE)).toEqual({ x: -2, z: 9 });
  });

  test("Z_PLUS for positive values", () => {
    expect(fn(9, 0, SD.Z_PLUS)).toEqual({ x: 9, z: 0 });
    expect(fn(9, 0.1, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.2, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.3, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.4, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.5, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.6, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.7, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.8, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 0.9, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 1, SD.Z_PLUS)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 1.1, SD.Z_PLUS)).toEqual({ x: 9, z: 2 });
  });
  test("Z_PLUS for negative values", () => {
    expect(fn(9, -0.1, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.2, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.3, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.4, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.5, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.6, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.7, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.8, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -0.9, SD.Z_PLUS)).toEqual({ x: 9, z: -0 });
    expect(fn(9, -1, SD.Z_PLUS)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -1.1, SD.Z_PLUS)).toEqual({ x: 9, z: -1 });
  });
  test("Z_NEGATIVE for positive values", () => {
    expect(fn(9, 0, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 0 });
    expect(fn(9, 0.1, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 0 });
    expect(fn(9, 0.2, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 0 });

    expect(fn(9, 0.8, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 0 });
    expect(fn(9, 0.9, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 0 });
    expect(fn(9, 1, SD.Z_NEGATIVE)).toEqual({ x: 9, z: 1 });
    expect(fn(9, 1.1, SD.Z_NEGATIVE)).toEqual({ x: 9, z:1 });
  });
  test("Z_NEGATIVE for negative values", () => {
    expect(fn(9, -0.1, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -0.2, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -0.8, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -0.9, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -1, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -1 });
    expect(fn(9, -1.1, SD.Z_NEGATIVE)).toEqual({ x: 9, z: -2 });

  });
});
