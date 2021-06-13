import React from "react";
import "./Block.css";
export function Block({ id, block, animating, handleClickBlock }) {
  return (
    <div
      data-testid={id ? `block_${id}` : "block"}
      className="block"
      onClick={() => !block.flipped && !animating && handleClickBlock(block)}
    >
      <div
        data-testid="block-content"
        className={`block-content ${block.flipped && "block-flipped"}`}
      >
        <div className="block-front"></div>
        <div className="block-back">{block.emoji}</div>
      </div>
    </div>
  );
}
