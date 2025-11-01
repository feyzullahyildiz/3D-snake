import { expect, test, describe } from "vitest";
import { getNextDirectionFIFOStackByOldOne as fn } from "../src/helper/get-next-direction-fifo-stack-by-old-one";
import { SnakeDirection as SD } from "../src/helper/types";

describe("getNextDirectionFIFOStackByOldOne", () => {
  test("X_PLUS it should replace with same direction", () => {
    expect(
      fn(
        { nextDirection: SD.X_PLUS, x: 0, z: 0 },
        { nextDirection: SD.X_PLUS, x: 0, z: 0 }
      )
    ).toEqual({
      replace: true,
      stack: {
        nextDirection: SD.X_PLUS,
        x: 0,
        z: 0,
      },
    });
  });
  test("X_PLUS it should replace with same direction to X_NEGATIVE", () => {
    expect(
      fn(
        { nextDirection: SD.X_PLUS, x: 0, z: 0 },
        { nextDirection: SD.X_NEGATIVE, x: 0, z: 0 }
      )
    ).toEqual({
      replace: true,
      stack: {
        nextDirection: SD.X_NEGATIVE,
        x: 0,
        z: 0,
      },
    });
  });
  test("it should just append if current is undefined", () => {
    expect(
      fn(
        undefined,
        { nextDirection: SD.X_NEGATIVE, x: 1, z: 2 }
      )
    ).toEqual({
      replace: false,
      stack: {
        nextDirection: SD.X_NEGATIVE,
        x: 1,
        z: 2,
      },
    });
  });
  test("it should just append if it is not on the same point", () => {
    expect(
      fn(
        { nextDirection: SD.Z_PLUS, x: 0, z: 0 },
        { nextDirection: SD.X_NEGATIVE, x: 1, z: 2 }
      )
    ).toEqual({
      replace: false,
      stack: {
        nextDirection: SD.X_NEGATIVE,
        x: 1,
        z: 2,
      },
    });
  });
  test("it should stack next position with the new position", () => {
    expect(
      fn(
        { nextDirection: SD.Z_PLUS, x: 0, z: 0 },
        { nextDirection: SD.X_PLUS, x: 0, z: 0 }
      )
    ).toEqual({
      replace: false,
      stack: {
        nextDirection: SD.X_PLUS,
        x: 0,
        z: 1,
      },
    });
  });
  test("it should replace if it is on the same line", () => {
    expect(
      fn(
        { nextDirection: SD.Z_PLUS, x: 0, z: 0 },
        { nextDirection: SD.Z_NEGATIVE, x: 0, z: 0 }
      )
    ).toEqual({
      replace: true,
      stack: {
        nextDirection: SD.Z_NEGATIVE,
        x: 0,
        z: 0,
      },
    });
  });
});
