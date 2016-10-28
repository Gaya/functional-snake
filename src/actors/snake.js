import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';
import { isSame } from 'core/is-same';
import { scaledPosition } from 'core/scaled-position';

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

export function update({ timestamp, state = {} }) {
  let nextState = { ...state.snake };

  if (timestamp - (100 / (0.7 + (0.3 * state.snake.speed))) > prevTick) {
    prevTick = timestamp;

    // update direction
    if (state.input.up && !isSame(state.snake.dir, DOWN)) {
      nextState = {
        ...nextState,
        dir: UP,
      };
    } else if (state.input.down && !isSame(state.snake.dir, UP)) {
      nextState = {
        ...nextState,
        dir: DOWN,
      };
    } else if (state.input.left && !isSame(state.snake.dir, RIGHT)) {
      nextState = {
        ...nextState,
        dir: LEFT,
      };
    } else if (state.input.right && !isSame(state.snake.dir, LEFT)) {
      nextState = {
        ...nextState,
        dir: RIGHT,
      };
    }

    // update the position
    nextState = {
      ...nextState,
      ...updatePos(state.snake.dir, state.snake.position, state.game.width, state.game.height),
    };
  }

  return {
    snake: {
      ...nextState,
    },
  };
}

export function draw({ state = setup, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = 'white';
  ctx.fillRect(
    scaledPosition(state.snake.position.x, state.game.scale),
    scaledPosition(state.snake.position.y, state.game.scale),
    state.game.scale,
    state.game.scale
  );
}
