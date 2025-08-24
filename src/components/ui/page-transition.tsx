"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = "",
  duration = 0.5,
  delay = 0.1,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
