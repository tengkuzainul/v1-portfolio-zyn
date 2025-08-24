"use client";

import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { WordRotate } from "../../../components/ui/word-rotate";
import { ShinyButton } from "../../../components/ui/shiny-button";
import SocialIcons from "../../components/social-icons";
import { useEffect, useState } from "react";

interface HeroContentProps {
  passions: string[];
}

const HeroContent = ({ passions }: HeroContentProps) => {
  // Add a state to track client-side rendering
  const [isMounted, setIsMounted] = useState(false);

  // Only enable animations after component has mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      {/* Social links - horizontal on mobile at top, with animation */}
      <motion.div
        className="md:hidden w-full flex justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SocialIcons />
      </motion.div>

      {/* Fixed position social icons - vertical on desktop (left sidebar) */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden md:block">
        <SocialIcons />
      </div>

      {/* Text content - centered */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-center">
          <ShinyButton className="bg-gray-100/80 dark:bg-neutral-800/80 font-medium rounded-full shadow-sm border-gray-200 dark:border-neutral-700 px-4 py-1.5 text-gray-600 dark:text-gray-400">
            Hello, I&apos;m
          </ShinyButton>
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-800 dark:text-gray-200 leading-tight px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.span
          initial={false}
          whileHover={isMounted ? { scale: 1.02 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="inline-block select-none"
        >
          Tengku Muhammad
        </motion.span>{" "}
        <br className="block" />
        <motion.span
          initial={false}
          whileHover={isMounted ? { scale: 1.02 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-gray-100 dark:to-gray-400 select-none"
        >
          Zainul Aprilizar
        </motion.span>
      </motion.h1>

      <motion.div
        className="relative text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 mb-2"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-center">
          <span className="inline-block mr-2">I am a</span>
          <div className="inline-block">
            <WordRotate
              words={passions}
              duration={3000}
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: isMounted
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="text-neutral-800 dark:text-gray-200 font-bold text-xl sm:text-2xl md:text-3xl m-0 select-none"
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Certified Junior Web Developer By BNSP And Passionate About Creating
        Responsive And User-Friendly Web Applications With Modern Technologies.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-5 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
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
      </motion.div>
    </div>
  );
};

export default HeroContent;
