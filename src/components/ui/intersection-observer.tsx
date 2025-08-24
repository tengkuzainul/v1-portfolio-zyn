"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionProps {
  children: ReactNode;
  options?: IntersectionObserverOptions;
  onIntersect?: () => void;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that wraps children and only renders them when they enter the viewport
 */
export const IntersectionObserver: React.FC<IntersectionProps> = ({
  children,
  options = {
    rootMargin: "0px",
    threshold: 0.1,
  },
  onIntersect,
  once = true,
  className = "",
  style = {},
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasIntersected(true);

        if (onIntersect) {
          onIntersect();
        }

        // If once is true, unobserve after intersection
        if (once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else {
        // Only update state if we're not using "once" mode
        if (!once) {
          setIsIntersecting(false);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, options, onIntersect]);

  return (
    <div ref={ref} className={className} style={style}>
      {isIntersecting || hasIntersected ? children : null}
    </div>
  );
};
