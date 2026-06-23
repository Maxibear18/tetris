import { COLS, ROWS } from './render.js';
import { randomPiece } from './pieces.js';

const DROP_INTERVAL_MS = 800;

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function spawnPiece() {
  const piece = randomPiece();
  const col = Math.floor((COLS - piece.shape[0].length) / 2);
  return { piece, col, row: 0 };
}

export function canPlace(board, piece, col, row) {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue;

      const boardCol = col + c;
      const boardRow = row + r;

      if (boardCol < 0 || boardCol >= COLS || boardRow >= ROWS) {
        return false;
      }

      if (boardRow >= 0 && board[boardRow][boardCol]) {
        return false;
      }
    }
  }
  return true;
}

export function moveLeft(state) {
  const { piece, col, row } = state.current;
  if (canPlace(state.board, piece, col - 1, row)) {
    state.current.col--;
  }
}

export function moveRight(state) {
  const { piece, col, row } = state.current;
  if (canPlace(state.board, piece, col + 1, row)) {
    state.current.col++;
  }
}

export function softDrop(state) {
  const { piece, col, row } = state.current;
  if (canPlace(state.board, piece, col, row + 1)) {
    state.current.row++;
    state.dropCounter = 0;
    return;
  }
  lockCurrentAndSpawn(state);
}

export function hardDrop(state) {
  const { piece, col } = state.current;

  while (canPlace(state.board, piece, col, state.current.row + 1)) {
    state.current.row++;
  }

  state.dropCounter = 0;
  lockCurrentAndSpawn(state);
}

function rotateShape(shape) {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = shape[r][c];
    }
  }
  return rotated;
}

export function rotate(state) {
  const { piece, col, row } = state.current;
  const rotated = { ...piece, shape: rotateShape(piece.shape) };
  if (canPlace(state.board, rotated, col, row)) {
    state.current.piece = rotated;
  }
}

function lockPiece(board, piece, col, row) {
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((filled, c) => {
      if (!filled) return;
      const boardRow = row + r;
      const boardCol = col + c;
      if (boardRow >= 0) {
        board[boardRow][boardCol] = piece.color;
      }
    });
  });
}

function isRowFull(row) {
  return row.every((cell) => cell !== null);
}

function clearLines(state) {
  const before = state.board.length;
  state.board = state.board.filter((row) => !isRowFull(row));
  const cleared = before - state.board.length;

  while (state.board.length < ROWS) {
    state.board.unshift(Array(COLS).fill(null));
  }

  return cleared;
}

function lockCurrentAndSpawn(state) {
  const { piece, col, row } = state.current;
  lockPiece(state.board, piece, col, row);
  clearLines(state);
  state.current = spawnPiece();

  if (!canPlace(state.board, state.current.piece, state.current.col, state.current.row)) {
    state.gameOver = true;
    state.current = null;
  }
}

export function createState() {
  const board = createBoard();
  const current = spawnPiece();

  return {
    board,
    current,
    dropCounter: 0,
    gameOver: false,
  };
}

export function update(state, deltaMs) {
  if (state.gameOver || !state.current) return;

  state.dropCounter += deltaMs;
  if (state.dropCounter < DROP_INTERVAL_MS) return;
  state.dropCounter = 0;

  const { piece, col, row } = state.current;

  if (canPlace(state.board, piece, col, row + 1)) {
    state.current.row++;
    return;
  }

  lockCurrentAndSpawn(state);
}
