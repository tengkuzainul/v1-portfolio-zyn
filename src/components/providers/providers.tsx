"use client";

import { ReactNode } from "react";
import SmoothScrollProvider from "./smooth-scroll-provider";
import { NavigationProvider } from "./navigation-provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <NavigationProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </NavigationProvider>
  );
}
