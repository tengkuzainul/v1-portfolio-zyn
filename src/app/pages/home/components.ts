import { lazyLoad } from "../../../lib/lazy-load";
import type { Icon } from "@tabler/icons-react";

// Lazy loaded components
export const LazyHeroContent = lazyLoad(() => import("./hero-content"));
export const LazyTechStack = lazyLoad(() => import("./tech-stack"));

// Type definitions
export interface TechStackItem {
  name: string;
  icon: Icon;
  delay: number;
}
