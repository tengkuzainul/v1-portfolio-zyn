"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  type?: "loading" | "back";
  className?: string;
}

export default function Preloader({
  isLoading,
  onComplete,
  type = "loading",
  className,
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setIsComplete(false);

      // Animation duration: 2 seconds total
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Give time for user to see completion animation before hiding
            setTimeout(() => {
              setIsComplete(true);
            }, 300); // Brief delay to show completion state
            return 100;
          }
          // Progress increments for 2s total duration
          return prev + 2.5; // Will complete in 40 intervals (40 * 50ms = 2000ms)
        });
      }, 50); // Smooth 50ms interval

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Separate useEffect to handle completion callback
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={cn(
            "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
            className
          )}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.1, ease: "easeOut" },
            opacity: { duration: 0.3, delay: 0.2 },
          }}
          style={{
            transformOrigin: "left center",
          }}
        />
      )}
    </AnimatePresence>
  );
}
