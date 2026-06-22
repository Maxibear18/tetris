// Each piece is a small grid of 0s and 1s.
// 1 = filled cell, 0 = empty. Read it like the shape looks on screen.
//
// Example — T piece:
//   . X .
//   X X X
//   . . .
//
// YOUR TURN: add I, O, S, Z, J, and L using the same { shape, color } format.

export const PIECES = {
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a855f7',
  },

  I: {
    shape: [
    [0, 0, 0, 0],
    [1,1,1,1],
    [0, 0, 0, 0],
    ],
  color: '#3b82f6',
  },

  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#f59e0b',
  },

  S: {
    shape: [
      [0,1,1],
      [1,1,0]
    ],
    color: '#22c55e',
  },

  Z: {
    shape: [
      [1,1,0],
      [0,1,1],
    ],
    color: '#ef4444',
  },
  J: {
    shape: [
      [1,0,0],
      [1,1,1],
    ],
    color: '#8b5cf6',
  },
  L: {
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    color: '#f97316',
  },
};

const PIECE_NAMES = Object.keys(PIECES);

export function randomPiece() {
  const name = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)];
  return PIECES[name];
}
