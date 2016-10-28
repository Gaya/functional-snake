import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from 'constants/directions';

let state = {};

export function inputStateByKeyCode(currentState, keyCode, off = false) {
  return {
    up: keyCode === UP_KEY && (!currentState.up || off),
    down: keyCode === DOWN_KEY && (!currentState.down || off),
    left: keyCode === LEFT_KEY && (!currentState.left || off),
    right: keyCode === RIGHT_KEY && (!currentState.right || off),
    keyCode,
  };
}

export function inputState() {
  return { input: state };
}

export function listenToInput() {
  state = inputStateByKeyCode({}, null);

  window.addEventListener('keydown', (e) => {
    state = {
      ...state,
      ...inputStateByKeyCode(state, e.keyCode),
    };
  });

  window.addEventListener('keyup', (e) => {
    state = {
      ...state,
      ...inputStateByKeyCode(state, e.keyCode),
    };
  });
}
