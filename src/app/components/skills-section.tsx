"use client";

import { motion } from "framer-motion";
import React from "react";

interface SkillProps {
  name: string;
  level: number; // 0-100
}

const skills: SkillProps[] = [
  { name: "HTML", level: 100 },
  { name: "CSS / Tailwind", level: 95 },
  { name: "PHP / Laravel", level: 90 },
  { name: "MySQL", level: 90 },
  { name: "Javascript", level: 70 },
  { name: "ReactJS / NextJS", level: 60 },
];

export const SkillsSection = ({ loaded }: { loaded: boolean }) => {
  return (
    <motion.div
      className="mt-12 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      id="skills"
    >
      <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-gray-200">
        Skills & Expertise
      </h3>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={index}
            loaded={loaded}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillBar = ({
  skill,
  index,
  loaded,
}: {
  skill: SkillProps;
  index: number;
  loaded: boolean;
}) => {
  return (
    <div className="relative">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-sm text-neutral-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-xs text-neutral-600 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>

      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500"
          initial={{ width: 0 }}
          animate={loaded ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: 0.8 + index * 0.1,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};
