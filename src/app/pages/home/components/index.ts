"use client";

import { lazyLoad, lazyLoadOnScroll } from "@/lib/lazy-load";

// Lazy loading components
// Hero content loads immediately with regular lazy loading (above the fold)
export const LazyHeroContent = lazyLoad(() => import("../hero-content"));

// Tech stack loads when scrolled into view (below the fold)
export const LazyTechStack = lazyLoadOnScroll(() => import("../tech-stack"));
