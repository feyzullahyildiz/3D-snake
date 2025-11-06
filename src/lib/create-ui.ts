import * as THREE from "three";
import type { SnakeFIFOItem } from "../helper/types";
import { throttle } from "../helper/throttle";

export const createUI = (_scene: THREE.Scene) => {
  const parent = document.createElement("div");
  parent.style.position = "absolute";
  parent.style.top = "10px";
  parent.style.right = "10px";
  parent.style.color = "white";
  parent.style.zIndex = "1";
  parent.style.whiteSpace = "pre";
  parent.style.fontFamily = "monospace";
  parent.style.fontSize = "24px";
  parent.style.display = "flex";
  parent.style.flexDirection = "column";
  parent.style.alignItems = "flex-end";
  parent.style.gap = "8px";

  document.body.appendChild(parent);

  const speedDiv = document.createElement("div");
  const headPositionDiv = document.createElement("div");
  const headRelativePositionDiv = document.createElement("div");

  const headStackTable = document.createElement("table");
  const headStack = document.createElement("tbody");
  headStackTable.append(headStack);

  parent.appendChild(speedDiv);
  parent.appendChild(headPositionDiv);
  parent.appendChild(headRelativePositionDiv);
  parent.appendChild(headStack);

  return {
    updateHeadPosition: (x: number, _y: number, z: number) => {
      headPositionDiv.innerHTML = `X: ${x.toFixed(2)}\nZ: ${z.toFixed(2)}`;
    },
    updateRelativeHeadPosition: (x: number, _y: number, z: number) => {
      headRelativePositionDiv.innerHTML = `relative X: ${x.toFixed(2)}\nrelative Z: ${z.toFixed(2)}`;
    },
    updateSpeed: throttle(80, (speed: number) => {
      speedDiv.innerHTML = `Speed: ${speed.toFixed(5)}`;
    }),
    updateHeadStack: (stack: Array<SnakeFIFOItem>) => {
      //   headStack.childNodes.forEach((item) => item.remove());
      headStack.innerHTML = "";

      const xHead = document.createElement("th");
      xHead.innerHTML = "X";
      const zHead = document.createElement("th");
      zHead.innerHTML = "Z";
      const directionHead = document.createElement("th");
      directionHead.innerHTML = "DIR";

      xHead.style.padding = "8px";
      zHead.style.padding = "8px";
      directionHead.style.padding = "8px";

      const headRow = document.createElement("tr");

      headRow.append(xHead);
      headRow.append(zHead);
      headRow.append(directionHead);

      headStack.append(headRow);

      for (const item of stack) {
        const itemRow = document.createElement("tr");

        const x = document.createElement("td");
        const z = document.createElement("td");
        const dir = document.createElement("td");

        x.innerHTML = item.x.toFixed(2);
        z.innerHTML = item.z.toFixed(2);
        dir.innerHTML = item.nextDirection;

        itemRow.append(x);
        itemRow.append(z);
        itemRow.append(dir);

        x.style.padding = "8px";
        z.style.padding = "8px";
        dir.style.padding = "8px";

        headStack.append(itemRow);
      }
    },
  };
};
