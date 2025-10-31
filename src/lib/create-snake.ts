import * as THREE from "three";
import { getOldPosition } from "./get-old-position";
import { getNextPosition } from "./get-next-position";
import { SnakeDirection, type SnakeBodyPart } from "./types";
import { calculatePositionAndDirection } from "./calculate-position-and-direction";

const HEIGHT = 1.38;
const THRESHOLD = 0.1;
// const NEXT_DIRECTION_THRESHOLD = 0.05;

export const createSnake = (
  scene: THREE.Scene,
  x: number,
  y: number,
  boxSize: number,
  notifyHeadPosition: (x: number, y: number, z: number) => void,
  updateDemoPosition: (x: number, z: number) => void
) => {
  let snakeLength = 24;
  // let direction = new THREE.Vector2(0, -1); // Başlangıç yönü sağa
  // let nextDirection = new THREE.Vector2(0, -1); // Başlangıç yönü sağa

  const headGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0xee1100,
    // shininess: 20,
  });

  const headMesh = new THREE.Mesh(headGeometry, headMaterial);
  headMesh.position.set(x, HEIGHT, y);
  scene.add(headMesh);

  const bodyParts: SnakeBodyPart[] = [];
  // const bodyPartDirections: THREE.Vector2[] = [];
  const bodyPart = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
  });

  const head: SnakeBodyPart = {
    mesh: headMesh,
    direction: SnakeDirection.Z_NEGATIVE,
  };
  // Create body parts with proper spacing
  for (let i = 1; i <= snakeLength; i++) {
    const bodyGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const mesh = new THREE.Mesh(bodyGeometry, bodyPart);
    mesh.position.set(x, HEIGHT, y + i);
    scene.add(mesh);
    bodyParts.push({ mesh, direction: SnakeDirection.Z_NEGATIVE });
  }

  // const speed = 0.03;
  let isTurning = false;

  let keyPressHitPositon = head.mesh.position.clone();
  let nextDirection: SnakeDirection = head.direction;
  const checkTurning = () => {
    if (!isTurning) return;
    const resetTurning = () => {
      console.log("resetTurning");
      isTurning = false;
      head.direction = nextDirection;
    };
    const hx = head.mesh.position.x;
    const hz = head.mesh.position.z;

    if (
      head.direction === SnakeDirection.X_PLUS ||
      head.direction === SnakeDirection.X_NEGATIVE
    ) {
      if (Math.abs(hx % 1) < THRESHOLD) {
        resetTurning();
        head.mesh.position.x = Math.round(head.mesh.position.x);
      }
    } else {
      if (Math.abs(hz % 1) < THRESHOLD) {
        resetTurning();
        head.mesh.position.z = Math.round(head.mesh.position.z);
      }
    }
  };
  return {
    updateSnake: (time: number, speed: number) => {
      checkTurning();

      // Move head
      // if (direction.x === 0) {
      //   head.position.z += direction.y * speed;
      // } else {
      //   head.position.x += direction.x * speed;
      // }

      // Update head position for collision detection

      // udpatePositionWithDirection(head.mesh.position, head.direction, speed);

      for (let i = 0; i < bodyParts.length; i++) {
        const current = bodyParts[i];
        const target = i === 0 ? head : bodyParts[i - 1];

        calculatePositionAndDirection(target, current);
        updatePositionWithDirection(
          current.mesh.position,
          current.direction,
          speed
        );
      }

      /* ***************** */

      // for (let i = bodyParts.length - 1; i > -1; i--) {
      //   // console.log("I", i)
      //   const current = bodyParts[i];
      //   const target = i === 0 ? head : bodyParts[i - 1];
        
      //   calculatePositionAndDirection(target, current, i === 0);
      //   // updatePositionWithDirection(
      //   //   current.mesh.position,
      //   //   current.direction,
      //   //   speed
      //   // );
      // }
      updatePositionWithDirection(head.mesh.position, head.direction, speed);

      notifyHeadPosition(
        headMesh.position.x,
        headMesh.position.y,
        headMesh.position.z
      );
    },
    updateDirection: (newDir: THREE.Vector2) => {
      if (isTurning) {
        console.log("isTurning CANCELLED");
        return;
      }
      console.log("isTurning STARTED");
      // if (
      //   Math.abs(direction.x) === Math.abs(newDir.x) &&
      //   Math.abs(direction.y) === Math.abs(newDir.y)
      // ) {
      //   // Aynı yönde gitmeye çalışıyor, yoksay
      //   return;
      // }
      if (newDir.x === 1) {
        nextDirection = SnakeDirection.X_PLUS;
      } else if (newDir.x === -1) {
        nextDirection = SnakeDirection.X_NEGATIVE;
      } else if (newDir.y === 1) {
        nextDirection = SnakeDirection.Z_PLUS;
      } else if (newDir.y === -1) {
        nextDirection = SnakeDirection.Z_NEGATIVE;
      } else {
        throw new Error("Invalid direction");
      }
      keyPressHitPositon.set(
        head.mesh.position.x,
        head.mesh.position.y,
        head.mesh.position.z
      );
      isTurning = true;
    },
  };
};

function updatePositionWithDirection(
  position: THREE.Vector3,
  direction: SnakeDirection,
  speed: number
) {
  switch (direction) {
    case SnakeDirection.X_PLUS:
      position.x += speed;
      break;
    case SnakeDirection.X_NEGATIVE:
      position.x -= speed;
      break;
    case SnakeDirection.Z_PLUS:
      position.z += speed;
      break;
    case SnakeDirection.Z_NEGATIVE:
      position.z -= speed;
      break;
  }
}
