import React from "react";
import "./Button.css";

export function Button({ text, handleClick }) {
  return (
    <button onClick={() => handleClick()} className="button">
      <p>{text}</p>
    </button>
  );
}
