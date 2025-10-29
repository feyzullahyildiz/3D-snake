import { expect, test, describe } from "vitest";
import { getOldPosition } from "../src/lib/get-old-position.js";

describe("getOldPosition +X", () => {
  test("basic cases", () => {
    expect(getOldPosition(0, 0, 1, 0)).toEqual({ x: -1, y: 0 });

    expect(getOldPosition(0.1, 0, 1, 0)).toEqual({ x: 0, y: 0 });

    expect(getOldPosition(0.9, 0, 1, 0)).toEqual({ x: 0, y: 0 });

    expect(getOldPosition(1.1, 0, 1, 0)).toEqual({ x: 1, y: 0 });
    expect(getOldPosition(1.9, 0, 1, 0)).toEqual({ x: 1, y: 0 });
  });

  test("1, 2, 3", () => {
    expect(getOldPosition(1, 0, 1, 0)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(2, 0, 1, 0)).toEqual({ x: 1, y: 0 });
    expect(getOldPosition(3, 0, 1, 0)).toEqual({ x: 2, y: 0 });
  });
  test("-1, -2, -3", () => {
    expect(getOldPosition(-1, 0, 1, 0)).toEqual({ x: -2, y: 0 });
    expect(getOldPosition(-2, 0, 1, 0)).toEqual({ x: -3, y: 0 });
    expect(getOldPosition(-3, 0, 1, 0)).toEqual({ x: -4, y: 0 });
  });
  test("minus", () => {
    expect(getOldPosition(-0.1, 0, 1, 0)).toEqual({ x: -1, y: 0 });
    expect(getOldPosition(-0.9, 0, 1, 0)).toEqual({ x: -1, y: 0 });
    expect(getOldPosition(-1.1, 0, 1, 0)).toEqual({ x: -2, y: 0 });
    expect(getOldPosition(-5.5, 0, 1, 0)).toEqual({ x: -6, y: 0 });
  });
});

describe("getOldPosition +Y", () => {
  test("basic cases", () => {
    expect(getOldPosition(0, 0, 0, 1)).toEqual({ x: 0, y: -1 });
    expect(getOldPosition(0, 0.1, 0, 1)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(0, 0.9, 0, 1)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(0, 1.1, 0, 1)).toEqual({ x: 0, y: 1 });
    expect(getOldPosition(0, 1.9, 0, 1)).toEqual({ x: 0, y: 1 });

    expect(getOldPosition(0, -0.1, 0, 1)).toEqual({ x: 0, y: -1 });
    expect(getOldPosition(0, -0.9, 0, 1)).toEqual({ x: 0, y: -1 });

    expect(getOldPosition(0, -1, 0, 1)).toEqual({ x: 0, y: -2 });
    expect(getOldPosition(0, -2, 0, 1)).toEqual({ x: 0, y: -3 });
    expect(getOldPosition(0, -3, 0, 1)).toEqual({ x: 0, y: -4 });

    expect(getOldPosition(0, -1.1, 0, 1)).toEqual({ x: 0, y: -2 });
    expect(getOldPosition(0, -1.9, 0, 1)).toEqual({ x: 0, y: -2 });
  });

  test("1, 2, 3", () => {
    expect(getOldPosition(0, 1, 0, 1)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(0, 2, 0, 1)).toEqual({ x: 0, y: 1 });
    expect(getOldPosition(0, 3, 0, 1)).toEqual({ x: 0, y: 2 });
  });
  test("-1, -2, -3", () => {
    expect(getOldPosition(0, -1, 0, 1)).toEqual({ x: 0, y: -2 });
    expect(getOldPosition(0, -2, 0, 1)).toEqual({ x: 0, y: -3 });
    expect(getOldPosition(0, -3, 0, 1)).toEqual({ x: 0, y: -4 });
  });
});

describe("getOldPosition -X", () => {
  test("basic cases", () => {
    expect(getOldPosition(0, 0, -1, 0)).toEqual({ x: 1, y: 0 });

    expect(getOldPosition(0.1, 0, -1, 0)).toEqual({ x: 1, y: 0 });
    expect(getOldPosition(0.9, 0, -1, 0)).toEqual({ x: 1, y: 0 });
    expect(getOldPosition(1.1, 0, -1, 0)).toEqual({ x: 2, y: 0 });
    expect(getOldPosition(1.9, 0, -1, 0)).toEqual({ x: 2, y: 0 });

    expect(getOldPosition(0, 0, -1, 0)).toEqual({ x: 1, y: 0 });
    expect(getOldPosition(-0.1, 0, -1, 0)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(-0.9, 0, -1, 0)).toEqual({ x: 0, y: 0 });

    expect(getOldPosition(-1.1, 0, -1, 0)).toEqual({ x: -1, y: 0 });
    expect(getOldPosition(-1.9, 0, -1, 0)).toEqual({ x: -1, y: 0 });
  });

  test("1, 2, 3", () => {
    expect(getOldPosition(1, 0, -1, 0)).toEqual({ x: 2, y: 0 });
    expect(getOldPosition(2, 0, -1, 0)).toEqual({ x: 3, y: 0 });
    expect(getOldPosition(3, 0, -1, 0)).toEqual({ x: 4, y: 0 });
  });
  test("-1, -2, -3", () => {
    expect(getOldPosition(-1, 0, -1, 0)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(-2, 0, -1, 0)).toEqual({ x: -1, y: 0 });
    expect(getOldPosition(-3, 0, -1, 0)).toEqual({ x: -2, y: 0 });
  });
});

describe("getOldPosition -Y", () => {
  test("basic cases", () => {
    expect(getOldPosition(0, 0, 0, -1)).toEqual({ x: 0, y: -1 });
    expect(getOldPosition(0, 0.1, 0, -1)).toEqual({ x: 0, y: 1 });
    expect(getOldPosition(0, 0.9, 0, -1)).toEqual({ x: 0, y: 1 });
    expect(getOldPosition(0, 1, 0, -1)).toEqual({ x: 0, y: 2 });
    expect(getOldPosition(0, 1.1, 0, -1)).toEqual({ x: 0, y: 2 });

    expect(getOldPosition(0, -0.1, 0, -1)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(0, -0.9, 0, -1)).toEqual({ x: 0, y: 0 });

    expect(getOldPosition(0, -1.1, 0, -1)).toEqual({ x: 0, y: -1 });
    expect(getOldPosition(0, -1.9, 0, -1)).toEqual({ x: 0, y: -1 });
  });

  test("1, 2, 3", () => {
    expect(getOldPosition(0, 1, 0, -1)).toEqual({ x: 0, y: 2 });
    expect(getOldPosition(0, 2, 0, -1)).toEqual({ x: 0, y: 3 });
    expect(getOldPosition(0, 3, 0, -1)).toEqual({ x: 0, y: 4 });
  });
  test("-1, -2, -3", () => {
    expect(getOldPosition(0, -1, 0, -1)).toEqual({ x: 0, y: 0 });
    expect(getOldPosition(0, -2, 0, -1)).toEqual({ x: 0, y: -1 });
    expect(getOldPosition(0, -3, 0, -1)).toEqual({ x: 0, y: -2 });
  });
});
