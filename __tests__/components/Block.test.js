import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Block from "components/Block";
import { block } from "../__Mock__/data";
const renderComponent = (props = {}) => render(<Block {...props} />);

describe("Block", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders correctly block not flipped", () => {
    const { queryByTestId } = renderComponent({ block });
    expect(queryByTestId("block")).toBeTruthy();
    expect(queryByTestId("block-content").className).toEqual(
      "block-content false"
    );
  });
  it("renders correctly block flipped", () => {
    block.flipped = true;
    const { queryByTestId } = renderComponent({ block });
    expect(queryByTestId("block-content").className).toEqual(
      "block-content block-flipped"
    );
  });
  it("renders correctly block flipped", () => {
    block.flipped = false;
    const onClickSpy = jest.fn();
    const { queryByTestId } = renderComponent({
      block,
      animating: false,
      handleClickBlock: onClickSpy,
    });
    fireEvent.click(queryByTestId("block"));
    expect(onClickSpy).toHaveBeenCalled();
  });
});
