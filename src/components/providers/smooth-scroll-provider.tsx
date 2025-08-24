"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div
      className="relative w-full h-full min-h-screen"
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}
