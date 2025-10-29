import * as THREE from "three";

const HEIGHT = 1.38;
const THRESHOLD = 0.15;

export const createSnake = (
  scene: THREE.Scene,
  x: number,
  y: number,
  boxSize: number,
  updateHeadPosition: (x: number, y: number, z: number) => void,
  updateDemoPosition: (x: number, z: number) => void,
) => {
  let snakeLength = 1;
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

  const checkTurning = () => {
    if (!isTurning) return;
    const resetTurning = () => {
      isTurning = false;
      direction.x = nextDirection.x;
      direction.y = nextDirection.y;
    };
    const hx = head.position.x;
    const hz = head.position.z;
    if (nextDirection.x === 0) {
      if (Math.abs(hx % 1) < THRESHOLD) {
        resetTurning();
        head.position.x = Math.round(head.position.x);
      }
    } else {
      if (Math.abs(hz % 1) < THRESHOLD) {
        resetTurning();
        head.position.z = Math.round(head.position.z);
      }
    }
  };
  return {
    updateSnake: (time: number) => {
      // TODO speed parametresi gelsin... Zamana göre hesaplanabilmeli, fps'e göre değil

      checkTurning();

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


      const h1X = Math.ceil(hx) - direction.x;
      const h1Z = Math.ceil(hz) - direction.y;
      updateDemoPosition(h1X, h1Z);

      for (let i = 0; i < bodyParts.length; i++) {
        const current = bodyParts[i];
        const target = i === 0 ? head : bodyParts[i - 1];

        // const currentDir = bodyPartDirections[i];
        // const target = i === 0 ? head : bodyParts[i - 1];
        // const targetDir = i === 0 ? direction : bodyPartDirections[i - 1];

        // Check if we need to change direction
        // if (Math.abs(target.position.x - current.position.x) >= 1 ||
        //     Math.abs(target.position.z - current.position.z) >= 1) {
        //   // Update direction to match target's direction
        //   currentDir.x = targetDir.x;
        //   currentDir.y = targetDir.y;
        // }

        // Move in current direction
        // if (currentDir.x === 0) {
        //   current.position.z += currentDir.y * speed;
        // } else {
        //   current.position.x += currentDir.x * speed;
        // }
      }
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
