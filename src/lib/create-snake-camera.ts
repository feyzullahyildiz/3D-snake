import * as THREE from "three";
import { SnakeDirection, type SnakeBodyPart } from "../helper/types";

export const createSnakeCamera = (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) => {
  const cam = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );

    // const camHelper = new THREE.CameraHelper(cam);
    // scene.add(camHelper);

  cam.position.set(0, 10, 10);
  cam.lookAt(0, 0, 0);
  scene.add(cam);

  // smooth geçiş için hedef pozisyon
  const targetPosition = new THREE.Vector3();

  return {
    updateSnakeCamera: (_time: number, _speed: number, head: SnakeBodyPart) => {
      cam.position.y = 7;
      const { x, z } = head.mesh.position;
      setCamTargetPosition(targetPosition, x, z, head.direction);

      // smooth geçiş: her frame’de biraz yaklaş
      cam.position.lerp(targetPosition, 0.08); // 0.08 → geçiş hızını ayarlayabilirsin (0.02 yavaş, 0.2 hızlı)
      cam.lookAt(head.mesh.position);

      renderer.setClearColor(0x222222, 1);
      renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
      renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

      renderer.render(scene, cam);
    },
  };
};

function setCamTargetPosition(
  target: THREE.Vector3,
  x: number,
  z: number,
  dir: SnakeDirection
) {
  const offset = 3.5;
  target.y = 3;
  switch (dir) {
    case SnakeDirection.X_PLUS:
      target.set(x - offset, 3, z);
      break;
    case SnakeDirection.X_NEGATIVE:
      target.set(x + offset, 3, z);
      break;
    case SnakeDirection.Z_PLUS:
      target.set(x, 3, z - offset);
      break;
    case SnakeDirection.Z_NEGATIVE:
      target.set(x, 3, z + offset);
      break;
  }
}
