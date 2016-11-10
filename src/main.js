import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';
import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';

const canvas = createCanvas(GAME_WIDTH * GAME_SCALE, GAME_HEIGHT * GAME_SCALE);

// get initial state after setup
const initialState = setup({});

// set focus to window
window.focus();

function injectStateToTick(state, cb) {
  return timestamp => cb(timestamp, state);
}

function tick(timestamp, state) {
  // calculate new state
  const newState = {
    ...state,
    ...update({ timestamp, state }),
  };

  // draw canvas from state
  draw({ timestamp, newState, canvas });

  // execute again next animation frame
  window.requestAnimationFrame(
    injectStateToTick(newState, tick)
  );
}

// run program
tick(0, initialState);
