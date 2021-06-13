import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "components/Button";

const renderComponent = (props = {}) => render(<Button {...props} />);

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    const { queryByTestId } = renderComponent({ id: "test" });
    expect(queryByTestId("button_test")).toBeTruthy();
    expect(queryByTestId("button_test").className).toEqual("button");
  });
  it("render button with text", () => {
    const { queryByTestId } = renderComponent({ id: "test", text: "Button" });
    expect(queryByTestId("button_test_text").textContent).toEqual("Button");
  });
  it("handle click button", () => {
    const onClickSpy = jest.fn();
    const { queryByTestId } = renderComponent({
      id: "test",
      text: "Button",
      handleClick: onClickSpy,
    });
    fireEvent.click(queryByTestId("button_test"));
    expect(onClickSpy).toHaveBeenCalled();
  });
});
