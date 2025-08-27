import { lazy } from "react";

// Lazy load components for better performance
export const LazyProjectSection = lazy(() =>
  import("@/components/features/projects/project-section").then((module) => ({
    default: module.ProjectSection,
  }))
);

export const LazyPreloader = lazy(() => import("../components/ui/preloader"));

// Prefetch critical routes
export const prefetchRoutes = (router: any) => {
  if (typeof window !== "undefined") {
    // Prefetch critical routes on page load
    router.prefetch("/projects");
    router.prefetch("/");
  }
};
