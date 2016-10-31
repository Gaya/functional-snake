import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';
import { isSame } from 'core/is-same';
import { scaledPosition } from 'core/scaled-position';
import { snakeTouchesFood } from './food';

let prevTick = 0;

export const setup = {
  snake: {
    dead: false,
    position: {
      x: 1,
      y: 1,
    },
    tail: [],
    dir: RIGHT,
  },
};

function updatePos(dir, currentPosition) {
  return {
    position: {
      x: currentPosition.x + dir.x,
      y: currentPosition.y + dir.y,
    },
  };
}

function colidesWithTail(position, tail) {
  return tail.filter(tailPosition => isSame(position, tailPosition)).length > 0;
}

function nextDirectionState(state) {
  let nextState = { ...state.snake };

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

  return nextState;
}

export function update({ timestamp, state = {} }) {
  let nextState = { ...state.snake };

  if (
    !state.game.paused &&
    !state.snake.dead &&
    timestamp - (100 / (0.9 + (0.05 * state.snake.tail.length))) > prevTick
  ) {
    prevTick = timestamp;

    // update direction
    nextState = nextDirectionState(state);

    // update the position
    nextState = {
      ...nextState,
      ...updatePos(state.snake.dir, state.snake.position),
    };

    // check if colides with walls or tail
    if (
      (nextState.position.x < 0 || nextState.position.x >= state.game.width) ||
      (nextState.position.y < 0 || nextState.position.y >= state.game.height) ||
      colidesWithTail(nextState.position, state.snake.tail)
    ) {
      nextState = {
        ...state.snake,
        dead: true,
      };
    }

    if (!nextState.dead) {
      // grow a tail
      if (snakeTouchesFood(nextState, state.food)) {
        nextState = {
          ...nextState,
          tail: state.snake.tail.concat(state.snake.position),
        };
      } else if (state.snake.tail.length > 0) {
        nextState = {
          ...nextState,
          tail: state.snake.tail
            .slice(1, state.snake.tail.length)
            .concat(state.snake.position),
        };
      }
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
