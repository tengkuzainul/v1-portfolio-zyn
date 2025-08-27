import React from "react";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFramer,
  IconBrandNodejs,
  IconServer,
  IconDatabase,
  IconBrandLaravel,
  IconSql,
  IconBrandAlpineJs,
  IconPlugConnected,
  IconChartBar,
  IconBrandLivewire,
} from "@tabler/icons-react";

export interface TechIcon {
  node: React.ReactNode;
  title: string;
  href?: string;
}

// Memoized icon mapping untuk menghindari re-creation
export const getTechIcon = (tech: string): TechIcon => {
  const iconMap: Record<string, TechIcon> = {
    React: {
      node: React.createElement(IconBrandReact, { size: 24, stroke: 1.5 }),
      title: "React",
      href: "https://react.dev",
    },
    "Next.js": {
      node: React.createElement(IconBrandNextjs, { size: 24, stroke: 1.5 }),
      title: "Next.js",
      href: "https://nextjs.org",
    },
    TypeScript: {
      node: React.createElement(IconBrandTypescript, { size: 24, stroke: 1.5 }),
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    "Tailwind CSS": {
      node: React.createElement(IconBrandTailwind, { size: 24, stroke: 1.5 }),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    "Framer Motion": {
      node: React.createElement(IconBrandFramer, { size: 24, stroke: 1.5 }),
      title: "Framer Motion",
      href: "https://www.framer.com/motion",
    },
    "Node.js": {
      node: React.createElement(IconBrandNodejs, { size: 24, stroke: 1.5 }),
      title: "Node.js",
    },
    Express: {
      node: React.createElement(IconServer, { size: 24, stroke: 1.5 }),
      title: "Express",
    },
    MongoDB: {
      node: React.createElement(IconDatabase, { size: 24, stroke: 1.5 }),
      title: "MongoDB",
    },
    Laravel: {
      node: React.createElement(IconBrandLaravel, { size: 24, stroke: 1.5 }),
      title: "Laravel",
    },
    MySQL: {
      node: React.createElement(IconSql, { size: 24, stroke: 1.5 }),
      title: "MySQL",
    },
    "Alpine.js": {
      node: React.createElement(IconBrandAlpineJs, { size: 24, stroke: 1.5 }),
      title: "Alpine.js",
    },
    "Socket.io": {
      node: React.createElement(IconPlugConnected, { size: 24, stroke: 1.5 }),
      title: "Socket.io",
    },
    "Chart.js": {
      node: React.createElement(IconChartBar, { size: 24, stroke: 1.5 }),
      title: "Chart.js",
    },
    Livewire: {
      node: React.createElement(IconBrandLivewire, { size: 24, stroke: 1.5 }),
      title: "Livewire",
    },
  };

  return iconMap[tech] || { node: tech, title: tech };
};
