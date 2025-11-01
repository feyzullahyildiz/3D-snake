import { Mesh } from "three";
export type SnakeFIFOItem = {
  x: number;
  z: number;
  nextDirection: SnakeDirection;
};
export enum SnakeDirection {
  X_PLUS = "X_PLUS",
  X_NEGATIVE = "X_NEGATIVE",
  Z_PLUS = "Z_PLUS",
  Z_NEGATIVE = "Z_NEGATIVE",
}
export type SnakeBodyPart = {
  mesh: Mesh;
  direction: SnakeDirection;
  nextDirectionFIFOStack: Array<SnakeFIFOItem>;
};
