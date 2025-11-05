import * as THREE from "three";

type CB =
  | ((i: number, dx: number, dz: number) => THREE.Object3D)
  | ((i: number, dx: number, dz: number) => THREE.Object3D[]);
export const create9TileGroups = (size: number, cb: CB) => {
  const center = new THREE.Vector2(0, 0); // x for x, y for z
  const groups: THREE.Object3D[] = [];
  let i = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      const item = cb(i, dx, dz);
      const noGroup = Array.isArray(item) === false;
      if (noGroup) {
        item.position.set(dx * size, item.position.y, dz * size);
        groups.push(item);
      } else {
        const group = new THREE.Group();
        group.add(...item);
        group.position.set(dx * size, 0, dz * size);
        groups.push(group);
      }
      i++;
    }
  }
  return { groups, center };
};

export const update9TileGroupPosition = (
  size: number,
  centerPos: THREE.Vector2,
  allGroups: THREE.Object3D[],
  position: THREE.Vector3
) => {
  const halfSize = size / 2;

  const xDiff = position.x - centerPos.x;
  const zDiff = position.z - centerPos.y;

  // Sağ geçiş (right)
  if (xDiff > halfSize) {
    const leftX = centerPos.x - size;
    const newRightX = centerPos.x + 2 * size;
    allGroups.forEach((group) => {
      if (group.position.x === leftX) {
        group.position.x = newRightX;
      }
    });
    centerPos.x += size;
  }

  // Sol geçiş (left)
  if (xDiff < -halfSize) {
    const rightX = centerPos.x + size;
    const newLeftX = centerPos.x - 2 * size;
    allGroups.forEach((group) => {
      if (group.position.x === rightX) {
        group.position.x = newLeftX;
      }
    });
    centerPos.x -= size;
  }

  // Yukarı geçiş (up, positive z)
  if (zDiff > halfSize) {
    const bottomZ = centerPos.y - size;
    const newTopZ = centerPos.y + 2 * size;
    allGroups.forEach((group) => {
      if (group.position.z === bottomZ) {
        group.position.z = newTopZ;
      }
    });
    centerPos.y += size;
  }

  // Aşağı geçiş (down, negative z)
  if (zDiff < -halfSize) {
    const topZ = centerPos.y + size;
    const newBottomZ = centerPos.y - 2 * size;
    allGroups.forEach((group) => {
      if (group.position.z === topZ) {
        group.position.z = newBottomZ;
      }
    });
    centerPos.y -= size;
  }
};
