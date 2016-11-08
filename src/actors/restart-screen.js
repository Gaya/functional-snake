export function draw({ state = {}, canvas = null }) {
  if (!state.snake || !state.snake.dead) {
    return;
  }

  const ctx = canvas.getContext();

  ctx.fillStyle = 'white';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  ctx.font = '48px monospace';
  ctx.fillText('You died', 20, 50);

  ctx.font = '14px monospace';
  ctx.fillText('press "space" to restart', 22, 100);
}
