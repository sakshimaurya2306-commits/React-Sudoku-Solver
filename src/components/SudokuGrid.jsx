import React from "react";
import SudokuCell from "./SudokuCell.jsx";

function isRelated(selectedCell, rowIndex, colIndex) {
  if (!selectedCell) return false;

  const sameRow = selectedCell.row === rowIndex;
  const sameCol = selectedCell.col === colIndex;
  const sameBox =
    Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
    Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3);

  return sameRow || sameCol || sameBox;
}

function SudokuGrid({
  grid,
  fixedCells,
  selectedCell,
  conflicts,
  onSelectCell,
  onCellChange,
}) {
  return (
    <div className="sudoku-grid">
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const key = `${rowIndex}-${colIndex}`;
          const selected =
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

          return (
            <SudokuCell
              key={key}
              value={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              fixed={fixedCells.has(key)}
              selected={selected}
              related={isRelated(selectedCell, rowIndex, colIndex)}
              conflict={conflicts.has(key)}
              onSelectCell={onSelectCell}
              onCellChange={onCellChange}
            />
          );
        })
      )}
    </div>
  );
}

export default SudokuGrid;