
export const createListenKeyboardForDirections = (
  cb: (rigthtLeft: "right" | "left") => void
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
    }
  });
};
