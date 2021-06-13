import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Modal from "components/Modal";
const renderComponent = (props = {}) =>
  render(
    <Modal {...props}>
      <div data-testid="children">
        <h1>Test</h1>
      </div>
    </Modal>
  );

describe("Modal", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders correctly", () => {
    const { queryByTestId } = renderComponent({ showModal: true });
    expect(queryByTestId("modal")).toBeTruthy();
  });
  it("renders correctly children modal", () => {
    const { queryByTestId } = renderComponent({ showModal: true });
    expect(queryByTestId("children")).toBeTruthy();
  });
});
