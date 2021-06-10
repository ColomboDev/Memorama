import React, { useEffect, useState } from "react";
import { createMemo } from "utils/utils";
import Header from "components/Header";
import Table from "components/Table";
import "./App.css";

function App() {
  const [blocksMemo, setBlocksMemo] = useState([]);
  const [blockSelected, setBlockSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    setBlocksMemo(createMemo());
  }, []);

  function handleClickBlock(block) {
    let flipperBlock = { ...block, flipped: true };
    let blocksMemoCopy = blocksMemo;
    const index = blocksMemoCopy.findIndex(
      (blockCopy) => blockCopy.index === block.index
    );
    blocksMemoCopy[index] = flipperBlock;

    setBlocksMemo(blocksMemoCopy);

    if (blockSelected === null) {
      setBlockSelected(block);
    } else if (blockSelected.emoji === block.emoji) {
      setBlockSelected(null);
    } else {
      setAnimating(true);
      const indexSelected = blocksMemoCopy.findIndex(
        (blockCopy) => blockCopy.index === blockSelected.index
      );
      setTimeout(() => {
        blocksMemoCopy[index] = block;
        blocksMemoCopy[indexSelected] = blockSelected;
        setBlocksMemo(blocksMemoCopy);
        setBlockSelected(null);
        setAnimating(false);
      }, 1000);
    }
  }

  return (
    <div data-testid="app" className="App">
      <Header />
      <Table
        blocks={blocksMemo}
        handleClickBlock={handleClickBlock}
        animating={animating}
      />
    </div>
  );
}

export default App;
