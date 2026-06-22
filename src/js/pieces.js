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
};
