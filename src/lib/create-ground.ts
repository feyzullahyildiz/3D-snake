import * as THREE from "three";
import type { SnakeBodyPart } from "../helper/types";
import {
  create9TileGroups,
  update9TileGroupPosition,
} from "../helper/create-9-tile-logic";

/**
 * createGround: lacivert -> mor arası parlak metalik kutular döndüren fonksiyon
 * @param {number} size - grid kenar uzunluğu (ör. 5 => 5x5 kutu)
 * @param {number} boxSize - kutu boyutu
 */
export const createGround = (scene: THREE.Scene, size = 5, boxSize = 0.85) => {
  if (size % 2 === 0) {
    throw new Error("ground size number should be odd");
  }
  const texture = new THREE.TextureLoader().load("cube_texture.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(size, size); // 5x5 tekrar etsin örneğin
  const { groups, center } = create9TileGroups(
    size,
    (i) => getTile(size, boxSize, i, texture)
    // (i) => getTileArray(size, boxSize, i, texture)
    // getTileArray(size, boxSize, i, texture)
  );
  scene.add(...groups);

  return {
    updateGround: (_time: number, _speed: number, head: SnakeBodyPart) => {
      update9TileGroupPosition(size, center, groups, head.mesh.position);
    },
  };
};

function getTile(
  size: number,
  boxSize: number,
  colorIndex: number,
  texture: THREE.Texture
) {
  const geometry = new THREE.BoxGeometry(size, 1, size);

  const t = (1 + size) / (size * 3) + colorIndex;
  const hue = 0.62 + 0.1 * t; // HSL hue aralığı: 0.65 (lacivert) → 0.75 (mor)
  const color = new THREE.Color().setHSL(hue, 1.0, 0.5);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: 100,
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}
function getTileArray(
  size: number,
  boxSize: number,
  colorIndex: number,
  texture: THREE.Texture
) {
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
        map: texture,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i, 0.5, j);
      arr.push(mesh);
    }
  }
  return arr;
}

// createOther8TileArrays fonksiyonuna gerek yok, çünkü tüm 9 tile set aynı şekilde oluşturuluyor.
