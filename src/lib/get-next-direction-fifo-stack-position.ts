import { getIsDirectionOnX } from "./get-is-direction-on-x";
import { getIsDirectionPositive } from "./get-is-direction-positive";
import type { SnakeDirection } from "./types";

export const getNextDirectionFIFOStackPosition = (
  x: number,
  z: number,
  current: SnakeDirection
) => {

  const isOnX = getIsDirectionOnX(current);

  if (isOnX) {
    return {
      x: getNextValue(current, x),
      z,
    };
  }
  return {
    x,
    z: getNextValue(current, z),
  };
};

function getNextValue(dir: SnakeDirection, value: number) {
  const isPositive = getIsDirectionPositive(dir);
  const trunked = Math.trunc(value);
  if (trunked === value) {
    return value;
  } else if (value < 0 && isPositive) {
    return trunked;
  } else if (0 < value && !isPositive) {
    return trunked;
  }
  // console.log("WOW", dir, value)
  const offset = isPositive ? 1 : -1;
  const returnValue = Math.trunc(value) + offset;
  return returnValue;
}
