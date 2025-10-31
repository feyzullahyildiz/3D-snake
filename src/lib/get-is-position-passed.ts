import { getIsDirectionOnX } from "./get-is-direction-on-x";
import { getIsDirectionPositive } from "./get-is-direction-positive";
import type { SnakeDirection } from "./types";

export const getIsPositionPassed = (
  px: number,
  pz: number,
  qx: number,
  qz: number,
  direction: SnakeDirection
): boolean => {
  const isOnX = getIsDirectionOnX(direction);
  const isPositive = getIsDirectionPositive(direction);

  const diff = isOnX ? px - qx : pz - qz;
  if (isPositive) return diff <= 0;
  return diff >= 0;
};
