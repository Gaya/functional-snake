import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';
import { update as updateBg, draw as drawBg } from 'actors/background';
import { setup as setupSnake, update as updateSnake, draw as drawSnake } from 'actors/snake';
import { setup as setupFood, update as updateFood, draw as drawFood } from 'actors/food';

import { listenToInput, inputState } from './input';

export function setup({ state = {} }) {
  listenToInput();

  return {
    ...state,
    ...setupSnake,
    ...setupFood(state, GAME_WIDTH, GAME_HEIGHT),
    input: inputState().input,
    game: {
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      scale: GAME_SCALE,
    },
  };
}

export function update({ timestamp = 0, state = {} }) {
  return [
    inputState,
    updateBg,
    updateSnake,
    updateFood,
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
    drawSnake,
    drawFood,
  ].forEach(f => f({ state, canvas }));
}
