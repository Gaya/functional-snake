import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';

let state = {};
const canvas = createCanvas();

// get initial state after setup
state = setup({ state });

function tick(timestamp) {
  // calculate new state
  state = update({ timestamp, state });

  // draw canvas from state
  draw({ state, canvas });
}

tick();
window.requestAnimationFrame(tick);
