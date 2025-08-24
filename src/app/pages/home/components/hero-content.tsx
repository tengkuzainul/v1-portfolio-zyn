"use client";

import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { WordRotate } from "@/components/ui/word-rotate";
import { ShinyButton } from "@/components/ui/shiny-button";
import SocialIcons from "@/app/components/social-icons";

interface HeroContentProps {
  passions: string[];
}

export default function HeroContent({ passions }: HeroContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      {/* Social links - visible on mobile at top, with animation */}
      <div className="social-icons-mobile md:hidden w-full flex justify-center mb-6 opacity-0">
        <SocialIcons />
      </div>

      {/* Fixed position social icons - only visible on desktop */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden md:block">
        <SocialIcons />
      </div>

      {/* Text content - centered */}
      <div className="hello-text opacity-0">
        <div className="flex justify-center">
          <ShinyButton className="bg-gray-100/80 dark:bg-neutral-800/80 font-medium rounded-full shadow-sm border-gray-200 dark:border-neutral-700 px-4 py-1.5 text-gray-600 dark:text-gray-400">
            Hello, I'm
          </ShinyButton>
        </div>
      </div>

      <h1 className="name-text text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-800 dark:text-gray-200 opacity-0 leading-tight px-4 sm:px-0">
        <motion.span
          initial={false}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="inline-block"
        >
          Tengku Muhammad
        </motion.span>{" "}
        <br className="block" />
        <motion.span
          initial={false}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-gray-100 dark:to-gray-400"
        >
          Zainul Aprilizar
        </motion.span>
      </h1>

      <div className="role-text relative text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 opacity-0 mb-2">
        <div className="flex items-center justify-center">
          <span className="inline-block mr-2">I am a</span>
          <div className="inline-block">
            <WordRotate
              words={passions}
              duration={3000}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="text-neutral-800 dark:text-gray-200 font-bold text-xl sm:text-2xl md:text-3xl m-0"
            />
          </div>
        </div>
      </div>

      <p className="desc-text text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl opacity-0 leading-relaxed">
        Certified Junior Web Developer By BNSP And Passionate About Creating
        Responsive And User-Friendly Web Applications With Modern Technologies.
      </p>

      <div className="buttons flex flex-wrap gap-5 justify-center opacity-0">
        <motion.a
          href="#about"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3.5 bg-neutral-800 text-gray-200 font-medium rounded-xl shadow-lg hover:bg-neutral-700 dark:bg-gray-200 dark:text-neutral-800 dark:hover:bg-gray-300 transition-all duration-300 flex items-center gap-2 group"
        >
          About Me{" "}
          <motion.span className="overflow-hidden flex items-center ml-1">
            <IconArrowRight
              stroke={1.5}
              className="transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-45"
            />
          </motion.span>
        </motion.a>

        <motion.a
          href="#project"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-3.5 bg-white text-neutral-800 font-medium rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700 dark:hover:bg-neutral-700 transition-all duration-300 flex items-center gap-2 group"
        >
          Contact Me{" "}
          <motion.span className="overflow-hidden flex items-center ml-1">
            <IconArrowRight
              stroke={1.5}
              className="transform transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-45"
            />
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
}
