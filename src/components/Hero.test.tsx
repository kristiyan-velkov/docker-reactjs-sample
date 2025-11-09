import { render, screen } from "@testing-library/react";
import { Hero } from "./index";

describe("Hero Component", () => {
  it("renders without crashing", () => {
    render(<Hero />);
    expect(screen.getByText(/React.js \+ Docker/i)).toBeInTheDocument();
  });

  it("renders the React logo", () => {
    render(<Hero />);
    const reactLogo = screen.getByAltText("React logo");
    expect(reactLogo).toBeInTheDocument();
    expect(reactLogo).toHaveAttribute("src");
  });

  it("renders the Docker emoji", () => {
    render(<Hero />);
    expect(screen.getByText("🐳")).toBeInTheDocument();
  });

  it("renders the main heading with correct text", () => {
    render(<Hero />);
    expect(screen.getByText(/React.js \+ Docker/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Project/i)).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /A modern, containerized React application demonstrating best practices/i
      )
    ).toBeInTheDocument();
  });

  it("renders the View Documentation button with correct link", () => {
    render(<Hero />);
    const docButton = screen.getByText("View Documentation");
    expect(docButton).toBeInTheDocument();
    expect(docButton.closest("a")).toHaveAttribute(
      "href",
      "https://docs.docker.com/guides/reactjs/"
    );
    expect(docButton.closest("a")).toHaveAttribute("target", "_blank");
    expect(docButton.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the GitHub Repository button with correct link", () => {
    render(<Hero />);
    const githubButton = screen.getByText("GitHub Repository");
    expect(githubButton).toBeInTheDocument();
    expect(githubButton.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/kristiyan-velkov/docker-reactjs-sample"
    );
    expect(githubButton.closest("a")).toHaveAttribute("target", "_blank");
    expect(githubButton.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies correct CSS classes to the header", () => {
    const { container } = render(<Hero />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("min-h-[90vh]");
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("items-center");
  });

  it("renders animated decorative elements", () => {
    const { container } = render(<Hero />);
    const decorativeElements = container.querySelectorAll(
      ".absolute.rounded-full"
    );
    expect(decorativeElements.length).toBeGreaterThan(0);
  });
});

