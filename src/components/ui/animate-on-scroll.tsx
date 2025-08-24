"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation:
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "zoomIn"
    | "bounce"
    | "rotate";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation,
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  // Define variants for different animations
  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 },
    },
  };

  const selectedVariant = variants[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={
        animation === "bounce"
          ? {
              duration,
              delay,
              type: "spring",
              stiffness: 300,
              damping: 10,
            }
          : {
              duration,
              delay,
              ease: "easeOut",
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
