"use client";

import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { motion } from "framer-motion";
import { useState } from "react";

export function AboutCard() {
  const [isHovered, setIsHovered] = useState(false);

  // Professional content for recruiters and clients
  const role = "Information Systems Graduate & Full-Stack Web Developer";
  const title = "Crafting Exceptional Digital Experiences";
  const details = [
    "BNSP-certified web developer specializing in creating responsive, user-centric web applications that combine functionality with seamless user experience to drive business results.",
    "Technical proficiency in both TALL stack (TailwindCSS, AlpineJS, Laravel, Livewire) and modern React ecosystems (Next.js, TypeScript), enabling me to architect scalable and maintainable web solutions.",
    "My development approach blends creative UI/UX design with systematic implementation following industry-standard SDLC practices, ensuring deliverables that exceed client expectations.",
  ];
  const tagline =
    "Let's transform your vision into elegant digital solutions that engage users and deliver tangible business value.";

  return (
    <div
      className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col w-full mx-auto relative shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute h-8 w-8 -top-4 -left-4 dark:text-neutral-400 text-gray-500 z-20 group">
        <Icon className={`h-full w-full ${isHovered ? "animate-spin" : ""}`} />
      </div>
      <div className="absolute h-8 w-8 -bottom-4 -left-4 dark:text-neutral-400 text-gray-500 z-20 group">
        <Icon className={`h-full w-full ${isHovered ? "animate-spin" : ""}`} />
      </div>
      <div className="absolute h-8 w-8 -top-4 -right-4 dark:text-neutral-400 text-gray-500 z-20 group">
        <Icon className={`h-full w-full ${isHovered ? "animate-spin" : ""}`} />
      </div>
      <div className="absolute h-8 w-8 -bottom-4 -right-4 dark:text-neutral-400 text-gray-500 z-20 group">
        <Icon className={`h-full w-full ${isHovered ? "animate-spin" : ""}`} />
      </div>

      <div className="p-8 md:p-10 lg:p-12">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-gradient-to-r from-neutral-800 to-gray-700 dark:from-neutral-100 dark:to-gray-300 text-transparent bg-clip-text font-medium text-lg">
            {role}
          </div>

          <motion.h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h3>

          <div className="space-y-4 pt-2">
            {details.map((detail, i) => (
              <motion.p
                key={i}
                className="text-base md:text-lg dark:text-gray-300 text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              >
                {detail}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="pt-4 mt-4 border-t border-gray-400/40 dark:border-neutral-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="dark:text-white/90 text-black/90 text-base md:text-lg italic">
              &mdash; {tagline}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
