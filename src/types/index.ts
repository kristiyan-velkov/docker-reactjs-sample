export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface DockerCommand {
  title: string;
  command: string;
  description: string;
}

export interface FooterLink {
  title: string;
  url: string;
}

export interface FooterSection {
  heading: string;
  links: FooterLink[];
}

export type TabType = "overview" | "commands";
