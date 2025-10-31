import { SnakeDirection, type SnakeBodyPart } from "./types";

// TODO DIFF DEĞERİ EKSI OLDUĞUNDA AŞAĞIDA KONTROL ETMİYORUZ::::
const NEXT_DIRECTION_THRESHOLD = 0;

export function calculatePositionAndDirection(
  target: SnakeBodyPart,
  current: SnakeBodyPart,
  debug = false
) {
  const tarDir = target.direction;
  const curDir = current.direction;

  const tp = target.mesh.position;
  const cp = current.mesh.position;

  const isTargetOnX =
    tarDir === SnakeDirection.X_PLUS || tarDir === SnakeDirection.X_NEGATIVE;
  const isTargetOnZ =
    tarDir === SnakeDirection.Z_PLUS || tarDir === SnakeDirection.Z_NEGATIVE;
  const isCurrentOnX =
    curDir === SnakeDirection.X_PLUS || curDir === SnakeDirection.X_NEGATIVE;
  const isCurrentOnZ =
    curDir === SnakeDirection.Z_PLUS || curDir === SnakeDirection.Z_NEGATIVE;

  // İkisidi de aynı yöne gidiyorsa devam ettir.
  if (curDir === tarDir) {
    //
    if (curDir === SnakeDirection.X_PLUS) {
      cp.x = tp.x - 1;
      cp.z = tp.z;
    } else if (curDir === SnakeDirection.X_NEGATIVE) {
      cp.x = tp.x + 1;
      cp.z = tp.z;
    } else if (curDir === SnakeDirection.Z_PLUS) {
      cp.x = tp.x;
      cp.z = tp.z - 1;
    } else if (curDir === SnakeDirection.Z_NEGATIVE) {
      cp.x = tp.x;
      cp.z = tp.z + 1;
    }
    return curDir;
  }

  if (isTargetOnX) {
    const diff = cp.z - tp.z;
    if (debug) {
      console.log("X", diff);
    }
    if (isCurrentOnX && curDir !== tarDir) {
      console.log("IKISI DE X DE");
    }

    if (curDir === SnakeDirection.Z_PLUS && diff >= -NEXT_DIRECTION_THRESHOLD) {
      return update(target, current);
    } else if (
      curDir === SnakeDirection.Z_NEGATIVE &&
      diff <= NEXT_DIRECTION_THRESHOLD
    ) {
      return update(target, current);
    }
  } else if (isTargetOnZ) {
    if (isCurrentOnZ && curDir !== tarDir) {
      console.log("IKISI DE Z DE");
    }
    const diff = cp.x - tp.x;
    if (debug) {
      console.log("Z", diff);
    }
    if (curDir === SnakeDirection.X_PLUS && diff >= -NEXT_DIRECTION_THRESHOLD) {
      return update(target, current);
    } else if (
      curDir === SnakeDirection.X_NEGATIVE &&
      diff <= NEXT_DIRECTION_THRESHOLD
    ) {
      return update(target, current);
    }
  } else {
    console.log("WOW");
  }

  return curDir;
}

function update(target: SnakeBodyPart, current: SnakeBodyPart) {
  console.log("update");
  const dir = target.direction;
  current.direction = dir;
  const cp = current.mesh.position;
  const tp = target.mesh.position;
  if (dir === SnakeDirection.X_PLUS) {
    cp.z = tp.z;
    cp.x = tp.x - 1;
  } else if (dir === SnakeDirection.X_NEGATIVE) {
    cp.z = tp.z;
    cp.x = tp.x + 1;
  } else if (dir === SnakeDirection.Z_PLUS) {
    cp.x = tp.x;
    cp.z = tp.z - 1;
  } else if (dir === SnakeDirection.Z_NEGATIVE) {
    cp.x = tp.x;
    cp.z = tp.z + 1;
  }
}
