import * as THREE from "three";
import type { SnakeBodyPart } from "../helper/types";

/**
 * createGround: lacivert -> mor arası parlak metalik kutular döndüren fonksiyon
 * @param {number} size - grid kenar uzunluğu (ör. 5 => 5x5 kutu)
 * @param {number} boxSize - kutu boyutu
 */
export const createGround = (scene: THREE.Scene, size = 5, boxSize = 0.85) => {
  if (size % 2 === 0) {
    throw new Error("ground size number should be odd");
  }
  const texture = new THREE.TextureLoader().load("cube_texture.bmp");
  texture.colorSpace = THREE.SRGBColorSpace;

  const halfSize = size / 2;
  const tileWidth = size;
  const centerPos = new THREE.Vector2(0, 0); // x for x, y for z
  const allGroups: THREE.Group[] = [];

  let i = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      const group = new THREE.Group();
      const tiles = getTileArray(size, boxSize, i, texture);
      group.add(...tiles);
      group.position.set(dx * tileWidth, 0, dz * tileWidth);
      scene.add(group);
      allGroups.push(group);
      i++;
    }
  }

  return {
    updateGround: (_time: number, _speed: number, head: SnakeBodyPart) => {
      const pos = head.mesh.position;
      let xDiff = pos.x - centerPos.x;
      let zDiff = pos.z - centerPos.y;

      // Sağ geçiş (right)
      if (xDiff > halfSize) {
        const leftX = centerPos.x - tileWidth;
        const newRightX = centerPos.x + 2 * tileWidth;
        allGroups.forEach((group) => {
          if (group.position.x === leftX) {
            group.position.x = newRightX;
          }
        });
        centerPos.x += tileWidth;
      }

      // Sol geçiş (left)
      if (xDiff < -halfSize) {
        const rightX = centerPos.x + tileWidth;
        const newLeftX = centerPos.x - 2 * tileWidth;
        allGroups.forEach((group) => {
          if (group.position.x === rightX) {
            group.position.x = newLeftX;
          }
        });
        centerPos.x -= tileWidth;
      }

      // Yukarı geçiş (up, positive z)
      if (zDiff > halfSize) {
        const bottomZ = centerPos.y - tileWidth;
        const newTopZ = centerPos.y + 2 * tileWidth;
        allGroups.forEach((group) => {
          if (group.position.z === bottomZ) {
            group.position.z = newTopZ;
          }
        });
        centerPos.y += tileWidth;
      }

      // Aşağı geçiş (down, negative z)
      if (zDiff < -halfSize) {
        const topZ = centerPos.y + tileWidth;
        const newBottomZ = centerPos.y - 2 * tileWidth;
        allGroups.forEach((group) => {
          if (group.position.z === topZ) {
            group.position.z = newBottomZ;
          }
        });
        centerPos.y -= tileWidth;
      }

      // Diff'leri güncelle (eğer birden fazla yönde tetiklendiyse)
      xDiff = pos.x - centerPos.x;
      zDiff = pos.z - centerPos.y;
    },
  };
};

function getTileArray(size: number, boxSize: number, colorIndex: number, texture: THREE.Texture) {
  const start = -Math.trunc(size / 2);
  const end = Math.abs(start);
  const arr = [];
  for (let i = start; i <= end; i++) {
    for (let j = start; j <= end; j++) {
      // 💜 Lacivert - mor arası yumuşak gradient
      const t = (i + size) / (size * 3) + colorIndex;
      const hue = 0.62 + 0.1 * t; // HSL hue aralığı: 0.65 (lacivert) → 0.75 (mor)
      const color = new THREE.Color().setHSL(hue, 1.0, 0.5);
      const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        map: texture
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i, 0.5, j);
      arr.push(mesh);
    }
  }
  return arr;
}

// createOther8TileArrays fonksiyonuna gerek yok, çünkü tüm 9 tile set aynı şekilde oluşturuluyor.
