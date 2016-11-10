import createCanvas from 'canvas';
import setup from 'engine';
import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';

const canvas = createCanvas(GAME_WIDTH * GAME_SCALE, GAME_HEIGHT * GAME_SCALE);

// set focus to window
window.focus();

// run program
setup(canvas);
