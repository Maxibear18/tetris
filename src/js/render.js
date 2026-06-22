export const COLS = 10;
export const ROWS = 20;
export const CELL = 30;

const COLORS = {
  background: '#1a1a2e',
  cell: '#16213e',
  cellAlt: '#1f2f4d',
};

export function drawGrid(ctx) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * CELL;
      const y = r * CELL;
      ctx.fillStyle = (r + c) % 2 === 0 ? COLORS.cell : COLORS.cellAlt;
      ctx.fillRect(x, y, CELL - 1, CELL - 1);
    }
  }
}

// Draw one piece. (col, row) is the top-left corner of the shape grid
// mapped onto the board — same coordinate system as the grid loops above.
export function drawPiece(ctx, piece, col, row) {
  piece.shape.forEach((shapeRow, r) => {
    shapeRow.forEach((filled, c) => {
      if (!filled) return;
      const x = (col + c) * CELL;
      const y = (row + r) * CELL;
      ctx.fillStyle = piece.color;
      ctx.fillRect(x, y, CELL - 1, CELL - 1);
    });
  });
}

function drawBoard(ctx, board) {
  board.forEach((row, r) => {
    row.forEach((color, c) => {
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
    });
  });
}

export function render(canvas, state) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx);
  drawBoard(ctx, state.board);

  if (state.current) {
    const { piece, col, row } = state.current;
    drawPiece(ctx, piece, col, row);
  }
}
