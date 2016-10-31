import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';
import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';

let state = {};
const canvas = createCanvas(GAME_WIDTH * GAME_SCALE, GAME_HEIGHT * GAME_SCALE);

function setState(newState) {
  state = newState;
}

// set focus to window
window.focus();

// get initial state after setup
setState(setup({ state }));

function tick(timestamp) {
  // calculate new state
  setState({
    ...state,
    ...update({ timestamp, state }),
  });

  // draw canvas from state
  draw({ state, canvas });

  window.requestAnimationFrame(tick);
}

tick();
