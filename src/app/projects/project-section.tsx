"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
// Remove the NavigationProvider import temporarily
import {
  IconBrandGithub,
  IconExternalLink,
  IconPlus,
  IconArrowRight,
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
import LogoLoop from "@/components/ui/logo-loop";

// Import project data from shared file
import { Project, projects } from "./projects-data";

export function ProjectSection({ loaded = true }: { loaded?: boolean }) {
  // Use router directly instead of the NavigationProvider for now
  const router =
    typeof window !== "undefined"
      ? { push: (path: string) => (window.location.href = path) }
      : null;

  // Function to handle navigation with animation
  const handleShowMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Simple navigation without animation
    if (router) {
      router.push("/projects");
    }
  };

  // Corner plus icon component
  const CornerPlus = ({ className = "" }: { className?: string }) => (
    <IconPlus className={`size-6 text-black dark:text-white ${className}`} />
  );

  // Map technology strings to their respective Tabler icons
  const getTechIcon = (tech: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      React: <IconBrandReact size={24} stroke={1.5} />,
      "Next.js": <IconBrandNextjs size={24} stroke={1.5} />,
      TypeScript: <IconBrandTypescript size={24} stroke={1.5} />,
      "Tailwind CSS": <IconBrandTailwind size={24} stroke={1.5} />,
      "Framer Motion": <IconBrandFramer size={24} stroke={1.5} />,
      "Node.js": <IconBrandNodejs size={24} stroke={1.5} />,
      Express: <IconServer size={24} stroke={1.5} />,
      MongoDB: <IconDatabase size={24} stroke={1.5} />,
      Laravel: <IconBrandLaravel size={24} stroke={1.5} />,
      MySQL: <IconSql size={24} stroke={1.5} />,
      "Alpine.js": <IconBrandAlpineJs size={24} stroke={1.5} />,
      "Socket.io": <IconPlugConnected size={24} stroke={1.5} />,
      "Chart.js": <IconChartBar size={24} stroke={1.5} />,
      Livewire: <IconBrandLivewire size={24} stroke={1.5} />,
    };

    return {
      node: iconMap[tech] || tech,
      title: tech,
      href:
        tech === "React"
          ? "https://react.dev"
          : tech === "Next.js"
          ? "https://nextjs.org"
          : tech === "TypeScript"
          ? "https://www.typescriptlang.org"
          : tech === "Tailwind CSS"
          ? "https://tailwindcss.com"
          : tech === "Framer Motion"
          ? "https://www.framer.com/motion"
          : undefined,
    };
  };

  // Use ref and inView to control animations based on scroll position
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const mainControls = useAnimation();

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

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
        <motion.h2
          className="text-3xl md:text-8xl font-bold text-start mb-10 text-black dark:text-white"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Recent Projects
        </motion.h2>

        <motion.p
          className="text-lg text-black dark:text-white mb-12 max-w-3xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Here are some of my recent projects that showcase my skills and
          experience in web development. Each project reflects different aspects
          of my technical abilities and problem-solving approach.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={mainControls}
        >
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-black dark:text-white overflow-hidden border-2 border-black dark:border-white"
            onClick={handleShowMoreClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-black dark:bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            <motion.span className="relative flex items-center gap-2 transition-colors duration-300 ease-in-out group-hover:text-white dark:group-hover:text-black">
              Show More
              <IconArrowRight
                stroke={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Separate ProjectCard component for better organization
function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (cardInView && isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [cardInView, isInView, controls]);

  // Corner plus icon component
  const CornerPlus = ({ className = "" }: { className?: string }) => (
    <IconPlus className={`size-6 text-black dark:text-white ${className}`} />
  );

  // Map technology strings to their respective Tabler icons
  const getTechIcon = (tech: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      React: <IconBrandReact size={24} stroke={1.5} />,
      "Next.js": <IconBrandNextjs size={24} stroke={1.5} />,
      TypeScript: <IconBrandTypescript size={24} stroke={1.5} />,
      "Tailwind CSS": <IconBrandTailwind size={24} stroke={1.5} />,
      "Framer Motion": <IconBrandFramer size={24} stroke={1.5} />,
      "Node.js": <IconBrandNodejs size={24} stroke={1.5} />,
      Express: <IconServer size={24} stroke={1.5} />,
      MongoDB: <IconDatabase size={24} stroke={1.5} />,
      Laravel: <IconBrandLaravel size={24} stroke={1.5} />,
      MySQL: <IconSql size={24} stroke={1.5} />,
      "Alpine.js": <IconBrandAlpineJs size={24} stroke={1.5} />,
      "Socket.io": <IconPlugConnected size={24} stroke={1.5} />,
      "Chart.js": <IconChartBar size={24} stroke={1.5} />,
      Livewire: <IconBrandLivewire size={24} stroke={1.5} />,
    };

    return {
      node: iconMap[tech] || tech,
      title: tech,
      href:
        tech === "React"
          ? "https://react.dev"
          : tech === "Next.js"
          ? "https://nextjs.org"
          : tech === "TypeScript"
          ? "https://www.typescriptlang.org"
          : tech === "Tailwind CSS"
          ? "https://tailwindcss.com"
          : tech === "Framer Motion"
          ? "https://www.framer.com/motion"
          : undefined,
    };
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.15,
      }}
    >
      {/* Corner plus icons with staggered animation */}
      <motion.div
        className="absolute -top-3 -left-3 z-10"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.4 + index * 0.15,
          type: "spring",
        }}
      >
        <CornerPlus />
      </motion.div>
      <motion.div
        className="absolute -top-3 -right-3 z-10"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.15,
          type: "spring",
        }}
      >
        <CornerPlus />
      </motion.div>
      <motion.div
        className="absolute -bottom-3 -left-3 z-10"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.6 + index * 0.15,
          type: "spring",
        }}
      >
        <CornerPlus />
      </motion.div>
      <motion.div
        className="absolute -bottom-3 -right-3 z-10"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          duration: 0.4,
          delay: 0.7 + index * 0.15,
          type: "spring",
        }}
      >
        <CornerPlus />
      </motion.div>

      {/* Card container with border */}
      <div className="flex flex-col border-[1.5px] border-black dark:border-white">
        {/* Project title header with staggered animation */}
        <motion.div
          className="py-3 px-4 border-b-[1.5px] border-black dark:border-white"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{
            duration: 0.4,
            delay: 0.3 + index * 0.15,
          }}
        >
          <h3 className="font-medium tracking-wider text-lg text-black dark:text-white uppercase">
            {project.title}
          </h3>
        </motion.div>

        {/* Image container with laptop mockup style and staggered animation */}
        <motion.div
          className="relative bg-transparent dark:bg-transparent p-0 overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{
            duration: 0.6,
            delay: 0.4 + index * 0.15,
          }}
        >
          <div className="overflow-hidden">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-[280px] object-cover object-center"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { scale: 1.2, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.15,
              }}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        </motion.div>

        {/* Project details section with staggered animation */}
        <motion.div
          className="p-6 flex flex-col bg-transparent dark:bg-transparent"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{
            duration: 0.4,
            delay: 0.6 + index * 0.15,
          }}
        >
          <motion.p
            className="text-black dark:text-white mb-6 text-sm leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.7 + index * 0.15,
            }}
          >
            {project.description}
          </motion.p>

          <motion.div
            className="mt-auto"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.8 + index * 0.15,
            }}
          >
            <h4 className="text-xs uppercase font-semibold text-black dark:text-white mb-2">
              Technologies Used:
            </h4>
            <div className="h-[48px] overflow-hidden mb-6">
              <LogoLoop
                logos={project.technologies.map((tech) => getTechIcon(tech))}
                speed={80}
                direction="left"
                logoHeight={24}
                gap={24}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="transparent"
                ariaLabel={`${project.title} technologies`}
              />
            </div>
          </motion.div>

          {/* Footer with project ID and view button */}
          <motion.div
            className="flex items-center justify-between mt-2 pt-4 border-t-[1.5px] border-black dark:border-white"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.9 + index * 0.15,
            }}
          >
            <div className="text-xs text-black dark:text-white font-mono font-bold">
              {project.id}
            </div>
            <motion.a
              href={project.liveUrl || project.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-black dark:text-white group/link"
              whileHover={{ x: 3 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              LIHAT
              <IconArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                stroke={2.5}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
