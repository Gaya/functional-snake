import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from 'constants/directions';
import { SPACE_KEY, PAUSE_KEY } from 'constants/keys';

let keyState = {};
let currentlyPressed = [];

export function inputStateByKeyCode(keyCode) {
  return {
    up: keyCode === UP_KEY,
    down: keyCode === DOWN_KEY,
    left: keyCode === LEFT_KEY,
    right: keyCode === RIGHT_KEY,
    space: keyCode === SPACE_KEY,
    pause: keyCode === PAUSE_KEY,
    keyCode,
  };
}

export function inputState() {
  return {
    input: keyState,
  };
}

function lastInput(inputs) {
  return inputs[inputs.length - 1];
}

export function listenToInput() {
  keyState = inputStateByKeyCode({}, null);

  window.addEventListener('keydown', (e) => {
    currentlyPressed =
      currentlyPressed
        .filter(keyCode => keyCode !== e.keyCode)
        .concat(e.keyCode);

    keyState = inputStateByKeyCode(lastInput(currentlyPressed));
  });

  window.addEventListener('keyup', (e) => {
    currentlyPressed =
      currentlyPressed
        .filter(keyCode => keyCode !== e.keyCode);

    keyState = inputStateByKeyCode(lastInput(currentlyPressed));
  });
}
