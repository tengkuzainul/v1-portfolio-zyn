"use client";

import React, { useEffect, useRef, useMemo, memo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconExternalLink,
  IconPlus,
  IconArrowRight,
} from "@tabler/icons-react";

// Import optimized utilities
import { useOptimizedInView, optimizedVariants } from "@/lib/performance-utils";
import { getTechIcon } from "@/lib/tech-icons";
import {
  useLazyImage,
  useReducedMotion,
  precomputedStyles,
} from "@/lib/animation-utils";

// Import project data from shared file
import { Project, projects } from "@/data/projects-data";
import LogoLoop from "@/components/ui/logo-loop-optimized";
import Preloader from "@/components/ui/preloader";

export function ProjectSection({ loaded = true }: { loaded?: boolean }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prefetch projects page on component mount for instant navigation
  useEffect(() => {
    router.prefetch("/projects");
  }, [router]);

  // Function to handle navigation to All Projects page with preloader
  const handleShowMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    // Immediate navigation with router prefetch for better performance
    router.push("/projects");
  };

  const handleTransitionComplete = () => {
    // Clean state reset
    setIsTransitioning(false);
  };

  // Optimized intersection observer
  const [sectionRef, isInView] = useOptimizedInView(0.2, "100px");
  const mainControls = useAnimation();

  // Simplified animation trigger
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Memoize projects slice untuk menghindari re-computation
  const displayedProjects = useMemo(() => projects.slice(0, 4), []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20"
    >
      <motion.div
        className="container mx-auto px-4 max-w-sm md:max-w-xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-8xl"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-8xl font-bold text-start mb-10 text-black dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Recent Projects
          </motion.h2>

          <motion.p
            className="text-lg text-black dark:text-white mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here are some of my recent projects that showcase my skills and
            experience in web development. Each project reflects different
            aspects of my technical abilities and problem-solving approach.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch" // Added items-stretch
          variants={optimizedVariants.container}
          initial="hidden"
          animate={mainControls}
        >
          {displayedProjects.map((project, index) => (
            <OptimizedProjectCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* Show More Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-neutral-700 dark:text-neutral-300 overflow-hidden border-2 border-black dark:border-white hover:text-black dark:hover:text-neutral-50 transition-colors duration-300"
            onClick={handleShowMoreClick}
            onMouseEnter={() => router.prefetch("/projects")} // Hover prefetch for instant loading
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="absolute inset-0 bg-black dark:bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            <span className="relative flex items-center gap-2 z-10">
              Show More
              <IconArrowRight
                stroke={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Preloader */}
      <Preloader
        isLoading={isTransitioning}
        onComplete={handleTransitionComplete}
        type="loading"
      />
    </section>
  );
}

// Memoized ProjectCard component untuk mencegah unnecessary re-renders
const OptimizedProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const { imgRef, imageSrc, isLoaded, isError, isIntersecting } = useLazyImage(
    project.imageUrl
  );

  // Use intersection observer dengan element yang benar
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.3, rootMargin: "50px" }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [controls]);

  // Memoize tech icons to prevent recreation
  const techIcons = useMemo(
    () =>
      project.technologies.map((tech) => {
        const techIcon = getTechIcon(tech);
        return {
          node: techIcon.node,
          title: techIcon.title,
          ariaLabel: techIcon.title,
        };
      }),
    [project.technologies]
  );

  // Use simpler animation variants
  const animationVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      ref={cardRef}
      className={precomputedStyles.projectCard.base}
      variants={animationVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
      layout={false} // Disable layout animations untuk performa
    >
      {/* Simplified corner decorations */}
      <CornerDecorations />

      {/* Card container */}
      <div className={precomputedStyles.projectCard.border}>
        {/* Project title header */}
        <div className={precomputedStyles.projectCard.header}>
          <h3 className="font-medium tracking-wider text-lg text-black dark:text-white uppercase">
            {project.title}
          </h3>
        </div>

        {/* Image container with optimized loading */}
        <div className={precomputedStyles.projectCard.imageContainer}>
          {imageSrc && isIntersecting ? (
            <motion.img
              src={imageSrc}
              alt={project.title}
              className={precomputedStyles.projectCard.image}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              onError={() => console.warn(`Failed to load image: ${imageSrc}`)}
            />
          ) : (
            <div
              ref={imgRef}
              className={`${precomputedStyles.projectCard.image} bg-gray-200 dark:bg-gray-800 flex items-center justify-center`}
            >
              {isError ? (
                <span className="text-gray-500 text-sm">
                  Failed to load image
                </span>
              ) : isIntersecting ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-full" />
              ) : (
                <span className="text-gray-500 text-sm">Loading...</span>
              )}
            </div>
          )}
        </div>

        {/* Project details section */}
        <div className={precomputedStyles.projectCard.content}>
          <p className="text-black dark:text-white mb-6 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto">
            <h4 className="text-xs uppercase font-semibold text-black dark:text-white mb-2">
              Technologies Used:
            </h4>
            <div className="h-[48px] overflow-hidden mb-6">
              <LogoLoop
                logos={techIcons}
                speed={prefersReducedMotion ? 40 : 120} // Increased speed for faster movement
                direction="left"
                logoHeight={24}
                gap={20} // Reduced gap for tighter spacing
                pauseOnHover={!prefersReducedMotion}
                fadeOut={!prefersReducedMotion}
                fadeOutColor="transparent"
                ariaLabel={`${project.title} technologies`}
              />
            </div>
          </div>

          {/* Footer section */}
          <div className={precomputedStyles.projectCard.footer}>
            <div className="text-xs text-black dark:text-white font-mono font-bold">
              {project.id}
            </div>
            <div className="flex items-center gap-3">
              {/* GitHub Button - Always show if available */}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 border border-black dark:border-white hover:bg-black dark:hover:bg-white transition-colors duration-300 group/github"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  title="View GitHub Repository"
                >
                  <IconBrandGithub
                    className="h-4 w-4 text-black dark:text-white group-hover/github:text-white dark:group-hover/github:text-black transition-colors duration-300"
                    stroke={2}
                  />
                </motion.a>
              )}

              {/* Demo Button - Only show if liveUrl exists */}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-black dark:text-white group/link"
                  whileHover={prefersReducedMotion ? {} : { x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  LIHAT
                  <IconExternalLink
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    stroke={2.5}
                  />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Simplified corner decorations component
const CornerDecorations = memo(function CornerDecorations() {
  return (
    <>
      <div className="absolute -top-3 -left-3 z-10">
        <IconPlus className="size-6 text-black dark:text-white" />
      </div>
      <div className="absolute -top-3 -right-3 z-10">
        <IconPlus className="size-6 text-black dark:text-white" />
      </div>
      <div className="absolute -bottom-3 -left-3 z-10">
        <IconPlus className="size-6 text-black dark:text-white" />
      </div>
      <div className="absolute -bottom-3 -right-3 z-10">
        <IconPlus className="size-6 text-black dark:text-white" />
      </div>
    </>
  );
});
