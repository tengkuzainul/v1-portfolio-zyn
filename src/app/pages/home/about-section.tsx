"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AboutCard } from "@/app/components/about-card";
import { SkillsSection } from "@/app/components/skills-section";
import TimelineSections from "@/app/components/timeline-section";
import AboutText from "@/app/components/about-text";

const AboutSection = () => {
  const [loaded, setLoaded] = useState(false);

  // Simulates the component being loaded when it becomes visible
  useEffect(() => {
    setLoaded(true);
    console.log("About section loaded via lazy loading!");
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-20">
      <div className="container mx-auto px-4 max-w-sm md:max-w-xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-8xl">
        <motion.h2
          className="text-3xl md:text-2xl font-bold text-start mb-10 text-neutral-800 dark:text-gray-200 my-5"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="about"
        >
          <AboutText />
        </motion.h2>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <AboutCard />
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <TimelineSections />
        </motion.div>

        <SkillsSection loaded={loaded} />
      </div>
    </div>
  );
};

export default AboutSection;
