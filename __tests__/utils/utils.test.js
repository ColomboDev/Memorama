import {
  createMemo,
  checkFinish,
  onCompleteTurn,
  handleRestart,
  handleClickBlock,
} from "utils/utils";
import { block, blocks, scorePlayer } from "../__Mock__/data";

describe("utils", () => {
  it("createMemo functions ", () => {
    let blocksMemo = createMemo();
    expect(blocksMemo.length).toEqual(20);
  });
  it("checkFinish functions ", () => {
    let blocksMemo = createMemo();
    let isFinish = checkFinish(blocksMemo);
    expect(isFinish).toBeFalsy();
    blocksMemo = blocksMemo.map((block) => {
      return { ...block, flipped: true };
    });
    isFinish = checkFinish(blocksMemo);
    expect(isFinish).toBeTruthy();
  });
  it("onCompleteTurn", () => {
    const setTurnPlayer = jest.fn();
    onCompleteTurn(setTurnPlayer, "jugador 1");
    expect(setTurnPlayer.mock.calls.length).toBe(1);
  });
  it("handleRestart", () => {
    const setBlocksMemo = jest.fn();
    const setBlockSelected = jest.fn();
    const setScorePlayerTwo = jest.fn();
    const setScorePlayerOne = jest.fn();
    const setTurnPlayer = jest.fn();
    const setKeyCountDown = jest.fn();
    handleRestart(
      setBlocksMemo,
      setBlockSelected,
      setScorePlayerTwo,
      setScorePlayerOne,
      setTurnPlayer,
      setKeyCountDown
    );
    expect(setBlocksMemo.mock.calls.length).toBe(1);
    expect(setBlockSelected.mock.calls.length).toBe(1);
    expect(setScorePlayerTwo.mock.calls.length).toBe(1);
    expect(setScorePlayerOne.mock.calls.length).toBe(1);
    expect(setTurnPlayer.mock.calls.length).toBe(1);
    expect(setKeyCountDown.mock.calls.length).toBe(1);
  });
  it("handleClickBlock no block selected", () => {
    const setBlocksMemo = jest.fn();
    const setBlockSelected = jest.fn();
    const setScorePlayerTwo = jest.fn();
    const setScorePlayerOne = jest.fn();
    const setTurnPlayer = jest.fn();
    const setKeyCountDown = jest.fn();
    const setWinnerPlayer = jest.fn();
    const setShowModal = jest.fn();
    const setAnimating = jest.fn();
    handleClickBlock(
      block,
      blocks,
      null,
      scorePlayer,
      scorePlayer,
      "jugador 1",
      setBlocksMemo,
      setBlockSelected,
      setWinnerPlayer,
      setShowModal,
      setKeyCountDown,
      setTurnPlayer,
      setScorePlayerOne,
      setScorePlayerTwo,
      setAnimating
    );
    expect(setBlocksMemo.mock.calls.length).toBe(1);
    expect(setBlockSelected.mock.calls.length).toBe(1);
    handleClickBlock(
      block,
      blocks,
      block,
      scorePlayer,
      scorePlayer,
      "jugador 1",
      setBlocksMemo,
      setBlockSelected,
      setWinnerPlayer,
      setShowModal,
      setKeyCountDown,
      setTurnPlayer,
      setScorePlayerOne,
      setScorePlayerTwo,
      setAnimating
    );

    expect(setScorePlayerTwo.mock.calls.length).toBe(1);
    expect(setKeyCountDown.mock.calls.length).toBe(1);
    expect(setKeyCountDown.mock.calls.length).toBe(1);
    handleClickBlock(
      block,
      blocks,
      (block.emoji = "🦍"),
      scorePlayer,
      scorePlayer,
      "jugador 1",
      setBlocksMemo,
      setBlockSelected,
      setWinnerPlayer,
      setShowModal,
      setKeyCountDown,
      setTurnPlayer,
      setScorePlayerOne,
      setScorePlayerTwo,
      setAnimating
    );
    setAnimating;
    expect(setAnimating.mock.calls.length).toBe(1);
    expect(setTurnPlayer.mock.calls.length).toBe(1);
  });
});
