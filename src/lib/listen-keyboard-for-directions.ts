import type { GameOption } from "../helper/types";

export const createListenKeyboardForDirections = (
  cb: (rigthtLeft: "right" | "left") => void,
  gameOption: GameOption
) => {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      // case "ArrowUp":
      // case "w":
      // case "W":
      //   // cb(new THREE.Vector2(0, -1));
      //   break;
      // case "ArrowDown":
      // case "s":
      // case "S":
      //   // cb(new THREE.Vector2(0, 1));
      //   break;
      case "ArrowRight":
      case "d":
      case "D":
        cb("right");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        cb("left");
        break;
      case "r":
      case "R":
        window.location.reload();
        break;
      case "z":
      case "Z":
        gameOption.orbit_follow_snake = !gameOption.orbit_follow_snake;
        // cb(new THREE.Vector2(0, -1));
        break;
    }
  });
};
