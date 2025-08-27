"use client";

import TextType from "@/components/reactbits/TextType/TextType";
import { motion } from "framer-motion";
import React from "react";

const AboutText = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <TextType
          text={[
            "Hello",
            "A short story about myself",
            "Let's, get to know me",
          ]}
          typingSpeed={120}
          pauseDuration={2000}
          deletingSpeed={90}
          showCursor={true}
          cursorCharacter="•"
          className="text-3xl md:text-8xl font-bold text-start mb-4 text-neutral-800 dark:text-gray-200"
        />
      </motion.div>

      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        A passionate web developer with a keen eye for design and user
        experience.
      </motion.p>

      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {["Web Developer", "UI Designer", "Problem Solver"].map(
          (tag, index) => (
            <motion.span
              key={tag}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-neutral-800 rounded-full text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            >
              {tag}
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
};

export default AboutText;
