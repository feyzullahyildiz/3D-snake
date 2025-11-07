import * as THREE from "three";

export const createFoodCollisitionDedector = () => {
  return {
    getIsOnFood: (head: THREE.Vector3, food: THREE.Vector3) => {
      const distance = head.distanceTo(food);
      return distance < 0.1;
    },
  };
};
