import { SnakeDirection } from "./types";

export const getNextDirectionByRightLeft = (
  direction: SnakeDirection,
  click: "right" | "left"
) => {
  if (click === "right") {
    switch (direction) {
      case SnakeDirection.X_PLUS:
        return SnakeDirection.Z_PLUS;
      case SnakeDirection.X_NEGATIVE:
        return SnakeDirection.Z_NEGATIVE;
      case SnakeDirection.Z_PLUS:
        return SnakeDirection.X_NEGATIVE;
      case SnakeDirection.Z_NEGATIVE:
        return SnakeDirection.X_PLUS;
    }
  }
  switch (direction) {
    case SnakeDirection.X_PLUS:
      return SnakeDirection.Z_NEGATIVE;
    case SnakeDirection.X_NEGATIVE:
      return SnakeDirection.Z_PLUS;
    case SnakeDirection.Z_PLUS:
      return SnakeDirection.X_PLUS;
    case SnakeDirection.Z_NEGATIVE:
      return SnakeDirection.X_NEGATIVE;
  }
  return direction;
};
