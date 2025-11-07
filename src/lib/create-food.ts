import * as THREE from "three";
import {
  create9TileGroups,
  update9TileGroupPosition,
} from "../helper/create-9-tile-logic";
import type { SnakeBodyPart } from "../helper/types";

const LIGHT_GROUP_NAME = "light-group";
const FOOD_NAME = "food";
export const createFood = (
  scene: THREE.Scene,
  x: number,
  y: number,
  z: number,
  groundSize: number
) => {
  const foodPosition = new THREE.Vector3(x, y, z)
  const { groups, center } = create9TileGroups(groundSize, () => {
    const geometry = new THREE.CapsuleGeometry(0.2, 0.1, 0.1, 8);

    const material = new THREE.MeshPhysicalMaterial({
      // color: 0xff80ff,
      color: 0xee2000,
      roughness: 0.35,
      metalness: 0.1,
      // clearcoat: 1.0,
      flatShading: true,
      // transparent: true,
    });

    const food = new THREE.Mesh(geometry, material);
    food.name = FOOD_NAME;
    food.castShadow = true;
    
    const group = new THREE.Group();
    const lightGroup = createLightGroup(scene);
    group.position.set(x, y, z);

    group.add(food);
    group.add(lightGroup);

    return group;
  });

  console.log("center", center)

  scene.add(...groups);

  return {
    updateFood: (time: number, speed: number, head: SnakeBodyPart) => {
      for (const g of groups) {
        const group = g as THREE.Group;
        const food = group.getObjectByName(FOOD_NAME) as THREE.Mesh;
        const lightGroup = group.getObjectByName(
          LIGHT_GROUP_NAME
        ) as THREE.Group;
        food.position.y = Math.sin(time * 3) / 10;
        food.rotation.y += speed / 3;
        lightGroup.position.y = food.position.y + 0.1;
        // lightGroup.rotation.y = food.rotation.y;
      }
      update9TileGroupPosition(groundSize, center, groups, head.mesh.position);
    },
    setFoodPosition: (newX: number, newZ: number) => {
      foodPosition.set(newX, foodPosition.y, newZ)
      // food.position.set(newX, 1.5, newY);
      for (const g of groups) {
        const group = g as THREE.Group;
        const food = group.getObjectByName(FOOD_NAME) as THREE.Mesh;
        const lightGroup = group.getObjectByName(
          LIGHT_GROUP_NAME
        ) as THREE.Group;

        food.position.x = newX;
        food.position.z = newZ;
        lightGroup.position.set(
          food.position.x,
          food.position.y,
          food.position.z
        );
      }
    },
    getRelativeFoodPosition: () => {
      return foodPosition
    }
  };
};

function createLightGroup(scene: THREE.Scene) {
  const intensity = 10;
  const distance = 10;
  const decay = 1;
  const l1 = new THREE.PointLight(0xffffff, intensity, distance, decay);
  l1.position.set(0, 0, 1);

  const l2 = new THREE.PointLight(0xffffff, intensity, distance, decay);
  l2.position.set(0, 0, -1);

  const l3 = new THREE.PointLight(0xffffff, intensity, distance, decay);
  l3.position.set(1, 0, 0);

  const l4 = new THREE.PointLight(0xffffff, intensity, distance, decay);
  l4.position.set(-1, 0, 0);

  const group = new THREE.Group();
  group.name = LIGHT_GROUP_NAME;
  group.add(l1);
  group.add(l2);
  group.add(l3);
  group.add(l4);

  const l1Helper = new THREE.PointLightHelper(l1);
  const l2Helper = new THREE.PointLightHelper(l2);
  const l3Helper = new THREE.PointLightHelper(l3);
  const l4Helper = new THREE.PointLightHelper(l4);
  // scene.add(l1Helper);
  // scene.add(l2Helper);
  // scene.add(l3Helper);
  // scene.add(l4Helper);

  return group;
}
