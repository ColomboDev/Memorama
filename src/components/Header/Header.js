import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "components/Button";
import "./Header.css";

export function Header({
  scorePlayerOne = { success: 0, error: 0 },
  scorePlayerTwo = { success: 0, error: 0 },
  turnPlayer = "jugador 1",
  handleRestart,
  onCompleteTurn,
  keyCountDown,
  showModal,
}) {
  return (
    <div data-testid="header" className="header">
      <div>
        <h2 className="player-one">Jugador 1</h2>
        <p data-testid="text-success-player-1" className="success">
          Aciertos: {scorePlayerOne.success}
        </p>
        <p data-testid="text-errors-player-1" className="error">
          Desaciertos: {scorePlayerOne.error}
        </p>
      </div>
      <div className="turn-player">
        <h1 data-testid="text-turn-player">
          Turno:
          <span
            className={turnPlayer === "jugador 1" ? "player-one" : "player-two"}
          >
            {turnPlayer}
          </span>
        </h1>
        <div className="countDown-button-content">
          {!showModal && (
            <CountdownCircleTimer
              key={keyCountDown}
              size={100}
              isPlaying
              duration={15}
              colors={[[turnPlayer === "jugador 1" ? "#5e5eff" : "#ff9222"]]}
              onComplete={() => {
                onCompleteTurn();
                return [true, 15];
              }}
            >
              {({ remainingTime }) => <h1>{remainingTime}</h1>}
            </CountdownCircleTimer>
          )}
          <Button id="restart" text="Reiniciar" handleClick={handleRestart} />
        </div>
      </div>

      <div>
        <h2 className="player-two">Jugador 2</h2>
        <p data-testid="text-success-player-2" className="success">
          Aciertos: {scorePlayerTwo.success}
        </p>
        <p data-testid="text-errors-player-2" className="error">
          Desaciertos: {scorePlayerTwo.error}
        </p>
      </div>
    </div>
  );
}
