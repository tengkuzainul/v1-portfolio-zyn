// Type definitions for the portfolio project

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface TechIcon {
  node: React.ReactNode;
  title: string;
  ariaLabel?: string;
}

export interface NavItem {
  name: string;
  link: string;
}

export interface SectionProps {
  loaded?: boolean;
}

export interface PreloaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  type?: "loading" | "back";
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
}
