const colours = ['#FF4E50', '#FC913A', '#F9D423', '#EDE574', '#E1F5C4'];

export const setup = {
  startScreen: {
    prevCheck: 0,
    colour: colours[0],
  },
};

export function update({ timestamp, state = {} }) {
  if (timestamp - state.startScreen.prevCheck < 100) {
    return {};
  }

  return {
    startScreen: {
      prevCheck: timestamp,
      colour: colours[Math.floor((Math.random() * timestamp)) % colours.length],
    },
  };
}

export function draw({ state = setup, canvas = null }) {
  if (state.game.started) {
    return;
  }

  const ctx = canvas.getContext();

  ctx.fillStyle = state.startScreen.colour;
  ctx.textBaseline = 'top';

  ctx.font = '48px monospace';
  ctx.fillText('Snake', 50, 50);

  ctx.font = '14px monospace';
  ctx.fillText('press "space" to play', 52, 100);
  ctx.fillText('use arrow keys to move', 52, 130);
  ctx.fillText('press "p" to pause game', 52, 160);
}
