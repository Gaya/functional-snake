import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';

let state = {};
const canvas = createCanvas(600, 600);

function setState(newState) {
  state = {
    ...state,
    ...newState,
  };
}

// get initial state after setup
setState(setup({ state, setState }));

function tick(timestamp) {
  // calculate new state
  setState(update({ timestamp, state }));

  // draw canvas from state
  draw({ state, canvas });

  window.requestAnimationFrame(tick);
}

tick();
