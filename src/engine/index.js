import { update as updateBg, draw as drawBg } from 'actors/background';

export function setup({ state = {} }) {
  return {
    ...state,
    game: {
      width: 600,
      height: 600,
    },
  };
}

export function update({ timestamp = 0, state = {} }) {
  return [
    updateBg,
  ].map(
    f =>
      Object.assign({}, f({ timestamp, state }))
  ).reduce(
    (a, b) =>
      Object.assign({}, a, b)
  );
}

export function draw({ state = {}, canvas = null }) {
  [
    drawBg,
  ].forEach(f => f({ state, canvas }));
}
