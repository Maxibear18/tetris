import { createState, update } from './app.js';
import { render } from './render.js';

const canvas = document.getElementById('game');
let state = createState();
let lastTime = 0;

function gameLoop(time) {
  if (!lastTime) lastTime = time;
  const deltaMs = time - lastTime;
  lastTime = time;

  update(state, deltaMs);
  render(canvas, state);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
