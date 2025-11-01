import * as THREE from "three";
import { createOrbits } from "./create-orbits";
import type { SnakeBodyPart } from "../helper/types";

export const createOrbitCamera = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) => {
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5000);

  camera.position.x = 0;
  camera.position.y = 14;
  camera.position.z = 0;
  camera.lookAt(0, 0, 0);

  createOrbits(camera, renderer.domElement);

  scene.add(camera);
  return {
    orbitCamera: camera,
    updateOrbitCamera: (_time: number, _speed: number, head: SnakeBodyPart) => {
      camera.position.x = head.mesh.position.x;
      camera.position.z = head.mesh.position.z;
      renderer.setClearColor(0x000000, 1);
      const size = 300;
      renderer.setScissor(window.innerWidth - size, 10, size - 10, size);
      renderer.setViewport(window.innerWidth - size, 10, size - 10, size);

      renderer.render(scene, camera);
    },
  };
};
