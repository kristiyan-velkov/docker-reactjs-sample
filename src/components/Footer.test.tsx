import { render, screen } from "@testing-library/react";
import { Footer } from "./index";
import { SOCIAL_LINKS } from "../constants/data";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  it("renders the Created by section", () => {
    render(<Footer />);
    expect(screen.getByText("Created by")).toBeInTheDocument();
    expect(screen.getByText("Kristiyan Velkov")).toBeInTheDocument();
  });

  it("renders the LinkedIn link correctly", () => {
    render(<Footer />);
    const linkedinLink = screen.getByText("Kristiyan Velkov");
    expect(linkedinLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
    expect(linkedinLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(linkedinLink.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Resources section", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders the Newsletter link", () => {
    render(<Footer />);
    const newsletterLink = screen.getByText(/Frontend World Newsletter/i);
    expect(newsletterLink).toBeInTheDocument();
    expect(newsletterLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.newsletter);
    expect(newsletterLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the Medium blog link", () => {
    render(<Footer />);
    const mediumLink = screen.getByText(/Blog on Medium/i);
    expect(mediumLink).toBeInTheDocument();
    expect(mediumLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.medium);
    expect(mediumLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the Support section", () => {
    render(<Footer />);
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders the Stripe donation link", () => {
    render(<Footer />);
    const donateLink = screen.getByText(/Donate via Stripe/i);
    expect(donateLink).toBeInTheDocument();
    expect(donateLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.donate);
    expect(donateLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the GitHub Sponsors link", () => {
    render(<Footer />);
    const sponsorsLink = screen.getByText(/GitHub Sponsors/i);
    expect(sponsorsLink).toBeInTheDocument();
    expect(sponsorsLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.githubSponsors);
    expect(sponsorsLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Open Source • MIT License • Part of Docker Official Documentation/i)
    ).toBeInTheDocument();
  });

  it("renders in a grid layout", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("applies correct CSS classes to footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-gray-800");
    expect(footer).toHaveClass("text-white");
    expect(footer).toHaveClass("py-12");
  });

  it("renders all section headings with correct styling", () => {
    const { container } = render(<Footer />);
    const headings = container.querySelectorAll("h4");
    expect(headings.length).toBe(3);
    headings.forEach((heading) => {
      expect(heading).toHaveClass("text-xl");
      expect(heading).toHaveClass("font-semibold");
    });
  });

  it("all external links have correct attributes", () => {
    const { container } = render(<Footer />);
    const links = container.querySelectorAll('a[target="_blank"]');
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});

