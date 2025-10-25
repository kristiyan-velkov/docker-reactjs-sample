import type { Feature, DockerCommand } from "../types";

export const FEATURES: Feature[] = [
  {
    icon: "🐳",
    title: "Docker Containerization",
    description:
      "Seamlessly package your React app with Docker for consistent deployments across any environment.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Built with Vite for instant hot module replacement and optimized production builds.",
  },
  {
    icon: "🔒",
    title: "Security First",
    description:
      "Scanned with Docker Scout to ensure zero vulnerabilities and secure deployments.",
  },
  {
    icon: "🚀",
    title: "Production Ready",
    description:
      "Multi-stage builds with Nginx for optimized, production-grade static file serving.",
  },
  {
    icon: "🛠️",
    title: "Dev & Prod Workflows",
    description:
      "Separate Docker configurations for development and production environments.",
  },
  {
    icon: "📦",
    title: "Modern Stack",
    description:
      "React 19, TypeScript, Vite, and ESLint configured for the best developer experience.",
  },
];

export const DOCKER_COMMANDS: DockerCommand[] = [
  {
    title: "Development",
    command: "docker compose up",
    description: "Start development server with hot reload",
  },
  {
    title: "Production Build",
    command: "docker build -t react-docker-app .",
    description: "Build optimized production image",
  },
  {
    title: "Run Production",
    command: "docker run -p 80:80 react-docker-app",
    description: "Run production container",
  },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/kristiyan-velkov-763130b3/",
  medium: "https://medium.com/@kristiyanvelkov",
  newsletter: "https://frontendworld.substack.com/",
  github: "https://github.com/kristiyan-velkov/docker-reactjs-sample",
  githubSponsors: "https://github.com/sponsors/kristiyan-velkov",
  donate: "https://donate.stripe.com/eVq4gz9dKex71ZW68L3F600",
  documentation: "https://docs.docker.com/guides/reactjs/",
} as const;
