import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText(/React.js \+ Docker/i)).toBeInTheDocument();
  });

  it("renders all major sections", () => {
    render(<App />);
    
    // Hero section
    expect(screen.getByText(/Sample Project/i)).toBeInTheDocument();
    
    // Features section
    expect(screen.getByText(/Why This Sample\?/i)).toBeInTheDocument();
    
    // Quick Start section
    expect(screen.getByText(/Quick Start/i)).toBeInTheDocument();
    
    // Footer section
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  it("renders the main container with correct classes", () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
  });
});

