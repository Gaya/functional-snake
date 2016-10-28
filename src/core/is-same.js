export function isSame(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default isSame;
