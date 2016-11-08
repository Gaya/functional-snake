import { UP, DOWN, LEFT, RIGHT } from 'constants/directions';
import { isSamePosition } from 'core/is-same-position';
import { scaledPosition } from 'core/scaled-position';
import { snakeTouchesFood } from './food';

export const setup = {
  snake: {
    prevTick: 0,
    dead: false,
    position: {
      x: 1,
      y: 1,
    },
    tail: [{ x: 0, y: 1 }],
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

function collidesWithTail(position, tail) {
  return tail.filter(tailPosition => isSamePosition(position, tailPosition)).length > 0;
}

function nextDirectionState(state) {
  let nextState = {};

  // update direction
  if (state.input.up && !isSamePosition(state.snake.dir, DOWN)) {
    nextState = {
      dir: UP,
    };
  } else if (state.input.down && !isSamePosition(state.snake.dir, UP)) {
    nextState = {
      dir: DOWN,
    };
  } else if (state.input.left && !isSamePosition(state.snake.dir, RIGHT)) {
    nextState = {
      dir: LEFT,
    };
  } else if (state.input.right && !isSamePosition(state.snake.dir, LEFT)) {
    nextState = {
      dir: RIGHT,
    };
  }

  return nextState;
}

function snakeSpeed(snake) {
  return (0.9 + (0.05 * snake.tail.length));
}

function tickTime(snake) {
  return (100 / snakeSpeed(snake));
}

export function update({ timestamp, state = {} }) {
  if (!state.game.started) {
    return {};
  }

  let nextState = { ...state.snake };

  if (
    !state.game.paused &&
    !state.snake.dead &&
    timestamp - tickTime(state.snake) > state.snake.prevTick
  ) {
    nextState.prevTick = timestamp;

    // update direction
    nextState = {
      ...nextState,
      ...nextDirectionState(state),
    };

    // update the position
    nextState = {
      ...nextState,
      ...updatePos(state.snake.dir, state.snake.position),
    };

    // check if collides with walls or tail
    if (
      (nextState.position.x < 0 || nextState.position.x >= state.game.width) ||
      (nextState.position.y < 0 || nextState.position.y >= state.game.height) ||
      collidesWithTail(nextState.position, state.snake.tail)
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

  if (state.snake.dead && state.input.space) {
    return {
      snake: setup.snake,
    };
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
  if (!state.game.started) {
    return;
  }

  const ctx = canvas.getContext();

  ctx.fillStyle = state.snake.dead ? 'black' : 'white';
  createSnakePartDrawer(ctx, state.game.scale)(state.snake.position);
  state.snake.tail.forEach(createSnakePartDrawer(ctx, state.game.scale));
}
