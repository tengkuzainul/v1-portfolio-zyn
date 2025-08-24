"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  type?: "opacity" | "scale" | "both" | "slide";
}

/**
 * ScrollReveal - A component that animates its children when they enter the viewport
 * @param children - React children to be animated
 * @param delay - Delay before animation starts in seconds
 * @param duration - Duration of the animation in seconds
 * @param direction - Direction of the animation
 * @param distance - Distance to travel during animation (in pixels)
 * @param once - Whether to animate only once or every time element enters viewport
 * @param className - Additional CSS classes
 * @param threshold - Threshold for intersection observer (0 to 1)
 * @param staggerChildren - Whether to stagger children animations
 * @param staggerDelay - Delay between each child animation in seconds
 * @param type - Type of animation to apply
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
  once = true,
  className = "",
  threshold = 0.1,
  staggerChildren = false,
  staggerDelay = 0.1,
  type = "both",
}: ScrollRevealProps) {
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

  // Define initial and animate states based on direction and type
  const getInitialAndAnimateStates = () => {
    let initial = {};
    let animate = {};

    // Handle opacity
    if (type === "opacity" || type === "both") {
      initial = { ...initial, opacity: 0 };
      animate = { ...animate, opacity: 1 };
    }

    // Handle scale
    if (type === "scale" || type === "both") {
      initial = { ...initial, scale: 0.95 };
      animate = { ...animate, scale: 1 };
    }

    // Handle direction-based movement
    if (direction !== "none" && type !== "opacity") {
      switch (direction) {
        case "up":
          initial = { ...initial, y: distance };
          animate = { ...animate, y: 0 };
          break;
        case "down":
          initial = { ...initial, y: -distance };
          animate = { ...animate, y: 0 };
          break;
        case "left":
          initial = { ...initial, x: distance };
          animate = { ...animate, x: 0 };
          break;
        case "right":
          initial = { ...initial, x: -distance };
          animate = { ...animate, x: 0 };
          break;
      }
    }

    return { initial, animate };
  };

  const { initial, animate } = getInitialAndAnimateStates();

  // Define variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: initial,
    visible: {
      ...animate,
      transition: {
        duration,
      },
    },
  };

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isVisible ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Improved easing function for natural motion
      }}
    >
      {children}
    </motion.div>
  );
}

// Export a child component to use with staggerChildren
export const StaggerItem = ({
  children,
  className = "",
  customVariants = null,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  customVariants?: any;
  duration?: number;
}) => {
  const variants = customVariants || {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
      },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
};
