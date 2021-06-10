import React, { useEffect, useState } from "react";
import { createMemo } from "utils/utils";
import Header from "components/Header";
import Table from "components/Table";
import "./App.css";

function App() {
  const [blocksMemo, setBlocksMemo] = useState([]);
  const [blockSelected, setBlockSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [scorePlayerOne, setScorePlayerOne] = useState({
    success: 0,
    error: 0,
  });
  const [scorePlayerTwo, setScorePlayerTwo] = useState({
    success: 0,
    error: 0,
  });
  const [turnPlayer, setTurnPlayer] = useState("jugador 1");
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
      setScorePlayerOne(
        turnPlayer === "jugador 1"
          ? { ...scorePlayerOne, success: scorePlayerOne.success + 1 }
          : scorePlayerOne
      );
      setScorePlayerTwo(
        turnPlayer === "jugador 2"
          ? { ...scorePlayerTwo, success: scorePlayerTwo.success + 1 }
          : scorePlayerTwo
      );
    } else {
      setTurnPlayer(turnPlayer === "jugador 1" ? "jugador 2" : "jugador 1");
      setScorePlayerOne(
        turnPlayer === "jugador 1"
          ? { ...scorePlayerOne, error: scorePlayerOne.error + 1 }
          : scorePlayerOne
      );
      setScorePlayerTwo(
        turnPlayer === "jugador 2"
          ? { ...scorePlayerTwo, error: scorePlayerTwo.error + 1 }
          : scorePlayerTwo
      );
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
      <Header
        turnPlayer={turnPlayer}
        scorePlayerOne={scorePlayerOne}
        scorePlayerTwo={scorePlayerTwo}
      />
      <Table
        blocks={blocksMemo}
        handleClickBlock={handleClickBlock}
        animating={animating}
      />
    </div>
  );
}

export default App;
