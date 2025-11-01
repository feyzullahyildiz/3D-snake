import { SnakeDirection } from "./types";

export const getIsDirectionPositive = (direction: SnakeDirection) => {
  return (
    direction === SnakeDirection.X_PLUS || direction === SnakeDirection.Z_PLUS
  );
};
