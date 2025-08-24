"use client";

import { useReportWebVitals } from "next/web-vitals";

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    const { id, name, label, value } = metric;

    // Use `window.gtag` if you initialized Google Analytics
    if (typeof window.gtag === "function") {
      window.gtag("event", name, {
        event_category:
          label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        value: Math.round(name === "CLS" ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
      });
    }

    // Log to console during development
    if (process.env.NODE_ENV === "development") {
      console.log(`Web Vital: ${name}`, metric);
    }

    // Send to Vercel Analytics if available
    if (metric.name === "FCP") {
      // First Contentful Paint
    } else if (metric.name === "LCP") {
      // Largest Contentful Paint
    } else if (metric.name === "CLS") {
      // Cumulative Layout Shift
    } else if (metric.name === "FID") {
      // First Input Delay
    } else if (metric.name === "TTFB") {
      // Time to First Byte
    }
  });

  return null;
}
