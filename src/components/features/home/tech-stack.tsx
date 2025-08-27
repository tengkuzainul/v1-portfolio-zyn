"use client";

import { motion } from "motion/react";
import { IconCode } from "@tabler/icons-react";

interface TechStackProps {
  techStack: Array<{
    name: string;
    icon: React.ElementType;
    delay: number;
  }>;
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="mt-10 w-full max-w-3xl">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="tech-stack-title text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-5"
      >
        Tech Stack
      </motion.h3>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 group/tech">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tech.delay, duration: 0.5 }}
            className="tech-item bg-white dark:bg-neutral-800 px-5 py-3 rounded-xl shadow-sm flex items-center space-x-2.5 border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 group-hover/tech:opacity-50 group-hover/tech:blur-[1px] hover:!opacity-100 hover:!blur-none"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              y: -5,
              zIndex: 10,
              borderColor: "rgba(59, 130, 246, 0.5)",
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            <motion.span
              className="text-neutral-950 dark:text-gray-200"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
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
      </div>
    </div>
  );
}
