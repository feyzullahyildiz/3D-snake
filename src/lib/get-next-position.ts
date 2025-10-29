import * as THREE from "three";

export const getNextPosition = (
  currentX: number,
  currentY: number,
  nextX: number,
  nextY: number,
  speed: number,
  debug?: boolean
) => {
  const p1 = new THREE.Vector2(currentX, currentY);
  const p2 = new THREE.Vector2(nextX, nextY);

  const direction = new THREE.Vector2().subVectors(p2, p1);

  direction.normalize().round();

  if(debug) {
    // console.log("DIR", direction.x, direction.y);
  }
  return {
    x: p1.x + direction.x * speed,
    y: p1.y + direction.y * speed,
  };
};
