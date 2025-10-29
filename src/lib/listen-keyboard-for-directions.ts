import * as THREE from "three";

export const createListenKeyboardForDirections = (
  cb: (vector: THREE.Vector2) => void
) => {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case "W":
        cb(new THREE.Vector2(0, -1));
        break;
      case "ArrowDown":
      case "s":
      case "S":
        cb(new THREE.Vector2(0, 1));
        break;
      case "ArrowRight":
      case "d":
      case "D":
        cb(new THREE.Vector2(1, 0));
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        cb(new THREE.Vector2(-1, 0));
        break;
      case "r":
      case "R":
        window.location.reload();
        break;
    }
  });
};
