import { getIsDirectionOnX } from "./get-is-direction-on-x";
import { getNextDirectionFIFOStackPosition } from "./get-next-direction-fifo-stack-position";
import { getNextPositionByDirection } from "./get-next-position";
import type { SnakeFIFOItem } from "./types";

type Stack = {
  replace: boolean;
  stack: SnakeFIFOItem;
};
export const getNextDirectionFIFOStackByOldOne = (
  current: SnakeFIFOItem | undefined,
  next: SnakeFIFOItem
): Stack => {
  if (!current) {
    return {
      replace: false,
      stack: next,
    };
  }
  if (current.nextDirection === next.nextDirection) {
    return {
      replace: true,
      stack: current,
    };
  }
  const samePoint = current.x === next.x && current.z === next.z;
  if (!samePoint) {
    return {
      replace: false,
      stack: next,
    };
  }

  const isCurrentOnX = getIsDirectionOnX(current.nextDirection);
  const isNextOnX = getIsDirectionOnX(next.nextDirection);
  if (isCurrentOnX === isNextOnX) {
    // Yön aynı düzlemde. Yön değiştirilmeli.
    return {
      replace: true,
      stack: next,
    };
  }

  const nextStackPos = getNextDirectionFIFOStackPosition(
    current.x,
    current.z,
    current.nextDirection
  );

  return {
    replace: false,
    stack: {
      nextDirection: next.nextDirection,
      ...getNextPositionByDirection(
        nextStackPos.x,
        nextStackPos.z,
        current.nextDirection
      ),
    },
  };
};
