export function update() {
  return {};
}

export function draw({ state = { game: { width: 60, height: 60 } }, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = state.snake.dead ? 'red' : 'black';
  ctx.fillRect(0, 0, state.game.width * state.game.scale, state.game.height * state.game.scale);
}
