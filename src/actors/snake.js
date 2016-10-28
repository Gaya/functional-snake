import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';
let prevTick = 0;

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

function calcPosition(pos, bounds) {
  if (pos >= bounds - 1) {
    return bounds - 1;
  } else if (pos < 0) {
    return 0;
  }

  return pos;
}

function updatePos(dir, currentPosition, gameWidth, gameHeight) {
  return {
    position: {
      x: calcPosition(currentPosition.x + dir.x, gameWidth),
      y: calcPosition(currentPosition.y + dir.y, gameHeight),
    },
  };
}

function snakePos(pos, scale) {
  return pos * scale;
}

export function update({ timestamp, state = {} }) {
  let nextState = { ...state };

  if (timestamp - (100 / (0.7 + (0.3 * state.snake.speed))) > prevTick) {
    prevTick = timestamp;

    // update the position
    nextState = {
      ...nextState,
      snake: {
        ...nextState.snake,
        ...updatePos(state.snake.dir, state.snake.position, state.game.width, state.game.height),
      },
    };
  }

  return {
    ...state,
    ...nextState,
  };
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
