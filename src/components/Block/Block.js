import React from "react";
import "./Block.css";
export function Block({ block, animating, handleClickBlock }) {
  return (
    <div
      className="block"
      onClick={() => !block.flipped && !animating && handleClickBlock(block)}
    >
      <div className={`block-content ${block.flipped && "block-flipped"}`}>
        <div className="block-front"></div>
        <div className="block-back">{block.emoji}</div>
      </div>
    </div>
  );
}
