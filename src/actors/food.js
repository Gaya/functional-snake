import { scaledPosition } from 'core/scaled-position';
import { setup as snakeSetup } from './snake';

function positionOnSnake(snake, x, y) {
  if (!x || !y) {
    return true;
  }

  return (snake.position.x === x && snake.position.y === y);
}

function randomPositionFood(snake = snakeSetup.snake, gameWidth, gameHeight) {
  let x = null;
  let y = null;

  do {
    x = Math.floor(Math.random() * gameWidth);
    y = Math.floor(Math.random() * gameHeight);
  } while (positionOnSnake(snake, x, y));

  return { x, y };
}

export function setup(currentState, width, height) {
  return {
    food: randomPositionFood(currentState.snake, width, height),
  };
}

export function update({ state = {} }) {
  return state.food;
}

export function draw({ state = setup, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = 'red';
  ctx.fillRect(
    scaledPosition(state.food.x, state.game.scale),
    scaledPosition(state.food.y, state.game.scale),
    state.game.scale,
    state.game.scale
  );
}
