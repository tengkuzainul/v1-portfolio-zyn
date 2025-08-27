// Custom hook untuk lazy loading images
import { useState, useEffect, useRef } from "react";

export const useLazyImage = (src: string, threshold = 0.1) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement

  useEffect(() => {
    const element = imgRef.current;
    if (!element || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [src, threshold]);

  useEffect(() => {
    if (!imageSrc || !src) return;

    // Reset states when starting to load new image
    setIsLoaded(false);
    setIsError(false);

    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };
    img.src = imageSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, src]);

  return {
    imgRef,
    imageSrc: isIntersecting ? imageSrc : null,
    isLoaded,
    isError,
    isIntersecting,
  };
};

// CSS-in-JS styles untuk menghindari runtime CSS generation
export const precomputedStyles = {
  projectCard: {
    base: "relative group h-full", // Added h-full for consistent height
    border:
      "flex flex-col border-[1.5px] border-black dark:border-white h-full", // Added h-full
    header: "py-3 px-4 border-b-[1.5px] border-black dark:border-white",
    imageContainer: "relative bg-transparent overflow-hidden",
    image: "w-full h-[320px] object-cover object-center", // Reduced height for consistency
    content: "p-6 flex flex-col bg-transparent flex-grow", // Added flex-grow
    footer:
      "flex items-center justify-between mt-auto pt-4 border-t-[1.5px] border-black dark:border-white", // Added mt-auto
  },
  cornerIcon: {
    base: "absolute z-10",
    positions: {
      topLeft: "-top-3 -left-3",
      topRight: "-top-3 -right-3",
      bottomLeft: "-bottom-3 -left-3",
      bottomRight: "-bottom-3 -right-3",
    },
  },
  animations: {
    reduced: {
      duration: 0.3,
      ease: "easeOut",
    },
    normal: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

// Utility untuk detectar reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

// Will-change utility untuk mengoptimalkan animasi
export const useWillChange = (isAnimating: boolean) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isAnimating) {
      element.style.willChange = "transform, opacity";
    } else {
      element.style.willChange = "auto";
    }

    return () => {
      if (element) {
        element.style.willChange = "auto";
      }
    };
  }, [isAnimating]);

  return ref;
};
