import { render, screen, fireEvent } from "@testing-library/react";
import { CommandCard } from "./index";
import type { DockerCommand } from "../types";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe("CommandCard Component", () => {
  const mockCommand: DockerCommand = {
    title: "Development",
    command: "docker compose up",
    description: "Start development server with hot reload",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText(mockCommand.title)).toBeInTheDocument();
  });

  it("renders the command title", () => {
    render(<CommandCard command={mockCommand} />);
    const title = screen.getByText(mockCommand.title);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H3");
  });

  it("renders the command description", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText(mockCommand.description)).toBeInTheDocument();
  });

  it("renders the command itself", () => {
    render(<CommandCard command={mockCommand} />);
    const commandText = screen.getByText(mockCommand.command);
    expect(commandText).toBeInTheDocument();
    expect(commandText.tagName).toBe("CODE");
  });

  it("renders the copy button", () => {
    render(<CommandCard command={mockCommand} />);
    const copyButton = screen.getByRole("button");
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute("title", "Copy to clipboard");
    expect(copyButton).toHaveAttribute("aria-label", "Copy command to clipboard");
  });

  it("copies command to clipboard when copy button is clicked", async () => {
    render(<CommandCard command={mockCommand} />);
    const copyButton = screen.getByRole("button");
    
    fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCommand.command);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CommandCard command={mockCommand} />);
    const card = container.querySelector(".bg-gray-50.p-8");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("border-l-4");
    expect(card).toHaveClass("border-green-500");
  });

  it("renders command in dark code block", () => {
    const { container } = render(<CommandCard command={mockCommand} />);
    const codeBlock = container.querySelector(".bg-gray-800");
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock).toHaveClass("p-6");
    expect(codeBlock).toHaveClass("rounded-xl");
  });

  it("renders copy button emoji", () => {
    render(<CommandCard command={mockCommand} />);
    const copyButton = screen.getByRole("button");
    expect(copyButton).toHaveTextContent("📋");
  });

  it("handles multiple copy clicks", () => {
    render(<CommandCard command={mockCommand} />);
    const copyButton = screen.getByRole("button");
    
    fireEvent.click(copyButton);
    fireEvent.click(copyButton);
    fireEvent.click(copyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(3);
  });
});

