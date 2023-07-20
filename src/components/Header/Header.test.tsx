import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test(" should Renders same text passed into typography", () => {
  render(<Header />);
  const HeadingElement = screen.getByText(/Timer App/i);
  expect(HeadingElement).toBeInTheDocument();
});
