"use client";

import { motion } from "framer-motion";
import {
  IconBrandLaravel,
  IconBrandTailwind,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandLivewire,
  IconBrandAlpineJs,
  IconBrandPhp,
  IconBrandMysql,
  IconBrandJavascript,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { LazyHeroContent, LazyTechStack } from "./components";
import { lazyLoadOnScroll } from "@/lib/lazy-load";
import AboutSection from "./about-section";
import { ProjectSection } from "@/app/projects/project-section";

// Lazy load the about section when scrolled into view
const LazyAboutSection = lazyLoadOnScroll(() => import("./about-section"));

const HomeSection = () => {
  // No longer need animation sequence control
  // since animations are now handled within components

  // Array of passions/roles for the morphing text
  const passions = [
    "Junior Web Developer",
    "Full Stack Developer",
    "Programmer",
    "Tech Enthusiast",
  ];

  // Tech stack items with icons and animation delays
  const techStack = [
    { name: "PHP", icon: IconBrandPhp, delay: 0 },
    { name: "TailwindCSS", icon: IconBrandTailwind, delay: 0.1 },
    { name: "AlpineJS", icon: IconBrandAlpineJs, delay: 0.2 },
    { name: "Laravel", icon: IconBrandLaravel, delay: 0.3 },
    { name: "Livewire", icon: IconBrandLivewire, delay: 0.4 },
    { name: "MySQL", icon: IconBrandMysql, delay: 0.5 },
    { name: "Javascript", icon: IconBrandJavascript, delay: 0.6 },
    { name: "React", icon: IconBrandReact, delay: 0.7 },
    { name: "Next.js", icon: IconBrandNextjs, delay: 0.8 },
  ];

  // We're no longer using class-based animation sequence
  // since we're now handling animations with React state in the components
  useEffect(() => {
    // No console logs needed
  }, []);

  return (
    <>
      <section
        id="home"
        className="min-h-[90vh] w-full flex flex-col justify-center items-center relative overflow-hidden py-5 md:py-10"
        style={{ position: "relative" }}
      >
        {/* Main content container - centered */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Hero content with improved animations */}
          <LazyHeroContent passions={passions} />
        </div>

        {/* Tech stack in a separate centered container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center mt-8">
          <div className="w-full max-w-4xl">
            {/* Lazy loaded tech stack */}
            <LazyTechStack techStack={techStack} />
          </div>
        </div>
      </section>
      {/* Use the eager-loaded AboutSection for guaranteed rendering */}
      <AboutSection />

      {/* Projects Section with staggered animations */}
      <ProjectSection />
    </>
  );
};

export default HomeSection;
