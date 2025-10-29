import * as THREE from "three";

export const createUI = (scene: THREE.Scene) => {
    const parent = document.createElement("div");
    parent.style.position = "absolute";
    parent.style.top = "10px";
    parent.style.right = "10px";
    parent.style.color = "white";
    parent.style.zIndex = "1";
    parent.style.whiteSpace = "pre";
    parent.style.fontFamily = "monospace";
    parent.style.fontSize = "24px";

    document.body.appendChild(parent);


    return {
        updateHeadPosition: (x: number, y: number, z: number) => {
            parent.innerHTML = `X: ${x.toFixed(2)}\nZ: ${z.toFixed(2)}`;
        }
    }
}