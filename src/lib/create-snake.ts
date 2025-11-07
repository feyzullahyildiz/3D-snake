import * as THREE from "three";
import {
  SnakeDirection,
  type SnakeBodyPart,
  type SnakeFIFOItem,
} from "../helper/types";
import { getNextDirectionFIFOStackPosition } from "../helper/get-next-direction-fifo-stack-position";
import { getIsPositionPassed } from "../helper/get-is-position-passed";
import { getNextDirectionFIFOStackByOldOne } from "../helper/get-next-direction-fifo-stack-by-old-one";
import { getNextDirectionByRightLeft } from "../helper/get-next-direction-by-right-left";


export const createSnake = (
  scene: THREE.Scene,
  x: number,
  y: number,
  z: number,
  boxSize: number,
  notifyHeadPosition: (x: number, y: number, z: number) => void,
  // updateDemoPosition: (x: number, z: number) => void,
  updateHeadStack: (stack: Array<SnakeFIFOItem>) => void
) => {
  const texture = new THREE.TextureLoader().load("cube_texture.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  // texture.colorSpace = THREE.LinearSRGBColorSpace;

  let snakeLength = 5;

  // const headGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const headMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0xee1100,
    map: texture,
  });

  const bodyParts: SnakeBodyPart[] = [];
  // const bodyPartDirections: THREE.Vector2[] = [];
  const bodyPartMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    map: texture,
  });

  // Create body parts with proper spacing
  for (let i = 0; i <= snakeLength; i++) {
    const bodyGeometry = new THREE.BoxGeometry(
      i === 0 ? boxSize : boxSize / 1.1,
      i === 0 ? boxSize : boxSize / 1.1,
      i === 0 ? boxSize : boxSize / 1.1
    );
    const mesh = new THREE.Mesh(
      bodyGeometry,
      i === 0 ? headMaterial : bodyPartMaterial
    );
    // mesh.castShadow = true
    mesh.receiveShadow = true;
    // This position is getting fixed before the render
    mesh.position.set(x, y, z);
    scene.add(mesh);
    bodyParts.push({
      mesh,
      direction: SnakeDirection.X_PLUS,
      nextDirectionFIFOStack: [
        // {
        //   x: 2,
        //   z: 2,
        //   nextDirection: SnakeDirection.Z_NEGATIVE,
        // },
        // {
        //   x: 1,
        //   z: 2,
        //   nextDirection: SnakeDirection.X_PLUS,
        // },
        // {
        //   x: 1,
        //   z: -1,
        //   nextDirection: SnakeDirection.Z_PLUS,
        // },
        // {
        //   x: 0,
        //   z: -1,
        //   nextDirection: SnakeDirection.X_PLUS,
        // },
      ],
    });
  }

  const head = bodyParts[0];
  // const speed = 0.03;

  // let keyPressHitPositon = head.mesh.position.clone();
  return {
    updateSnake: (_time: number, speed: number) => {
      for (let i = 0; i < bodyParts.length; i++) {
        const part = bodyParts[i];
        const next =
          part.nextDirectionFIFOStack[part.nextDirectionFIFOStack.length - 1];
        if (next) {
          // dönüş var.
          const needToTurn = getIsPositionPassed(
            next.x,
            next.z,
            part.mesh.position.x,
            part.mesh.position.z,
            part.direction
          );
          if (needToTurn) {
            // Dönüş yapılmalı.
            // direction update et
            part.direction = next.nextDirection;
            // x ve z değerini stack position'ı ile güncelle.
            // part.mesh.position.x = next.x;
            // part.mesh.position.z = next.z;
            // stack'deki son elemanı arrayden çıkart.
            part.nextDirectionFIFOStack.pop();
            updateHeadStack(
              bodyParts[bodyParts.length - 1].nextDirectionFIFOStack
            );
          }
        }
        updatePositionWithDirection(part.mesh.position, part.direction, speed);
        if (i !== 0) {
          keepDistanceOnOne(bodyParts[i - 1], part);
        }
      }

      notifyHeadPosition(
        head.mesh.position.x,
        head.mesh.position.y,
        head.mesh.position.z
      );
      return head;
    },
    updateDirection: (rigthtLeft: "right" | "left") => {
      const nextDirection = getNextDirectionByRightLeft(
        head.direction,
        rigthtLeft
      );

      const nextStackPos = getNextDirectionFIFOStackPosition(
        head.mesh.position.x,
        head.mesh.position.z,
        head.direction
      );
      const nextStackState = getNextDirectionFIFOStackByOldOne(
        head.nextDirectionFIFOStack[0],
        // TODO buradaya gelen değer head konumu ile geliyor.
        // konum farklı ise head'in konumu tamamen ignorelanmalı sanki.
        // Sadece direction'a bakmalıyız diye düşündüm...
        {
          nextDirection,
          x: nextStackPos.x,
          z: nextStackPos.z,
        }
      );
      bodyParts.forEach((bp) => {
        if (nextStackState.replace) {
          bp.nextDirectionFIFOStack[0] = {
            nextDirection: nextStackState.stack.nextDirection,
            x: nextStackState.stack.x,
            z: nextStackState.stack.z,
          };
        } else {
          bp.nextDirectionFIFOStack.unshift({
            nextDirection: nextStackState.stack.nextDirection,
            x: nextStackState.stack.x,
            z: nextStackState.stack.z,
          });
        }
      });
      updateHeadStack(bodyParts[bodyParts.length - 1].nextDirectionFIFOStack);
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

function keepDistanceOnOne(target: SnakeBodyPart, current: SnakeBodyPart) {
  const tarDir = target.direction;
  const curDir = current.direction;
  if (curDir !== tarDir) {
    return;
  }
  const tp = target.mesh.position;
  const cp = current.mesh.position;
  //
  if (curDir === SnakeDirection.X_PLUS) {
    cp.x = tp.x - 1;
    cp.z = tp.z;
  } else if (curDir === SnakeDirection.X_NEGATIVE) {
    cp.x = tp.x + 1;
    cp.z = tp.z;
  } else if (curDir === SnakeDirection.Z_PLUS) {
    cp.x = tp.x;
    cp.z = tp.z - 1;
  } else if (curDir === SnakeDirection.Z_NEGATIVE) {
    cp.x = tp.x;
    cp.z = tp.z + 1;
  }
}
