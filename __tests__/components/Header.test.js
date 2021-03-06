import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Header from "components/Header";

const renderComponent = (props = {}) => render(<Header {...props} />);

describe("Header", () => {
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
      showModal: true,
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
      "Turno:jugador 2"
    );
  });
  it("is handle restart", () => {
    const onClickSpy = jest.fn();
    const { queryByTestId } = renderComponent({ handleRestart: onClickSpy });
    fireEvent.click(queryByTestId("button_restart"));
    expect(onClickSpy).toHaveBeenCalled();
  });
});
