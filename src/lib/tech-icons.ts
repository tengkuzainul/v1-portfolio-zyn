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
  IconBrandPhp,
  IconBrandMysql,
  IconBrandJavascript,
  IconBrandBootstrap,
  IconCode,
} from "@tabler/icons-react";

export interface TechIcon {
  node: React.ReactNode;
  title: string;
  href?: string;
}

// Memoized icon mapping untuk menghindari re-creation
export const getTechIcon = (tech: string): TechIcon => {
  const iconMap: Record<string, TechIcon> = {
    // React ecosystem
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

    // CSS Frameworks
    "Tailwind CSS": {
      node: React.createElement(IconBrandTailwind, { size: 24, stroke: 1.5 }),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    TailwindCSS: {
      node: React.createElement(IconBrandTailwind, { size: 24, stroke: 1.5 }),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    Bootstrap: {
      node: React.createElement(IconBrandBootstrap, { size: 24, stroke: 1.5 }),
      title: "Bootstrap",
      href: "https://getbootstrap.com",
    },

    // JavaScript & Frontend
    Javascript: {
      node: React.createElement(IconBrandJavascript, { size: 24, stroke: 1.5 }),
      title: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    JavaScript: {
      node: React.createElement(IconBrandJavascript, { size: 24, stroke: 1.5 }),
      title: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    "Alpine.js": {
      node: React.createElement(IconBrandAlpineJs, { size: 24, stroke: 1.5 }),
      title: "Alpine.js",
      href: "https://alpinejs.dev",
    },
    AlpineJS: {
      node: React.createElement(IconBrandAlpineJs, { size: 24, stroke: 1.5 }),
      title: "Alpine.js",
      href: "https://alpinejs.dev",
    },

    // Animation Libraries
    "Framer Motion": {
      node: React.createElement(IconBrandFramer, { size: 24, stroke: 1.5 }),
      title: "Framer Motion",
      href: "https://www.framer.com/motion",
    },

    // Backend & Server
    "Node.js": {
      node: React.createElement(IconBrandNodejs, { size: 24, stroke: 1.5 }),
      title: "Node.js",
    },
    Express: {
      node: React.createElement(IconServer, { size: 24, stroke: 1.5 }),
      title: "Express",
    },
    Laravel: {
      node: React.createElement(IconBrandLaravel, { size: 24, stroke: 1.5 }),
      title: "Laravel",
      href: "https://laravel.com",
    },
    Livewire: {
      node: React.createElement(IconBrandLivewire, { size: 24, stroke: 1.5 }),
      title: "Livewire",
      href: "https://livewire.laravel.com",
    },
    PHP: {
      node: React.createElement(IconBrandPhp, { size: 24, stroke: 1.5 }),
      title: "PHP",
      href: "https://www.php.net",
    },

    // Databases
    MongoDB: {
      node: React.createElement(IconDatabase, { size: 24, stroke: 1.5 }),
      title: "MongoDB",
    },
    MySQL: {
      node: React.createElement(IconBrandMysql, { size: 24, stroke: 1.5 }),
      title: "MySQL",
      href: "https://www.mysql.com",
    },

    // Tools & Utilities
    "Socket.io": {
      node: React.createElement(IconPlugConnected, { size: 24, stroke: 1.5 }),
      title: "Socket.io",
    },
    "Chart.js": {
      node: React.createElement(IconChartBar, { size: 24, stroke: 1.5 }),
      title: "Chart.js",
    },
  };

  // Return mapped icon or fallback with a generic code icon instead of text
  return (
    iconMap[tech] || {
      node: React.createElement(IconCode, { size: 24, stroke: 1.5 }),
      title: tech,
    }
  );
};
