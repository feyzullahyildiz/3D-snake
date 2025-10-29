import * as THREE from "three";

export const createFood = (scene: THREE.Scene, x: number, y: number) => {
  const geometry = new THREE.CapsuleGeometry(0.2, 0.1, 0.1, 8);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    shininess: 50,
    emissive: 0xcc3300,
  });
  const food = new THREE.Mesh(geometry, material);
  food.position.set(x, 1.5, y);
  scene.add(food);
  return {
    updateFood: (time: number) => {
      food.position.y += Math.sin(time * 0.005) * 0.01;
      food.rotation.y += 0.02;
    },
    updateFoodPosition: (newX: number, newY: number) => {
      food.position.set(newX, 1.5, newY);
    }
  };
};
