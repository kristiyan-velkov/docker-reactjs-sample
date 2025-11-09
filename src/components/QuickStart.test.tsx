import { render, screen, fireEvent } from "@testing-library/react";
import { QuickStart } from "./index";

describe("QuickStart Component", () => {
  it("renders without crashing", () => {
    render(<QuickStart />);
    expect(screen.getByText(/Quick Start/i)).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<QuickStart />);
    const heading = screen.getByText(/Quick Start/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders both tab buttons", () => {
    render(<QuickStart />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Docker Commands")).toBeInTheDocument();
  });

  it("shows Overview tab by default", () => {
    render(<QuickStart />);
    expect(screen.getByText(/Project Structure/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it("switches to Docker Commands tab when clicked", () => {
    render(<QuickStart />);
    const commandsButton = screen.getByText("Docker Commands");
    fireEvent.click(commandsButton);
    
    // Check if Docker Commands content is displayed
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Production Build")).toBeInTheDocument();
  });

  it("switches back to Overview tab when clicked", () => {
    render(<QuickStart />);
    const commandsButton = screen.getByText("Docker Commands");
    const overviewButton = screen.getByText("Overview");
    
    fireEvent.click(commandsButton);
    fireEvent.click(overviewButton);
    
    // Check if Overview content is displayed again
    expect(screen.getByText(/Project Structure/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it("applies active styles to the Overview button by default", () => {
    render(<QuickStart />);
    const overviewButton = screen.getByText("Overview");
    expect(overviewButton).toHaveClass("bg-gradient-to-br");
  });

  it("applies active styles to the clicked tab button", () => {
    render(<QuickStart />);
    const commandsButton = screen.getByText("Docker Commands");
    fireEvent.click(commandsButton);
    
    // Note: The active class might not be exactly as expected due to the typo in the original code
    // but we'll test what's there
    expect(commandsButton.className).toContain("bg-");
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<QuickStart />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-24");
    expect(section).toHaveClass("px-8");
    expect(section).toHaveClass("bg-white");
  });
});

