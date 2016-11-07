import { GAME_WIDTH, GAME_SCALE } from 'constants/game';

export default function draw({ state = {}, canvas = null }) {
  if (!state.game.started) {
    return;
  }

  const ctx = canvas.getContext();

  ctx.fillStyle = 'white';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';

  ctx.font = '14px monospace';
  ctx.fillText((state.snake.tail.length - 1) * 10, (GAME_WIDTH * GAME_SCALE) - 3, 3);
}
