import React from "react";

function NumberPad({ onNumberSelect }) {
  return (
    <div className="number-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onNumberSelect(number)}
        >
          {number}
        </button>
      ))}

      <button type="button" className="erase-number" onClick={() => onNumberSelect(0)}>
        Erase
      </button>
    </div>
  );
}

export default NumberPad;