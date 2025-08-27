"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  type?: "loading" | "back";
}

export default function Preloader({
  isLoading,
  onComplete,
  type = "loading",
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setIsComplete(false);

      // Fast loader animation that completes in 600ms for better UX
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Quick completion for smooth SPA experience
            setTimeout(() => {
              setIsComplete(true);
            }, 100);
            return 100;
          }
          // Fast progress increments for 600ms total duration
          return prev + 8.33; // Will complete in 12 intervals (12 * 50ms = 600ms)
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
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{
          duration: 0.12,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        }}
      >
        {/* Main Content Container */}
        <div className="flex flex-col items-center space-y-5">
          {/* Logo Container - Matching the image design */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Logo Background - White rounded square */}
            <motion.div
              className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.01, 1],
              }}
              transition={{
                rotate: { duration: 1.8, ease: "linear", repeat: Infinity },
                scale: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
              }}
            >
              {/* TZ Logo - Exactly like in the image */}
              <div className="text-black text-lg font-bold tracking-tight">
                TZ
              </div>
            </motion.div>

            {/* Subtle pulsing ring */}
            <motion.div
              className="absolute inset-0 border border-white/15 rounded-lg"
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Text Content - Matching the image exactly */}
          <motion.div
            className="text-center max-w-sm px-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <h1 className="text-white text-sm font-normal leading-relaxed">
              Tengku Muhammad Zainul Aprilizar
            </h1>
            <div className="flex items-center justify-center my-1.5">
              <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
            <p className="text-white text-xs font-light">
              Full Stack Web Developer Portfolio
            </p>
          </motion.div>

          {/* Minimal Loading Indicator */}
          <motion.div
            className="text-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            {/* Simple loading dots */}
            <div className="flex items-center justify-center space-x-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 h-0.5 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            {/* Status text */}
            <motion.p
              className="text-white/30 text-xs mt-2 font-light"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {type === "back" ? "Returning..." : "Loading..."}
            </motion.p>
          </motion.div>
        </div>

        {/* Smooth background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-70 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
