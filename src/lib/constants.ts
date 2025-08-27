// Application constants

export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  API: {
    DOWNLOADS: "/api/downloads",
    OG: "/api/og",
    SENTRY: "/api/sentry-example-api",
  },
} as const;

export const ANIMATION_DURATIONS = {
  PRELOADER: 600,
  SCROLL_REVEAL: 600,
  PAGE_TRANSITION: 300,
  HOVER: 200,
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const TECH_STACK = {
  FRONTEND: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  BACKEND: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  TOOLS: ["Git", "Docker", "Vercel", "Sentry"],
} as const;

export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/tengkuzainulaprilizar",
  LINKEDIN: "https://linkedin.com/in/tengkuzainulaprilizar",
  EMAIL: "mailto:tengkuzainulaprilizar@gmail.com",
} as const;

export const SEO = {
  SITE_NAME: "Tengku Muhammad Zainul Aprilizar",
  SITE_DESCRIPTION:
    "Full Stack Web Developer - Building modern web applications with React, Next.js, and Node.js",
  SITE_URL: "https://your-domain.com",
  OG_IMAGE: "/images/og-image.jpg",
} as const;
