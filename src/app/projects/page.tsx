"use client";

import React, { useEffect, useRef, useMemo, memo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconExternalLink,
  IconPlus,
  IconArrowLeft,
} from "@tabler/icons-react";

// Import optimized utilities
import { useOptimizedInView } from "@/lib/performance-utils";
import { getTechIcon } from "@/lib/tech-icons";
import {
  useLazyImage,
  useReducedMotion,
  precomputedStyles,
} from "@/lib/animation-utils";

// Import project data
import { Project, projects } from "@/data/projects-data";
import LogoLoop from "@/components/ui/logo-loop-optimized";
import Preloader from "@/components/ui/preloader";

export default function AllProjectsPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionRefForInView, isInView] = useOptimizedInView(0.1, "50px");
  const mainControls = useAnimation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Prefetch home page for instant back navigation
  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const handleBackClick = () => {
    setIsTransitioning(true);
    // Immediate navigation with router prefetch for better performance
    router.push("/");
  };

  const handleTransitionComplete = () => {
    // Clean state reset
    setIsTransitioning(false);
  };

  return (
    <section
      ref={sectionRefForInView}
      className="min-h-screen bg-gray-200 dark:bg-neutral-900 transition-colors duration-300 py-20"
      id="all-projects"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <motion.button
            onClick={handleBackClick}
            className="group flex items-center gap-2 text-black dark:text-white mb-8 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: -5 }}
          >
            <IconArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </motion.button>

          <motion.h1
            className="text-4xl md:text-8xl font-bold text-start mb-6 text-neutral-800 dark:text-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            All Projects
          </motion.h1>

          <motion.p
            className="text-lg text-neutral-700 dark:text-gray-300 mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my complete portfolio of projects spanning various
            technologies and domains. Each project represents a unique challenge
            and learning experience in my development journey.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-stretch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projects.map((project: Project, index: number) => (
            <AllProjectCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-white mb-2">
                {projects.length}
              </div>
              <div className="text-neutral-900 dark:text-gray-300">
                Total Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-white mb-2">
                {projects.filter((p: Project) => p.liveUrl).length}
              </div>
              <div className="text-neutral-900 dark:text-gray-300">
                Live Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-white mb-2">
                {new Set(projects.flatMap((p: Project) => p.technologies)).size}
              </div>
              <div className="text-neutral-900 dark:text-gray-300">
                Technologies Used
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preloader */}
      <Preloader
        isLoading={isTransitioning}
        onComplete={handleTransitionComplete}
        type="back"
      />
    </section>
  );
}

// Project Card Component with conditional button rendering
const AllProjectCard = memo(function AllProjectCard({
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

  // Use intersection observer
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

  // Memoize tech icons
  const techIcons = useMemo(
    () =>
      project.technologies.map((tech: string) => {
        const techIcon = getTechIcon(tech);
        return {
          node: techIcon.node,
          title: techIcon.title,
          ariaLabel: techIcon.title,
        };
      }),
    [project.technologies]
  );

  // Animation variants
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
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay: index * 0.1,
      }}
      layout={false}
    >
      {/* Corner decorations */}
      <CornerDecorations />

      {/* Card container */}
      <div className={precomputedStyles.projectCard.border}>
        {/* Project title header */}
        <div className={precomputedStyles.projectCard.header}>
          <h3 className="font-medium tracking-wider text-lg text-neutral-900 dark:text-gray-200 uppercase">
            {project.title}
          </h3>
        </div>

        {/* Image container */}
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
          <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto">
            <h4 className="text-xs uppercase font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Technologies Used:
            </h4>
            <div className="h-[48px] overflow-hidden mb-6">
              <LogoLoop
                logos={techIcons}
                speed={prefersReducedMotion ? 40 : 120}
                direction="left"
                logoHeight={24}
                gap={20}
                pauseOnHover={!prefersReducedMotion}
                fadeOut={!prefersReducedMotion}
                fadeOutColor="transparent"
                ariaLabel={`${project.title} technologies`}
              />
            </div>
          </div>

          {/* Footer section with conditional buttons */}
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
        <IconPlus className="size-6 text-neutral-900 dark:text-neutral-300" />
      </div>
      <div className="absolute -top-3 -right-3 z-10">
        <IconPlus className="size-6 text-neutral-900 dark:text-neutral-300" />
      </div>
      <div className="absolute -bottom-3 -left-3 z-10">
        <IconPlus className="size-6 text-neutral-900 dark:text-neutral-300" />
      </div>
      <div className="absolute -bottom-3 -right-3 z-10">
        <IconPlus className="size-6 text-neutral-900 dark:text-neutral-300" />
      </div>
    </>
  );
});
