// Define a type for project data
export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  id?: string;
}

// Sample project data
export const projects: Project[] = [
  {
    title: "RO-App",
    description:
      "A Ragnarok Online companion application built with modern web technologies featuring character management, guild systems, and real-time game data integration.",
    imageUrl: "/images/assets/projects/RO-App.svg",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/tengkuzainul/ro-app",
    liveUrl: "https://ro-app.tengkuzainul.me",
    id: "DEV.001",
  },
  {
    title: "StuntGuard-App",
    description:
      "A comprehensive child development monitoring application designed to prevent stunting with nutrition tracking, growth monitoring, and healthcare recommendations.",
    imageUrl: "/images/assets/projects/StuntGuard-App.svg",
    technologies: ["React Native", "Laravel", "MySQL", "Firebase", "Chart.js"],
    githubUrl: "https://github.com/tengkuzainul/stuntguard-app",
    liveUrl: "https://stuntguard.tengkuzainul.me",
    id: "DEV.002",
  },
  {
    title: "Zyn-StarterKits",
    description:
      "A collection of modern web development starter kits and templates featuring best practices, optimized configurations, and ready-to-use components for rapid development.",
    imageUrl: "/images/assets/projects/Zyn-StarterKits.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vite"],
    githubUrl: "https://github.com/tengkuzainul/zyn-starterkits",
    liveUrl: "https://starterkits.tengkuzainul.me",
    id: "DEV.003",
  },
  {
    title: "Portfolio Website v1",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS featuring interactive animations, smooth transitions, and modern design principles.",
    imageUrl: "/images/assets/projects/RO-App.svg", // Using as placeholder until portfolio image is added
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
    githubUrl: "https://github.com/tengkuzainul/v1-portfolio-zyn",
    liveUrl: "https://tengkuzainul.me",
    id: "DEV.004",
  },
  // Additional projects for the projects page
  {
    title: "E-Learning Platform",
    description:
      "An interactive e-learning platform with course management, live streaming, progress tracking, and collaborative features for modern education.",
    imageUrl: "/images/assets/projects/StuntGuard-App.svg", // Using as placeholder
    technologies: ["Laravel", "Vue.js", "MySQL", "WebRTC", "Redis"],
    githubUrl: "https://github.com/tengkuzainul/e-learning-platform",
    liveUrl: "https://learn.tengkuzainul.me",
    id: "DEV.005",
  },
  {
    title: "Development Tools Suite",
    description:
      "A comprehensive suite of development tools and utilities including code generators, API testing tools, and project scaffolding utilities.",
    imageUrl: "/images/assets/projects/Zyn-StarterKits.svg", // Using as placeholder
    technologies: ["Node.js", "Express", "React", "Electron", "SQLite"],
    githubUrl: "https://github.com/tengkuzainul/dev-tools-suite",
    // No liveUrl - for testing conditional rendering
    id: "DEV.006",
  },
  {
    title: "API Documentation Generator",
    description:
      "An automated API documentation generator that creates beautiful, interactive documentation from code comments and OpenAPI specifications.",
    imageUrl: "/images/assets/projects/RO-App.svg",
    technologies: ["TypeScript", "React", "OpenAPI", "Markdown"],
    githubUrl: "https://github.com/tengkuzainul/api-docs-generator",
    // No liveUrl - GitHub only project
    id: "DEV.007",
  },
  {
    title: "CLI Development Framework",
    description:
      "A powerful command-line interface framework for building robust CLI applications with TypeScript, featuring auto-completion and help generation.",
    imageUrl: "/images/assets/projects/StuntGuard-App.svg",
    technologies: ["TypeScript", "Node.js", "Commander.js", "Inquirer"],
    githubUrl: "https://github.com/tengkuzainul/cli-framework",
    // No liveUrl - CLI tool
    id: "DEV.008",
  },
];
