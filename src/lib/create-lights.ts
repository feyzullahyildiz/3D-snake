import * as THREE from "three";
import type { SnakeBodyPart } from "../helper/types";

export const createLights = (scene: THREE.Scene) => {
  // Ortam ışığını güçlü tutalım ama yıkıcı olmasın
  const ambient = new THREE.AmbientLight(0x00FF00, 2);
  scene.add(ambient);

  // Ana sert ışık — elmas yüzeyleri parlatır
  const dirLight = new THREE.DirectionalLight(0xffffff, 5);
  dirLight.position.set(0, 20, 0);

  dirLight.shadow.mapSize.set(1024, 1024);
  // dirLight.castShadow = true;
  scene.add(dirLight);

  // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);
  // scene.add(dirLightHelper);

  // Karşıdan soğuk dolgu ışığı — mavi parıltı verir
  // const fillLight = new THREE.DirectionalLight(0x99ccff, 2.0);
  // fillLight.position.set(-5, 5, -5);
  // scene.add(fillLight);

  // Hafif renkli vurgular – elmasın içindeki ışık kırılmalarını taklit eder
  // const warmLight = new THREE.PointLight(0xffffff, 8, 15);
  // warmLight.position.set(3, 3, 4);
  // warmLight.castShadow = true;
  // // warmLight.shadow.mapSize.set(1024, 1024);
  // scene.add(warmLight);

  // const warmLightHelper = new THREE.PointLightHelper(warmLight);
  // scene.add(warmLightHelper);

  // const coolLight = new THREE.PointLight(0x88bbff, 1.5, 20);
  // coolLight.position.set(-2, 3, -3);
  // scene.add(coolLight);

  return {
    updateDirectionalLight: (
      time: number,
      speed: number,
      head: SnakeBodyPart
    ) => {
      // dirLight.lookAt(head.mesh.position);
      // warmLight.position.x = head.mesh.position.x-1;
      // warmLight.position.z = head.mesh.position.z ;
      // warmLight.position.y = 3;
    },
  };
};
