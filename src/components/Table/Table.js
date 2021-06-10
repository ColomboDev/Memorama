import React from "react";
import "./Table.css";
import Block from "components/Block";

export function Table({ blocks = [] }) {
  return (
    <div className="table">
      {blocks.map(({ emoji }, index) => {
        return <Block key={index} emoji={emoji} />;
      })}
    </div>
  );
}
