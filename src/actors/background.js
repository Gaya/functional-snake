export function update({ state = {} }) {
  return state;
}

export function draw({ state = { game: { width: 600, height: 600 } }, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, state.game.width, state.game.height);
}
