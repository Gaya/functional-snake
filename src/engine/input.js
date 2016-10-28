import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from 'constants/directions';

function inputStateByKeyCode(keyCode) {
  return {
    up: keyCode === UP_KEY,
    down: keyCode === DOWN_KEY,
    left: keyCode === LEFT_KEY,
    right: keyCode === RIGHT_KEY,
    keyCode,
  };
}

export default function listenToInput(setState = () => {}) {
  setState({
    input: inputStateByKeyCode(null),
  });

  window.addEventListener('keydown', (e) => {
    setState({
      input: inputStateByKeyCode(e.keyCode),
    });
  });

  window.addEventListener('keyup', (e) => {
    setState({
      input: inputStateByKeyCode(null),
    });
  });
}
