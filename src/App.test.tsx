import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders both logos and the main heading", () => {
    render(<App />);

    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it("increments the counter when button is clicked", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is/i });

    expect(button).toHaveTextContent("count is 0");

    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 2");
  });

  it('displays the "learn more" paragraph correctly', () => {
    render(<App />);

    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i)
    ).toBeInTheDocument();
  });
});
