const GRID_SIZE = 9;
const BOX_SIZE = 3;

export function isSafe(board, row, column, number) {
  for (let index = 0; index < GRID_SIZE; index++) {
    if (board[row][index] === number || board[index][column] === number) {
      return false;
    }
  }

  const boxRowStart = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxColumnStart = Math.floor(column / BOX_SIZE) * BOX_SIZE;

  for (let boxRow = 0; boxRow < BOX_SIZE; boxRow++) {
    for (let boxColumn = 0; boxColumn < BOX_SIZE; boxColumn++) {
      if (board[boxRowStart + boxRow][boxColumnStart + boxColumn] === number) {
        return false;
      }
    }
  }

  return true;
}

export function isBoardValid(board) {
  const copy = board.map((row) => [...row]);

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      const number = copy[row][column];

      if (number === 0) continue;

      copy[row][column] = 0;
      const valid = isSafe(copy, row, column, number);
      copy[row][column] = number;

      if (!valid) return false;
    }
  }

  return true;
}

export function getConflicts(board) {
  const conflicts = new Set();

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      const number = board[row][column];

      if (number === 0) continue;

      const copy = board.map((item) => [...item]);
      copy[row][column] = 0;

      if (!isSafe(copy, row, column, number)) {
        conflicts.add(`${row}-${column}`);
      }
    }
  }

  return conflicts;
}

export function solveSudoku(board) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      if (board[row][column] !== 0) continue;

      for (let number = 1; number <= GRID_SIZE; number++) {
        if (isSafe(board, row, column, number)) {
          board[row][column] = number;

          if (solveSudoku(board)) return true;

          board[row][column] = 0;
        }
      }

      return false;
    }
  }

  return true;
}