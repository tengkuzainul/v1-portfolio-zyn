"use client";

import { motion } from "framer-motion";
import React from "react";
import ScrollReveal, {
  StaggerItem,
} from "@/components/animation/scroll-reveal";

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
    <section id="skills" className="relative w-full">
      <ScrollReveal
        className="mt-12 w-full"
        delay={0.2}
        direction="up"
        distance={20}
      >
        <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-gray-200">
          Skills & Expertise
        </h3>

        <ScrollReveal staggerChildren staggerDelay={0.1} className="space-y-4">
          {skills.map((skill, index) => (
            <StaggerItem key={skill.name}>
              <SkillBar skill={skill} index={index} />
            </StaggerItem>
          ))}
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
};

const SkillBar = ({ skill, index }: { skill: SkillProps; index: number }) => {
  // State for the animated percentage counter
  const [percentage, setPercentage] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);
  const barRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  // Animate percentage counter when in view
  React.useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const duration = 1000; // sync with progress bar duration (1s)

      // Calculate current percentage based on time elapsed
      const currentPercentage = Math.min(
        Math.floor((progress / duration) * skill.level),
        skill.level
      );

      setPercentage(currentPercentage);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animateCounter);
      }
    };

    animationFrame = requestAnimationFrame(animateCounter);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, skill.level]);

  return (
    <div className="relative" ref={barRef}>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-sm text-neutral-700 dark:text-gray-300">
          {skill.name}
        </span>
        <motion.span
          className="text-xs text-neutral-600 dark:text-gray-400"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isInView ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {isInView ? percentage : 0}%
        </motion.span>
      </div>

      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: isInView ? `${skill.level}%` : "0%" }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};
