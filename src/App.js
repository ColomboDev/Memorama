import React, { useEffect, useState } from "react";
import { createMemo, checkFinish } from "utils/utils";
import Header from "components/Header";
import Table from "components/Table";
import Modal from "components/Modal";
import Button from "components/Button";
import "./App.css";

export function AppFunction() {
  function onCompleteTurn(setTurnPlayer, turnPlayer) {
    setTurnPlayer(turnPlayer === "jugador 1" ? "jugador 2" : "jugador 1");
  }
  return {
    onCompleteTurn,
  };
}

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
  const [keyCountDown, setKeyCountDown] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [winnerPlayer, setWinnerPlayer] = useState({
    player: "jugador 1",
    typeWinner: "Ganador",
  });
  const [isWelcomeApp, setIsWelcomeApp] = useState(true);
  useEffect(() => {
    setBlocksMemo(createMemo());
    setShowModal(true);
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
  function handleRestart() {
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
  const WelcomeApp = () => {
    return (
      <div className="welcome-app">
        <h1>¡Bienvenidos Al Memorama App!</h1>
        <ul>
          <li>
            <p>
              Tendran 15 segundo para hacer un movimiento, pasado ese tiempo
              sera el turno del otro jugador.
            </p>
          </li>
          <li>
            <p>
              Quien tenga más aciertos <b>GANA</b>, en caso de tener la misma
              cantidad, sera <b>EMPATE</b>.
            </p>
          </li>
          <li>
            <p>Podrá reiniciar el juego cuando lo desee.</p>
          </li>
        </ul>
        <p>¿Todo listo para jugar? Toca el boton 🥳</p>
        <Button
          text="Empezar"
          handleClick={() => {
            handleRestart();
            setShowModal(false);
            setIsWelcomeApp(false);
          }}
        />
      </div>
    );
  };
  const WinnerPlayer = () => {
    return (
      <div className="winner-player">
        <h1>{winnerPlayer.typeWinner}</h1>
        <h2
          className={`winner-player-text ${
            winnerPlayer.typeWinner !== "Empate" &&
            winnerPlayer.player === "jugador 1"
              ? "player-one"
              : "player-two"
          }`}
        >
          {winnerPlayer.player}
        </h2>

        <Button
          text="Reinciar"
          handleClick={() => {
            handleRestart();
            setShowModal(false);
          }}
        />
      </div>
    );
  };

  return (
    <div data-testid="app" className="App">
      <Modal
        showModal={showModal}
        handleShowModal={() => setShowModal((prev) => !prev)}
      >
        {isWelcomeApp ? WelcomeApp() : WinnerPlayer()}
      </Modal>
      <Header
        turnPlayer={turnPlayer}
        scorePlayerOne={scorePlayerOne}
        scorePlayerTwo={scorePlayerTwo}
        handleRestart={handleRestart}
        keyCountDown={keyCountDown}
        onCompleteTurn={() =>
          AppFunction().onCompleteTurn(setTurnPlayer, turnPlayer)
        }
        showModal={showModal}
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
