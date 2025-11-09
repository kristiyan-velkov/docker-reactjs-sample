import { render, screen } from "@testing-library/react";
import { DOCKER_COMMANDS } from "../constants/data";
import { CommandsTab } from "./index";

describe("CommandsTab Component", () => {
  it("renders without crashing", () => {
    render(<CommandsTab />);
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("renders all command cards", () => {
    render(<CommandsTab />);
    DOCKER_COMMANDS.forEach((cmd) => {
      expect(screen.getByText(cmd.title)).toBeInTheDocument();
      expect(screen.getByText(cmd.description)).toBeInTheDocument();
      expect(screen.getByText(cmd.command)).toBeInTheDocument();
    });
  });

  it("renders correct number of command cards", () => {
    render(<CommandsTab />);
    // Check for the number of copy buttons (one per command)
    const copyButtons = screen.getAllByTitle("Copy to clipboard");
    expect(copyButtons.length).toBe(DOCKER_COMMANDS.length);
  });

  it("renders commands in correct order", () => {
    render(<CommandsTab />);
    const titles = DOCKER_COMMANDS.map((cmd) => cmd.title);
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<CommandsTab />);
    const wrapper = container.querySelector(".flex.flex-col");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("gap-8");
  });

  it("passes correct props to CommandCard components", () => {
    render(<CommandsTab />);
    // Verify that all command titles, descriptions, and commands are rendered
    DOCKER_COMMANDS.forEach((cmd) => {
      expect(screen.getByText(cmd.title)).toBeInTheDocument();
      expect(screen.getByText(cmd.description)).toBeInTheDocument();
      expect(screen.getByText(cmd.command)).toBeInTheDocument();
    });
  });
});
