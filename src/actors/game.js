import { GAME_WIDTH, GAME_HEIGHT, GAME_SCALE } from 'constants/game';

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
  if (state.game.started && state.input.pause) {
    return {
      game: {
        ...state.game,
        paused: !state.game.paused,
      },
    };
  }

  return {};
}
