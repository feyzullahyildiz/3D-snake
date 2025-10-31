import { SnakeDirection } from "./types";

export const getIsDirectionOnX = (direction: SnakeDirection) => {
  return (
    direction === SnakeDirection.X_PLUS ||
    direction === SnakeDirection.X_NEGATIVE
  );
};
