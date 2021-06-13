import React from "react";
import "./Table.css";
import Block from "components/Block";

export function Table({ blocks = [], animating, handleClickBlock }) {
  return (
    <>
      <div data-testid="table" className="table">
        {blocks.map((block, index) => {
          return (
            <Block
              key={index}
              id={index}
              block={block}
              animating={animating}
              handleClickBlock={handleClickBlock}
            />
          );
        })}
      </div>
    </>
  );
}
