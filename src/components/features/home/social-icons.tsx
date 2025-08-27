"use client";

import { motion } from "framer-motion";

export default function SocialIcons() {
  return (
    <div className="social-icons flex flex-row md:flex-col gap-3.5 items-center group animate-fade-in relative z-10">
      {/* Container for hover effects and grouping - vertical on desktop, horizontal on mobile */}
      <motion.a
        href="https://github.com/tengkuzainul"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="social-icon text-neutral-700 hover:text-neutral-200 dark:text-gray-300  dark:hover:text-neutral-950 opacity-80 hover:opacity-100 bg-white/80 dark:bg-neutral-800/80 p-2.5 rounded-full shadow-md backdrop-blur-sm hover:bg-gradient-to-r hover:from-neutral-800 hover:to-neutral-950 dark:hover:from-neutral-200 dark:hover:to-neutral-300 hover:border hover:border-gray-200 dark:hover:border-neutral-300 transition-all duration-500 ease-in-out"
        aria-label="GitHub Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
      </motion.a>
      <motion.a
        href="https://linkedin.com/in/tengkuzainull"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="social-icon transition-all duration-300 ease-in-out text-neutral-700 hover:text-neutral-200 dark:text-gray-300 dark:hover:text-white opacity-80 hover:opacity-100 bg-white/80 dark:bg-neutral-800/80 p-2.5 rounded-full shadow-md backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:border hover:border-gray-200 dark:hover:border-neutral-700"
        aria-label="LinkedIn Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 11l0 5" />
          <path d="M8 8l0 .01" />
          <path d="M12 16l0 -5" />
          <path d="M16 16v-3a2 2 0 0 0 -4 0" />
        </svg>
      </motion.a>
      <motion.a
        href="https://instagram.com/tengkumz_"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        className="social-icon transition-all duration-300 ease-in-out text-neutral-700 hover:text-neutral-200 dark:text-gray-300 dark:hover:text-white opacity-80 hover:opacity-100 bg-white/80 dark:bg-neutral-800/80 p-2.5 rounded-full shadow-md backdrop-blur-sm hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-500 dark:hover:from-rose-500 dark:hover:to-rose-600 hover:border hover:border-gray-200 dark:hover:border-neutral-700"
        aria-label="Instagram Profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M16.5 7.5v.01" />
        </svg>
      </motion.a>
    </div>
  );
}
