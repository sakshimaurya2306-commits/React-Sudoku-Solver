import React, { useMemo, useState } from "react";
import Controls from "./components/Controls.jsx";
import NumberPad from "./components/NumberPad.jsx";
import SudokuGrid from "./components/SudokuGrid.jsx";
import { emptyGrid, samplePuzzle } from "./data/samplePuzzle.js";
import { getConflicts, isBoardValid, solveSudoku } from "./utils/sudokuSolver.js";

const cloneGrid = (grid) => grid.map((row) => [...row]);

function getFixedCells(grid) {
  const fixed = new Set();

  grid.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value !== 0) {
        fixed.add(`${rowIndex}-${colIndex}`);
      }
    });
  });

  return fixed;
}

function App() {
  const [grid, setGrid] = useState(() => cloneGrid(emptyGrid));
  const [fixedCells, setFixedCells] = useState(new Set());
  const [selectedCell, setSelectedCell] = useState(null);
  const [message, setMessage] = useState("Enter numbers or load the sample puzzle.");
  const [status, setStatus] = useState("idle");

  const conflicts = useMemo(() => getConflicts(grid), [grid]);

  const filledCount = useMemo(
    () => grid.flat().filter((value) => value !== 0).length,
    [grid]
  );

  const loadSample = () => {
    const puzzle = cloneGrid(samplePuzzle);
    setGrid(puzzle);
    setFixedCells(getFixedCells(puzzle));
    setSelectedCell(null);
    setStatus("idle");
    setMessage("Sample puzzle loaded. Select a cell or press Solve.");
  };

  const clearGrid = () => {
    setGrid(cloneGrid(emptyGrid));
    setFixedCells(new Set());
    setSelectedCell(null);
    setStatus("idle");
    setMessage("Grid cleared. Enter your own Sudoku puzzle.");
  };

  const updateCell = (rowIndex, colIndex, value) => {
    if (fixedCells.has(`${rowIndex}-${colIndex}`)) {
      setMessage("This is a fixed sample number.");
      return;
    }

    const nextGrid = cloneGrid(grid);
    nextGrid[rowIndex][colIndex] = value;
    setGrid(nextGrid);
    setStatus("idle");
    setMessage("Keep going, then press Check or Solve.");
  };

  const handleNumberSelect = (number) => {
    if (!selectedCell) {
      setMessage("Select an empty cell first.");
      return;
    }

    updateCell(selectedCell.row, selectedCell.col, number);
  };

  const validateGrid = () => {
    if (isBoardValid(grid)) {
      setStatus("success");
      setMessage("This puzzle is valid so far.");
    } else {
      setStatus("error");
      setMessage("There is a repeated number in a row, column, or 3x3 box.");
    }
  };

  const solveGrid = () => {
    if (!isBoardValid(grid)) {
      setStatus("error");
      setMessage("Fix repeated numbers before solving.");
      return;
    }

    const solvedGrid = cloneGrid(grid);

    if (solveSudoku(solvedGrid)) {
      setGrid(solvedGrid);
      setStatus("success");
      setMessage("Solved successfully using backtracking.");
    } else {
      setStatus("error");
      setMessage("No valid solution found.");
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="content-panel">
          <h1>Sudoku Solver</h1>

          <p className="intro">
            Fill the grid, check your entries, and complete the puzzle in one click.
          </p>

          <div className="stats-grid">
            <div>
              <span>{filledCount}/81</span>
              <p>filled cells</p>
            </div>
            <div>
              <span>{81 - filledCount}</span>
              <p>empty cells</p>
            </div>
            <div>
              <span>{conflicts.size}</span>
              <p>conflicts</p>
            </div>
          </div>

          <Controls
            onLoadSample={loadSample}
            onClear={clearGrid}
            onValidate={validateGrid}
            onSolve={solveGrid}
          />

          <NumberPad onNumberSelect={handleNumberSelect} />

          <div className={`message ${status}`}>{message}</div>
        </div>

        <div className="board-panel">
          <SudokuGrid
            grid={grid}
            fixedCells={fixedCells}
            selectedCell={selectedCell}
            conflicts={conflicts}
            onSelectCell={setSelectedCell}
            onCellChange={updateCell}
          />
        </div>
      </section>
    </main>
  );
}

export default App;