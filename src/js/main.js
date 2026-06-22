import { render, drawPiece } from './render.js';
import { PIECES } from './pieces.js';

const canvas = document.getElementById('game');
render(canvas);

const ctx = canvas.getContext('2d');
drawPiece(ctx, PIECES.T, 3, 0);
