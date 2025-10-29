import * as THREE from "three";

export const createLights = (scene: THREE.Scene) => {
  const ambient = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambient);

  // DirectionalLight – sert, yönlü ışık (gölge için)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight2.position.set(5, 10, -7);
  scene.add(dirLight2);

//   const spotLight = new THREE.SpotLight(0xffffff);
//   spotLight.position.set(10, 10, 10);
//   scene.add(spotLight);

//   const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//   scene.add(spotLightHelper);
};
