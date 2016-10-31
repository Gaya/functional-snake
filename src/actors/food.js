import { scaledPosition } from 'core/scaled-position';
import { setup as snakeSetup } from './snake';

function positionOnSnake(snake, x, y) {
  if (!x || !y) {
    return true;
  }

  return (snake.position.x === x && snake.position.y === y) ||
    snake.tail
      .filter(tailPosition => tailPosition.x === x && tailPosition.y === y)
      .length > 0;
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

export function snakeTouchesFood(snake, food) {
  return snake.position.x === food.x && snake.position.y === food.y;
}

export function setup(currentState, width, height) {
  return {
    food: randomPositionFood(currentState.snake, width, height),
  };
}

export function update({ state = {} }) {
  if (!state.game.started) {
    return;
  }

  let newState = { ...state.food };

  if (snakeTouchesFood(state.snake, state.food)) {
    newState = randomPositionFood(state.snake, state.game.width, state.game.height);
  }

  return { food: newState };
}

export function draw({ state = setup, canvas = null }) {
  if (!state.game.started) {
    return;
  }

  const ctx = canvas.getContext();

  ctx.fillStyle = 'red';
  ctx.fillRect(
    scaledPosition(state.food.x, state.game.scale),
    scaledPosition(state.food.y, state.game.scale),
    state.game.scale,
    state.game.scale
  );
}
