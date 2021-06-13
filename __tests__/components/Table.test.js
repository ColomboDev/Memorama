import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Table from "components/Table";
import { blocks } from "../__Mock__/data";
const renderComponent = (props = {}) => render(<Table {...props} />);

describe("Table", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    const { queryByTestId } = renderComponent({ blocks });
    expect(queryByTestId("table")).toBeTruthy();
    expect(queryByTestId("table").className).toEqual("table");
    expect(queryByTestId("block_1")).toBeTruthy();
  });
  it("handle click block", () => {
    const onClickSpy = jest.fn();
    const { queryByTestId } = renderComponent({
      blocks,
      animating: false,
      handleClickBlock: onClickSpy,
    });
    fireEvent.click(queryByTestId("block_1"));
    expect(onClickSpy).toHaveBeenCalled();
  });
});
