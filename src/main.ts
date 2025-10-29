import "./style.css";

import * as THREE from "three";

import { createGround } from "./lib/create-ground";
import { createLights } from "./lib/create-lights";
import { createOrbits } from "./lib/create-orbits";
import { createFood } from "./lib/create-food";
import { createSnake } from "./lib/create-snake";
import { createListenKeyboardForDirections } from "./lib/listen-keyboard-for-directions";
import { createUI } from "./lib/create-ui";

const BOX_SIZE = 0.85;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app")!.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 14;
camera.position.z = 0;
camera.lookAt(0, 0, 0);

const helper = new THREE.GridHelper(13, 13);
scene.add(helper);

const { updateHeadPosition } = createUI(scene);
createGround(scene, 5, BOX_SIZE);
createLights(scene);
const { updateFood, updateFoodPosition } = createFood(scene, 2, 2);
const { updateSnake, updateDirection } = createSnake(
  scene,
  0,
  0,
  BOX_SIZE / 1.8,
  updateHeadPosition,
  updateFoodPosition
);
createOrbits(camera, renderer.domElement);
createListenKeyboardForDirections(updateDirection);


let lastTick = Date.now();
function animate() {
  const delta = Date.now() - lastTick;
  const speed = delta * 0.003;
  // console.log(speed);
  updateFood(lastTick);
  updateSnake(lastTick, speed);
  renderer.render(scene, camera);
  lastTick = Date.now();
}

renderer.setAnimationLoop(animate);
