"use client";

import { ReactNode } from "react";
import SmoothScrollProvider from "./smooth-scroll-provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
