import React from "react";
import "./Block.css";
export function Block({ emoji = null, flipped = false }) {
  return (
    <div className="block">
      <div className={`block-content ${flipped && "block-flipped"}`}>
        <div className="block-front"></div>
        <div className="block-back">{emoji}</div>
      </div>
    </div>
  );
}
