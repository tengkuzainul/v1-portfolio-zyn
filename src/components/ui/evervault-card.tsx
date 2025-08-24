"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  text,
  className,
  aboutText,
  role,
  details,
}: {
  text?: string;
  className?: string;
  aboutText?: string;
  role?: string;
  details?: string[];
}) => {
  return (
    <div
      className={cn(
        "bg-transparent flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div className="w-full relative bg-transparent flex items-center justify-center h-full">
        <div className="relative z-10 flex flex-col items-start justify-center w-full h-full">
          {/* About text content */}
          return (
          <div
            className={cn(
              "bg-transparent flex items-center justify-center w-full h-full relative",
              className
            )}
          >
            <div className="w-full relative bg-transparent flex items-center justify-center h-full">
              <div className="relative z-10 flex flex-col items-start justify-center w-full h-full p-4 sm:p-6 md:p-8">
                {/* About text content */}
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    {role && (
                      <div className="inline-block bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-gray-100 dark:to-gray-400 text-transparent bg-clip-text font-medium text-lg sm:text-xl">
                        {role}
                      </div>
                    )}

                    {aboutText && (
                      <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {aboutText}
                      </motion.h3>
                    )}

                    <div className="space-y-4 pt-4">
                      {details &&
                        details.map((detail, i) => (
                          <motion.p
                            key={i}
                            className="text-base md:text-lg dark:text-gray-300 text-gray-700 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * (i + 1) }}
                          >
                            {detail}
                          </motion.p>
                        ))}
                    </div>
                  </div>

                  {text && (
                    <motion.div
                      className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <p className="dark:text-white/90 text-black/90 text-base md:text-lg italic">
                        {text}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
          );
        </div>
      </div>
    </div>
  );
};

// We've removed the CardPattern and generateRandomString functions as they're no longer needed

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
