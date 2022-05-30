import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders credit card preview", () => {
  render(<App />);

  const previewText = screen.getByText(/QL AB/i);
  expect(previewText).toBeInTheDocument();
});
