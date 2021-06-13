import React from "react";
import "./Button.css";

export function Button({ text, handleClick, id }) {
  return (
    <button
      data-testid={`button_${id}`}
      id={`button_${id}`}
      onClick={() => handleClick()}
      className="button"
    >
      <p data-testid={`button_${id}_text`}>{text}</p>
    </button>
  );
}
