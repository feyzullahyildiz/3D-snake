import {Mesh} from "three";

export enum SnakeDirection {
  X_PLUS = "X_PLUS",
  X_NEGATIVE = "X_NEGATIVE",
  Z_PLUS = "Z_PLUS",
  Z_NEGATIVE = "Z_NEGATIVE",
}
export type SnakeBodyPart = {
  // x: number
  // z: number
  mesh: Mesh;
  direction: SnakeDirection;
};