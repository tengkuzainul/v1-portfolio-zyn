"use client";

import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { WordRotate } from "@/components/ui/word-rotate";
import { ShinyButton } from "@/components/ui/shiny-button";
import SocialIcons from "@/app/components/social-icons";
import ScrollReveal, {
  StaggerItem,
} from "@/components/animation/scroll-reveal";

interface HeroContentProps {
  passions: string[];
}

export default function HeroContent({ passions }: HeroContentProps) {
  return (
    <ScrollReveal
      staggerChildren
      staggerDelay={0.15}
      once={true}
      threshold={0.2}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      {/* Social links - visible on mobile at top, with animation */}
      <StaggerItem className="social-icons-mobile md:hidden w-full flex justify-center mb-6">
        <SocialIcons />
      </StaggerItem>

      {/* Fixed position social icons - only visible on desktop */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden md:block">
        <SocialIcons />
      </div>

      {/* Text content - centered */}
      <StaggerItem>
        <div className="flex justify-center">
          <ShinyButton className="bg-gray-100/80 dark:bg-neutral-800/80 font-medium rounded-full shadow-sm border-gray-200 dark:border-neutral-700 px-4 py-1.5 text-gray-600 dark:text-gray-400">
            Hello, I'm
          </ShinyButton>
        </div>
      </StaggerItem>

      <StaggerItem>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-800 dark:text-gray-200 leading-tight px-4 sm:px-0">
          <motion.span
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            Tengku Muhammad
          </motion.span>{" "}
          <br className="block" />
          <motion.span
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-gray-100 dark:to-gray-400"
          >
            Zainul Arifin
          </motion.span>
        </h1>
      </StaggerItem>

      <StaggerItem>
        <div className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-gray-400 mt-2 flex flex-col sm:flex-row justify-center items-center sm:space-x-2">
          <span>I am a</span>
          <WordRotate words={passions} />
        </div>
      </StaggerItem>

      <StaggerItem>
        <p className="text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Certified Junior Web Developer By BNSP And Passionate About Creating
          Responsive And User-Friendly Web Applications With Modern
          Technologies.
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="#about"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-neutral-800 dark:bg-gray-200 text-white dark:text-neutral-900 px-6 py-3 rounded-lg font-medium inline-flex items-center group"
          >
            About Me
            <IconArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </motion.a>

          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gray-200 dark:bg-neutral-800 text-neutral-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium"
          >
            View Projects
          </motion.a>
        </div>
      </StaggerItem>
    </ScrollReveal>
  );
}
