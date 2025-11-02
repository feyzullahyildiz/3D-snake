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

const BOX_SIZE = 0.85;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);

document.getElementById("app")!.appendChild(renderer.domElement);

const GROUND_SIZE = 9;
const helper = new THREE.GridHelper(GROUND_SIZE + 1, GROUND_SIZE + 1);
scene.add(helper);

const {updateGround } = createGround(scene, GROUND_SIZE, BOX_SIZE);
createLights(scene);
const { updateHeadPosition, updateHeadStack } = createUI(scene);
const { updateFood, updateFoodPosition } = createFood(scene, 2, 2);
const { updateSnake, updateDirection } = createSnake(
  scene,
  0,
  0,
  BOX_SIZE / 1,
  updateHeadPosition,
  updateHeadStack
);
createListenKeyboardForDirections(updateDirection);

const { updateSnakeCamera } = createSnakeCamera(scene, renderer);
const { updateOrbitCamera } = createOrbitCamera(scene, renderer);

let lastTick = Date.now();
function animate() {
  const delta = Date.now() - lastTick;
  const speed = delta * 0.004;
  // console.log(speed)

  updateFood(lastTick);
  const head = updateSnake(lastTick, speed);

  updateSnakeCamera(lastTick, speed, head);
  updateOrbitCamera(lastTick, speed, head);
  updateGround(lastTick, speed, head);

  lastTick = Date.now();
}

renderer.setAnimationLoop(animate);
