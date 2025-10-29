import * as THREE from "three";

/**
 * createGround: lacivert -> mor arası parlak metalik kutular döndüren fonksiyon
 * @param {number} size  - grid yarı-genişliği (ör. 10 => (2*10+1)^2 kutu)
 * @param {number} boxSize - kutu boyutu
 */
export const createGround = (scene: THREE.Scene, size = 10, boxSize = 0.85) => {
  // const array = [];

  for (let i = -size; i <= size; i++) {
    for (let j = -size; j <= size; j++) {
      // 💜 Lacivert - mor arası yumuşak gradient
      const t = (i + size) / (size * 2);
      const hue = 0.65 + 0.1 * t; // HSL hue aralığı: 0.65 (lacivert) → 0.75 (mor)
      const color = new THREE.Color().setHSL(hue, 1.0, 0.5);

      const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        // emissive: color,
        shininess: 100,
        // wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i, 0.5, j);

      // array.push(mesh);
      scene.add(mesh);
    }
  }

  // return array;
};
