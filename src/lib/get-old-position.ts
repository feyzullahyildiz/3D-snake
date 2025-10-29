export const getOldPosition = (
  x: number,
  y: number,
  vectorX: number,
  vectorY: number
) => {
  //   +X
  if (vectorX === 1 && vectorY === 0) {
    if (x === 0) {
      return { x: -1, y };
    } else if (x < 0) {
      const floored = Math.floor(x);
      if (x === floored) {
        return { x: floored - 1, y };
      }
      return { x: floored, y };
    } else {
      const floored = Math.floor(x);
      if (x === floored) {
        return { x: floored - 1, y };
      }
      return { x: floored, y };
    }
  }

  //   +Y
  if (vectorX === 0 && vectorY === 1) {
    if (y === 0) {
      return { x, y: -1 };
    } else if (y < 0) {
      const floored = Math.floor(y);
      if (y === floored) {
        return { x, y: floored - 1 };
      }
      return { x, y: floored };
    } else {
      const floored = Math.floor(y);
      if (y === floored) {
        return { x, y: floored - 1 };
      }
      return { x, y: floored };
    }
  }

  //   -X
  if (vectorX === -1 && vectorY === 0) {
    if (x === 0) {
      return { x: 1, y };
    } else if (x < 0) {
      const floored = Math.floor(x);
      return { x: floored + 1, y };
    } else {
      return { x: Math.floor(x) + 1, y };
    }
  }

  //   -Y
  if (vectorX === 0 && vectorY === -1) {
    if (y === 0) {
      return { x, y: -1 };
    } else if (y < 0) {
      const floored = Math.floor(y);
      return { x, y: floored + 1 };
    } else {
      return { x, y: Math.floor(y) + 1 };
    }
  }
  return {
    x: 0,
    y: 0,
  };
};
