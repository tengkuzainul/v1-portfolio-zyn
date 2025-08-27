"use client";

import React, { useEffect } from "react";
import { AboutCard } from "@/components/features/about/about-card";
import { SkillsSection } from "@/components/features/about/skills-section";
import TimelineSections from "@/components/features/about/timeline-section";
import AboutText from "@/components/features/about/about-text";
import ScrollReveal, {
  StaggerItem,
} from "@/components/animation/scroll-reveal";

const AboutSection = () => {
  // Remove console.log from production
  useEffect(() => {
    // No console logs for production
  }, []);

  return (
    <div
      id="about"
      className="min-h-screen relative overflow-hidden py-20"
      style={{ position: "relative" }}
    >
      <div className="container mx-auto px-4 max-w-sm md:max-w-xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-8xl">
        <ScrollReveal delay={0.2} duration={0.5} direction="up" distance={20}>
          <h2 className="text-3xl md:text-2xl font-bold text-start mb-10 text-neutral-800 dark:text-gray-200 my-5">
            <AboutText />
          </h2>
        </ScrollReveal>

        {/* AboutCard now has its own internal animations */}
        <div className="w-full">
          <AboutCard />
        </div>

        <ScrollReveal delay={0.3} duration={0.5} direction="up" distance={20}>
          <div className="mt-10">
            <TimelineSections />
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <SkillsSection loaded={true} />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
