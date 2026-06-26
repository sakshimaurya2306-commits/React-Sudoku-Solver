import React from "react";

function SudokuCell({
  value,
  rowIndex,
  colIndex,
  fixed,
  selected,
  related,
  conflict,
  onSelectCell,
  onCellChange,
}) {
  const className = [
    "sudoku-cell",
    fixed ? "fixed" : "",
    selected ? "selected" : "",
    related ? "related" : "",
    conflict ? "conflict" : "",
  ].join(" ");

  const handleChange = (event) => {
    if (fixed) return;

    const inputValue = event.target.value;
    if (/^[1-9]?$/.test(inputValue)) {
      onCellChange(rowIndex, colIndex, inputValue === "" ? 0 : Number(inputValue));
    }
  };

  return (
    <input
      className={className}
      type="text"
      inputMode="numeric"
      maxLength="1"
      value={value === 0 ? "" : value}
      readOnly={fixed}
      onClick={() => onSelectCell({ row: rowIndex, col: colIndex })}
      onChange={handleChange}
    />
  );
}

export default SudokuCell;