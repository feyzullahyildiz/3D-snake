import * as THREE from "three";
import { createOrbits } from "./create-orbits";
import type { GameOption, SnakeBodyPart } from "../helper/types";

export const createOrbitCamera = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  gameOption: GameOption
) => {
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);

  camera.position.x = 0;
  camera.position.y = 14;
  camera.position.z = 0;
  camera.lookAt(0, 0, 0);

  createOrbits(camera, renderer.domElement);

  scene.add(camera);
  return {
    orbitCamera: camera,
    updateOrbitCamera: (_time: number, _speed: number, head: SnakeBodyPart) => {
      if (gameOption.orbit_follow_snake) {
        camera.position.x = head.mesh.position.x;
        camera.position.z = head.mesh.position.z;
        // camera.position.y = 10;
      }
      renderer.setClearColor(0x000000, 1);
      const size = 500;
      renderer.setScissor(window.innerWidth - size, 10, size - 10, size);
      renderer.setViewport(window.innerWidth - size, 10, size - 10, size);

      renderer.render(scene, camera);
    },
  };
};
