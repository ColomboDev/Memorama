import React from "react";
import "./Header.css";

export function Header({
  scorePlayerOne = { success: 0, error: 0 },
  scorePlayerTwo = { success: 0, error: 0 },
  turnPlayer = "jugador 1",
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
          Turno:{" "}
          <span
            className={turnPlayer === "jugador 1" ? "player-one" : "player-two"}
          >
            {turnPlayer}
          </span>
        </h1>
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
