import React from "react";

function Controls({ onLoadSample, onClear, onValidate, onSolve }) {
  return (
    <div className="controls">
      <button className="btn primary" onClick={onSolve}>
        Solve
      </button>

      <button className="btn" onClick={onLoadSample}>
        Sample
      </button>

      <button className="btn" onClick={onValidate}>
        Check
      </button>

      <button className="btn danger" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}

export default Controls;