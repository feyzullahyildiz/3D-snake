import * as THREE from "three";
import { getOldPosition } from "./get-old-position";
import { getNextPosition } from "./get-next-position";

const HEIGHT = 1.38;
const THRESHOLD = 0.15;

enum Direction {
  X_PLUS = "X_PLUS",
  X_NEGATIVE = "X_NEGATIVE",
  Z_PLUS = "Z_PLUS",
  Z_NEGATIVE = "Z_NEGATIVE",
}
type BodyPart = {
  x: number
  z: number
  direction: Direction
}
export const createSnake = (
  scene: THREE.Scene,
  x: number,
  y: number,
  boxSize: number,
  updateHeadPosition: (x: number, y: number, z: number) => void,
  updateDemoPosition: (x: number, z: number) => void
) => {
  let snakeLength = 4;
  let direction = new THREE.Vector2(0, -1); // Başlangıç yönü sağa
  let nextDirection = new THREE.Vector2(0, -1); // Başlangıç yönü sağa

  const headGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0xee1100,
    // shininess: 20,
  });

  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(x, HEIGHT, y);
  scene.add(head);

  const bodyParts: THREE.Mesh[] = [];
  // const bodyPartDirections: THREE.Vector2[] = [];
  const bodyPart = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
  });

  // Create body parts with proper spacing
  for (let i = 1; i <= snakeLength; i++) {
    const bodyGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const item = new THREE.Mesh(bodyGeometry, bodyPart);
    item.position.set(x + direction.x * i, HEIGHT, y - direction.y * i);
    scene.add(item);
    bodyParts.push(item);
    // bodyPartDirections.push(new THREE.Vector2(direction.x, direction.y));
  }

  const speed = 0.03;
  let isTurning = false;

  // const checkTurning = () => {
  //   if (!isTurning) return;
  //   const resetTurning = () => {
  //     isTurning = false;
  //     direction.x = nextDirection.x;
  //     direction.y = nextDirection.y;
  //   };
  //   const hx = head.position.x;
  //   const hz = head.position.z;
  //   if (nextDirection.x === 0) {
  //     if (Math.abs(hx % 1) < THRESHOLD) {
  //       resetTurning();
  //       head.position.x = Math.round(head.position.x);
  //     }
  //   } else {
  //     if (Math.abs(hz % 1) < THRESHOLD) {
  //       resetTurning();
  //       head.position.z = Math.round(head.position.z);
  //     }
  //   }
  // };
  return {
    updateSnake: (time: number) => {
      // TODO speed parametresi gelsin... Zamana göre hesaplanabilmeli, fps'e göre değil

      // checkTurning();

      // Move head
      if (direction.x === 0) {
        head.position.z += direction.y * speed;
      } else {
        head.position.x += direction.x * speed;
      }

      // Update head position for collision detection
      updateHeadPosition(head.position.x, head.position.y, head.position.z);

      // Update body parts
      const hx = head.position.x;
      const hz = head.position.z;


    },
    updateDirection: (newDir: THREE.Vector2) => {
      if (isTurning) {
        return;
      }
      if (
        Math.abs(direction.x) === Math.abs(newDir.x) &&
        Math.abs(direction.y) === Math.abs(newDir.y)
      ) {
        // Aynı yönde gitmeye çalışıyor, yoksay
        return;
      }
      nextDirection.x = newDir.x;
      nextDirection.y = newDir.y;

      isTurning = true;
    },
  };
};
