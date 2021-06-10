import React from "react";
import { render } from "@testing-library/react";
import App from "App";

const renderComponent = () => render(<App />);

describe("App", () => {
  it("renders correctly", () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId("app")).toBeTruthy();
  });
});
