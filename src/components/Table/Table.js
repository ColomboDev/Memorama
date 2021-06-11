import React from "react";
import "./Table.css";
import Block from "components/Block";

export function Table({ blocks = [], animating, handleClickBlock }) {
  return (
    <>
      <div className="table">
        {blocks.map((block, index) => {
          return (
            <Block
              key={index}
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
