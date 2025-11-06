import * as THREE from "three";

export const createRelativePosition = (size: number) => {
  const relative = new THREE.Vector3();
  const half = Math.trunc(size / 2);
  return {
    getRelativePosition: (pos: THREE.Vector3) => {
      const x = ((pos.x + half) % size) - half;
      const z = ((pos.z + half) % size) - half;
      relative.x = x;
      relative.y = pos.y;
      relative.z = z;

      return relative;
    },
  };
};
