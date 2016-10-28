import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';
import { isSame } from 'core/is-same';
import { scaledPosition } from 'core/scaled-position';
import { snakeTouchesFood } from './food';

let prevTick = 0;

export const setup = {
  snake: {
    position: {
      x: 1,
      y: 1,
    },
    tail: [],
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

    // update tail


    // grow a tail
    if (snakeTouchesFood(nextState, state.food)) {
      nextState = {
        ...nextState,
        tail: state.snake.tail.concat(state.snake.position),
      };
    }
  }

  return {
    snake: {
      ...nextState,
    },
  };
}

function createSnakePartDrawer(ctx, scale) {
  return (position) => {
    ctx.fillRect(
      scaledPosition(position.x, scale),
      scaledPosition(position.y, scale),
      scale,
      scale
    );
  };
}

export function draw({ state = setup, canvas = null }) {
  const ctx = canvas.getContext();

  ctx.fillStyle = 'white';
  createSnakePartDrawer(ctx, state.game.scale)(state.snake.position);
  state.snake.tail.forEach(createSnakePartDrawer(ctx, state.game.scale));
}
