"use client";
import { useScroll, useTransform, motion } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const TimelineItems = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const [loaded, setLoaded] = useState(false);

  // Simulates the component being loaded when it becomes visible
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full pt-12 mt-10" ref={containerRef}>
      <div className="mx-auto">
        <motion.h2
          className="text-3xl md:text-8xl font-bold text-start mb-3 md:mb-7 text-neutral-800 dark:text-gray-200 my-5"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="timeline"
        >
          My Journey
        </motion.h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-2xl leading-relaxed mb-3">
          My professional journey through education and experience in web
          development and growth opportunities that have shaped my expertise.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-black to-gray-600 dark:from-white dark:to-gray-300 border border-neutral-300 dark:border-neutral-700" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-800 dark:text-neutral-200">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-300 dark:via-neutral-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-black via-gray-600 to-transparent from-[0%] via-[10%] rounded-full dark:from-white dark:via-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
