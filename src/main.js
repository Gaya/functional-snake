import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';

let state = {};
const canvas = createCanvas();

// get initial state after setup
state = setup({ state, canvas });

window.requestAnimationFrame((timestamp) => {
  // calculate new state
  state = update({ timestamp, state });

  // draw canvas from state
  draw({ state, canvas });
});
