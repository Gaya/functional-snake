import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';

export const setup = {
  snake: {
    position: {
      x: 1,
      y: 1,
    },
    dir: RIGHT,
    speed: 1,
  },
};

function snakePos(pos, scale) {
  return pos * scale;
}

export function update({ state = {} }) {
  return state;
}

export function draw({ state = setup, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = 'white';
  ctx.fillRect(
    snakePos(state.snake.position.x, state.game.scale),
    snakePos(state.snake.position.y, state.game.scale),
    state.game.scale,
    state.game.scale
  );
}
