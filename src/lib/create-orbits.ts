import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";




export const createOrbits = (camera: THREE.Camera, domElement: HTMLCanvasElement) => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
}
