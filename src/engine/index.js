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

function update({ timestamp = 0, state = {} }) {
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

function draw({ timestamp = 0, state = {}, canvas = null }) {
  [
    drawBg,
    drawStartScreen,
    drawSnake,
    drawFood,
    drawRestart,
    drawScore,
  ].forEach(f => f({ timestamp, state, canvas }));
}

function tick(timestamp, prevState, canvas) {
  // calculate new state
  const nextState = {
    ...prevState,
    ...update({ timestamp, state: prevState }),
  };

  // draw canvas from state
  draw({ timestamp, state: nextState, canvas });

  // execute again next animation frame
  window.requestAnimationFrame(
    nextTimestamp => tick(nextTimestamp, nextState, canvas)
  );
}

function setup(canvas) {
  listenToInput();

  // setup the initial state
  const initialState = {
    ...setupGame,
    ...setupSnake,
    ...setupFood({}, GAME_WIDTH, GAME_HEIGHT),
    ...setupStartScreen,
    input: inputState().input,
  };

  // first tick of program
  tick(0, initialState, canvas);
}

export default setup;
