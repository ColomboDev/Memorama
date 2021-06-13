import React, { useEffect, useState } from "react";
import {
  createMemo,
  onCompleteTurn,
  handleClickBlock,
  handleRestart,
} from "utils/utils";
import Header from "components/Header";
import Table from "components/Table";
import Modal from "components/Modal";
import Button from "components/Button";
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
            handleRestart(
              setBlocksMemo,
              setBlockSelected,
              setScorePlayerTwo,
              setScorePlayerOne,
              setTurnPlayer,
              setKeyCountDown
            );
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
            handleRestart(
              setBlocksMemo,
              setBlockSelected,
              setScorePlayerTwo,
              setScorePlayerOne,
              setTurnPlayer,
              setKeyCountDown
            );
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
        handleRestart={() =>
          handleRestart(
            setBlocksMemo,
            setBlockSelected,
            setScorePlayerTwo,
            setScorePlayerOne,
            setTurnPlayer,
            setKeyCountDown
          )
        }
        keyCountDown={keyCountDown}
        onCompleteTurn={() => onCompleteTurn(setTurnPlayer, turnPlayer)}
        showModal={showModal}
      />
      <Table
        blocks={blocksMemo}
        handleClickBlock={(block) =>
          handleClickBlock(
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
          )
        }
        animating={animating}
      />
    </div>
  );
}

export default App;
