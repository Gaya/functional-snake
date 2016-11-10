import createCanvas from 'canvas';
import { setup, update, draw } from 'engine';
import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';

const canvas = createCanvas(GAME_WIDTH * GAME_SCALE, GAME_HEIGHT * GAME_SCALE);

// get initial state after setup
const initialState = setup({});

// set focus to window
window.focus();

function tick(timestamp, prevState) {
  // calculate new state
  const nextState = {
    ...prevState,
    ...update({ timestamp, state: prevState }),
  };

  // draw canvas from state
  draw({ timestamp, state: nextState, canvas });

  // execute again next animation frame
  window.requestAnimationFrame(
    nextTimestamp => tick(nextTimestamp, nextState)
  );
}

// run program
tick(0, initialState);
