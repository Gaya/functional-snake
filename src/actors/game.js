import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';
import { setup as snakeSetup } from './snake';

export const setup = {
  game: {
    started: false,
    paused: false,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scale: GAME_SCALE,
  },
};

export function update({ state }) {
  // start game on 'space'
  if (!state.game.started && state.input.space) {
    return {
      game: {
        ...state.game,
        started: true,
      },
    };
  }

  // pause game on 'p'
  if (state.game.started && state.input.pause) {
    return {
      game: {
        ...state.game,
        paused: !state.game.paused,
      },
    };
  }

  // reset game on dead and 'space'
  if (state.snake.dead && state.input.space) {
    return {
      ...snakeSetup,
    };
  }

  return {};
}
