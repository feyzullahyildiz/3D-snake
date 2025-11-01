import { SnakeDirection } from "./types";

export const getNextPositionByDirection = (
  x: number,
  z: number,
  direction: SnakeDirection
) => {
  if (direction === SnakeDirection.X_PLUS) {
    return { x: x + 1, z };
  }
  if (direction === SnakeDirection.X_NEGATIVE) {
    return { x: x - 1, z };
  }
  if (direction === SnakeDirection.Z_PLUS) {
    return { x, z: z + 1 };
  }
  if (direction === SnakeDirection.Z_NEGATIVE) {
    return { x, z: z - 1 };
  }
  return { x, z };
};
