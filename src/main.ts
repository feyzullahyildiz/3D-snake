import "./style.css";

import * as THREE from "three";

import { createGround } from "./lib/create-ground";
import { createLights } from "./lib/create-lights";
import { createFood } from "./lib/create-food";
import { createSnake } from "./lib/create-snake";
import { createListenKeyboardForDirections } from "./lib/listen-keyboard-for-directions";
import { createUI } from "./lib/create-ui";
import { createSnakeCamera } from "./lib/create-snake-camera";
import { createOrbitCamera } from "./lib/create-orbit-camera";
import { createGameOption } from "./helper/create-game-option";
import { createRelativePosition } from "./lib/create-relative-position";
import { createFoodCollisitionDedector } from "./lib/create-food-collision-detector";
import { getRandomRelativePosition } from "./helper/get-random-relative-position";

const PLAYGROUND_Y_LEVEL = 1.25;
const GAME_OPTION = createGameOption();

const BOX_SIZE = 0.85;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);

document.getElementById("app")!.appendChild(renderer.domElement);

const GROUND_SIZE = 21;
const helper = new THREE.GridHelper(GROUND_SIZE + 1, GROUND_SIZE + 1);
scene.add(helper);

const { updateDirectionalLight } = createLights(scene);

const { updateGround } = createGround(scene, GROUND_SIZE, BOX_SIZE);
const {
  updateHeadPosition,
  updateRelativeHeadPosition,
  updateHeadStack,
  updateSpeed,
} = createUI(scene);
const { updateFood, setFoodPosition, getRelativeFoodPosition } = createFood(
  scene,
  0,
  PLAYGROUND_Y_LEVEL,
  0,
  GROUND_SIZE
);
const { updateSnake, updateDirection } = createSnake(
  scene,
  1,
  PLAYGROUND_Y_LEVEL,
  1,
  BOX_SIZE / 1,
  updateHeadPosition,
  updateHeadStack
);
createListenKeyboardForDirections(updateDirection, GAME_OPTION);

const { updateSnakeCamera } = createSnakeCamera(scene, renderer);
const { updateOrbitCamera } = createOrbitCamera(scene, renderer, GAME_OPTION);

const { getRelativePosition } = createRelativePosition(GROUND_SIZE);
const { getIsOnFood } = createFoodCollisitionDedector();
const SPEED_FACTOR = 4;
// const SPEED_FACTOR = .4;
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();

  const speed = delta * SPEED_FACTOR; // delta saniye, hız faktörü örn. 4 birim/saniye

  updateSpeed(speed);

  const head = updateSnake(clock.elapsedTime, speed);
  const relativeHead = getRelativePosition(head.mesh.position);

  updateRelativeHeadPosition(relativeHead.x, relativeHead.y, relativeHead.z);

  updateFood(clock.elapsedTime, speed, head);
  updateSnakeCamera(clock.elapsedTime, speed, head);
  updateOrbitCamera(clock.elapsedTime, speed, head);
  updateGround(clock.elapsedTime, speed, head);
  updateDirectionalLight(clock.elapsedTime, speed, head);

  const relativeFoodPosition = getRelativeFoodPosition();
  // console.log(relativeFoodPosition)
  const res = getIsOnFood(relativeHead, relativeFoodPosition);
  if (res) {
    // console.log(res);
    const x = getRandomRelativePosition(GROUND_SIZE);
    const z = getRandomRelativePosition(GROUND_SIZE);
    setFoodPosition(x, z);
  }
}

renderer.setAnimationLoop(animate);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
