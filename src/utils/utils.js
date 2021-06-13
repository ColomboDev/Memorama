import shuffle from "lodash.shuffle";
import { emojis } from "./emojis";

export function createMemo() {
  const emojisBlock = emojis();
  let blocks = [];
  while (blocks.length < 20) {
    let index = Math.floor(Math.random() * emojisBlock.length);
    let block = {
      emoji: emojisBlock.splice(index, 1)[0],
      flipped: false,
    };
    blocks.push(block);
    blocks.push({ ...block });
  }

  blocks = blocks.map((block, index) => {
    return { ...block, index };
  });
  return shuffle(blocks);
}

export function checkFinish(blocksMemo) {
  const Finish = blocksMemo.find((block) => !block.flipped);
  if (Finish) return false;
  else return true;
}

export function onCompleteTurn(setTurnPlayer, turnPlayer) {
  setTurnPlayer(turnPlayer === "jugador 1" ? "jugador 2" : "jugador 1");
}

export function handleClickBlock(
  block,
  blocksMemo,
  blockSelected,
  scorePlayerOne,
  scorePlayerTwo,
  turnPlayer,
  setBlocksMemo,
  setBlockSelected,
  setWinnerPlayer,
  setShowModal,
  setKeyCountDown,
  setTurnPlayer,
  setScorePlayerOne,
  setScorePlayerTwo,
  setAnimating
) {
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
    if (checkFinish(blocksMemoCopy)) {
      if (scorePlayerOne.success > scorePlayerTwo.success)
        setWinnerPlayer({
          player: "jugador 1",
          typeWinner: "Ganador",
        });
      else if (scorePlayerOne.success < scorePlayerTwo.success)
        setWinnerPlayer({
          player: "jugador 2",
          typeWinner: "Ganador",
        });
      else
        setWinnerPlayer({
          player: "Ambos han empatado 😎",
          typeWinner: "Empate",
        });
      setShowModal(true);
    } else {
      setKeyCountDown((prevKey) => prevKey + 1);
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
    }
  } else {
    setKeyCountDown((prevKey) => prevKey + 1);
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

export function handleRestart(
  setBlocksMemo,
  setBlockSelected,
  setScorePlayerTwo,
  setScorePlayerOne,
  setTurnPlayer,
  setKeyCountDown
) {
  setBlocksMemo(createMemo());
  setBlockSelected(null);
  setScorePlayerTwo({ success: 0, error: 0 });
  setScorePlayerOne({
    success: 0,
    error: 0,
  });
  setTurnPlayer("jugador 1");
  setKeyCountDown((prevKey) => prevKey + 1);
}
