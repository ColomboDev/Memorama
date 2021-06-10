import React from "react";
import { render, cleanup } from "@testing-library/react";
import Header from "components/header";

const renderComponent = (props = {}) => render(<Header {...props} />);

describe("header", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("header")).toBeTruthy();
  });
  it("renders correctly text success players", () => {
    const { queryByTestId } = renderComponent({
      scorePlayerOne: { success: 1, error: 0 },
      scorePlayerTwo: { success: 2, error: 0 },
    });
    expect(queryByTestId("text-success-player-1").textContent).toEqual(
      "Aciertos: 1"
    );
    expect(queryByTestId("text-success-player-2").textContent).toEqual(
      "Aciertos: 2"
    );
    expect(queryByTestId("text-success-player-1").className).toEqual("success");
    expect(queryByTestId("text-success-player-1").className).toEqual("success");
  });
  it("renders correctly text errors players", () => {
    const { queryByTestId } = renderComponent({
      scorePlayerOne: { success: 1, error: 1 },
      scorePlayerTwo: { success: 2, error: 2 },
    });
    expect(queryByTestId("text-errors-player-1").textContent).toEqual(
      "Desaciertos: 1"
    );
    expect(queryByTestId("text-errors-player-2").textContent).toEqual(
      "Desaciertos: 2"
    );
    expect(queryByTestId("text-errors-player-1").className).toEqual("error");
    expect(queryByTestId("text-errors-player-2").className).toEqual("error");
  });
  it("renders correctly turn player", () => {
    const { queryByTestId } = renderComponent({
      scorePlayerOne: { success: 1, error: 1 },
      scorePlayerTwo: { success: 2, error: 2 },
      turnPlayer: "jugador 2",
    });
    expect(queryByTestId("text-turn-player").textContent).toEqual(
      "Turno: jugador 2"
    );
  });
});
