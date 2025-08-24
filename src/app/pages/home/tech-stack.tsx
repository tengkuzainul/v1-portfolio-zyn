"use client";

import { motion } from "framer-motion";
import { IconCode } from "@tabler/icons-react";
import { TechStackItem } from "./components";
import { useEffect, useState } from "react";

interface TechStackProps {
  techStack: TechStackItem[];
}

const TechStack = ({ techStack }: TechStackProps) => {
  // Use a state to control client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  // Handle animations after mount
  useEffect(() => {
    // Short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsMounted(true);
      console.log("Tech Stack loaded via lazy loading!");
    }, 300);

    return () => clearTimeout(timer);
  }, []); // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      <h3
        className={`text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-5 text-center transition-opacity duration-500 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        Tech Stack
      </h3>
      <motion.div
        className="flex flex-wrap justify-center gap-3 sm:gap-4 group/tech"
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        variants={containerVariants}
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="tech-item bg-white dark:bg-neutral-800 px-5 py-3 rounded-xl shadow-sm flex items-center space-x-2.5 group-hover/tech:opacity-50 group-hover/tech:blur-[1px] hover:!opacity-100 hover:!blur-none transition-all duration-300"
            variants={itemVariants}
            custom={index}
            whileHover={
              isMounted
                ? {
                    scale: 1.08,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    y: -5,
                    zIndex: 10,
                    borderColor: "rgba(59, 130, 246, 0.5)",
                  }
                : undefined
            }
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-neutral-950 dark:text-gray-200"
              initial={false} // Disable initial animation
              whileHover={
                isMounted ? { rotate: [0, -10, 10, -10, 0] } : undefined
              }
              transition={{ duration: 0.5 }}
            >
              {tech.icon ? (
                <tech.icon size={22} strokeWidth={2} />
              ) : (
                <IconCode size={22} strokeWidth={2} />
              )}
            </motion.span>
            <span className="font-medium text-neutral-800 dark:text-gray-200">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
