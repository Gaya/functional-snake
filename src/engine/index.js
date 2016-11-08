import { GAME_WIDTH, GAME_HEIGHT } from 'constants/game';

import { setup as setupGame, update as updateGame } from 'actors/game';
import { update as updateBg, draw as drawBg } from 'actors/background';
import { setup as setupStartScreen, update as updateStartScreen, draw as drawStartScreen }
  from 'actors/start-screen';
import { draw as drawRestart } from 'actors/restart-screen';
import drawScore from 'actors/score';
import { setup as setupSnake, update as updateSnake, draw as drawSnake } from 'actors/snake';
import { setup as setupFood, update as updateFood, draw as drawFood } from 'actors/food';

import { listenToInput, inputState } from './input';

export function setup({ state = {} }) {
  listenToInput();

  return {
    ...state,
    ...setupGame,
    ...setupSnake,
    ...setupFood(state, GAME_WIDTH, GAME_HEIGHT),
    ...setupStartScreen,
    input: inputState().input,
  };
}

export function update({ timestamp = 0, state = {} }) {
  const stateWithInput = {
    ...state,
    ...inputState({ timestamp, state }),
  };

  return [
    updateGame,
    updateBg,
    updateStartScreen,
    updateSnake,
    updateFood,
  ].map(
    f =>
      Object.assign({}, f({ timestamp, state: stateWithInput }))
  ).reduce(
    (a, b) =>
      Object.assign({}, a, b)
  );
}

export function draw({ timestamp = 0, state = {}, canvas = null }) {
  [
    drawBg,
    drawStartScreen,
    drawSnake,
    drawFood,
    drawRestart,
    drawScore,
  ].forEach(f => f({ timestamp, state, canvas }));
}
