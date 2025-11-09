import { FEATURES, DOCKER_COMMANDS, SOCIAL_LINKS } from "./data";

describe("Constants Data", () => {
  describe("FEATURES", () => {
    it("is an array with correct length", () => {
      expect(Array.isArray(FEATURES)).toBe(true);
      expect(FEATURES.length).toBe(6);
    });

    it("all features have required properties", () => {
      FEATURES.forEach((feature) => {
        expect(feature).toHaveProperty("icon");
        expect(feature).toHaveProperty("title");
        expect(feature).toHaveProperty("description");
        expect(typeof feature.icon).toBe("string");
        expect(typeof feature.title).toBe("string");
        expect(typeof feature.description).toBe("string");
      });
    });

    it("contains the Docker Containerization feature", () => {
      const dockerFeature = FEATURES.find(
        (f) => f.title === "Docker Containerization"
      );
      expect(dockerFeature).toBeDefined();
      expect(dockerFeature?.icon).toBe("🐳");
    });

    it("contains the Lightning Fast feature", () => {
      const fastFeature = FEATURES.find((f) => f.title === "Lightning Fast");
      expect(fastFeature).toBeDefined();
      expect(fastFeature?.icon).toBe("⚡");
    });

    it("contains the Security First feature", () => {
      const securityFeature = FEATURES.find(
        (f) => f.title === "Security First"
      );
      expect(securityFeature).toBeDefined();
      expect(securityFeature?.icon).toBe("🔒");
    });
  });

  describe("DOCKER_COMMANDS", () => {
    it("is an array with correct length", () => {
      expect(Array.isArray(DOCKER_COMMANDS)).toBe(true);
      expect(DOCKER_COMMANDS.length).toBe(3);
    });

    it("all commands have required properties", () => {
      DOCKER_COMMANDS.forEach((cmd) => {
        expect(cmd).toHaveProperty("title");
        expect(cmd).toHaveProperty("command");
        expect(cmd).toHaveProperty("description");
        expect(typeof cmd.title).toBe("string");
        expect(typeof cmd.command).toBe("string");
        expect(typeof cmd.description).toBe("string");
      });
    });

    it("contains the Development command", () => {
      const devCommand = DOCKER_COMMANDS.find((c) => c.title === "Development");
      expect(devCommand).toBeDefined();
      expect(devCommand?.command).toBe("docker compose up");
    });

    it("contains the Production Build command", () => {
      const buildCommand = DOCKER_COMMANDS.find(
        (c) => c.title === "Production Build"
      );
      expect(buildCommand).toBeDefined();
      expect(buildCommand?.command).toBe("docker build -t react-docker-app .");
    });

    it("contains the Run Production command", () => {
      const runCommand = DOCKER_COMMANDS.find(
        (c) => c.title === "Run Production"
      );
      expect(runCommand).toBeDefined();
      expect(runCommand?.command).toBe("docker run -p 80:80 react-docker-app");
    });
  });

  describe("SOCIAL_LINKS", () => {
    it("has all required properties", () => {
      expect(SOCIAL_LINKS).toHaveProperty("linkedin");
      expect(SOCIAL_LINKS).toHaveProperty("medium");
      expect(SOCIAL_LINKS).toHaveProperty("newsletter");
      expect(SOCIAL_LINKS).toHaveProperty("github");
      expect(SOCIAL_LINKS).toHaveProperty("githubSponsors");
      expect(SOCIAL_LINKS).toHaveProperty("donate");
      expect(SOCIAL_LINKS).toHaveProperty("documentation");
    });

    it("all links are valid URLs", () => {
      Object.values(SOCIAL_LINKS).forEach((url) => {
        expect(url).toMatch(/^https:\/\/.+/);
      });
    });

    it("LinkedIn link is correct", () => {
      expect(SOCIAL_LINKS.linkedin).toBe(
        "https://www.linkedin.com/in/kristiyan-velkov-763130b3/"
      );
    });

    it("GitHub link is correct", () => {
      expect(SOCIAL_LINKS.github).toBe(
        "https://github.com/kristiyan-velkov/docker-reactjs-sample"
      );
    });

    it("Documentation link points to Docker docs", () => {
      expect(SOCIAL_LINKS.documentation).toBe(
        "https://docs.docker.com/guides/reactjs/"
      );
    });

    it("Newsletter link is correct", () => {
      expect(SOCIAL_LINKS.newsletter).toBe(
        "https://frontendworld.substack.com/"
      );
    });

    it("Medium link is correct", () => {
      expect(SOCIAL_LINKS.medium).toBe("https://medium.com/@kristiyanvelkov");
    });

    it("GitHub Sponsors link is correct", () => {
      expect(SOCIAL_LINKS.githubSponsors).toBe(
        "https://github.com/sponsors/kristiyan-velkov"
      );
    });

    it("Donate link is correct", () => {
      expect(SOCIAL_LINKS.donate).toBe(
        "https://donate.stripe.com/eVq4gz9dKex71ZW68L3F600"
      );
    });
  });
});
