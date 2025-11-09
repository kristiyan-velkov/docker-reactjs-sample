import { render, screen } from "@testing-library/react";
import { FEATURES } from "../constants/data";
import { Features } from "./index";

describe("Features Component", () => {
  it("renders without crashing", () => {
    render(<Features />);
    expect(screen.getByText(/Why This Sample\?/i)).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<Features />);
    const heading = screen.getByText(/Why This Sample\?/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders all feature cards", () => {
    render(<Features />);
    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
      expect(screen.getByText(feature.icon)).toBeInTheDocument();
    });
  });

  it("renders correct number of feature cards", () => {
    const { container } = render(<Features />);
    const featureCards = container.querySelectorAll(".bg-white.p-10");
    expect(featureCards.length).toBe(FEATURES.length);
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<Features />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-24");
    expect(section).toHaveClass("px-8");
    expect(section).toHaveClass("bg-gray-50");
  });

  it("renders feature cards in a grid layout", () => {
    const { container } = render(<Features />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-3");
  });
});

