export const getRandomRelativePosition = (groundSize: number) => {
  const ref = (groundSize - 1) / 2;
  const value = Math.trunc(Math.random() * groundSize) % groundSize;
  return value - ref;
};
