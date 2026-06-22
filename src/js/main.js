import { createState, update, moveLeft, moveRight, softDrop, rotate } from './app.js';
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

window.addEventListener('keydown', (event) => {
  if (state.gameOver || !state.current) return;

  switch (event.code) {
    case 'ArrowLeft':
      event.preventDefault();
      moveLeft(state);
      break;
    case 'ArrowRight':
      event.preventDefault();
      moveRight(state);
      break;
    case 'ArrowDown':
      event.preventDefault();
      softDrop(state);
      break;
    case 'Space':
      event.preventDefault();
      rotate(state);
      break;
  }
});

requestAnimationFrame(gameLoop);
