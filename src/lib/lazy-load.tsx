"use client";

import {
  lazy,
  ComponentType,
  Suspense,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";

// Type for the loading component props
interface LoadingProps {
  children?: ReactNode;
}

// Default loading component
const DefaultLoading = ({ children }: LoadingProps) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-pulse flex space-x-2">
      <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
      <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
      <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
    </div>
    {children}
  </div>
);

// Simple IntersectionObserver component
interface IntersectionProps {
  children: ReactNode;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

const IntersectionDetector = ({
  children,
  onIntersect,
  rootMargin = "200px",
  threshold = 0.1,
  once = true,
}: IntersectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();

          // If once is true, unobserve after intersection
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onIntersect, rootMargin, threshold, once]);

  return <div ref={ref}>{children}</div>;
};

/**
 * Lazy loads a component with a custom loading component
 *
 * @param importFn - Dynamic import function
 * @param LoadingComponent - Custom loading component (optional)
 * @returns Lazy loaded component wrapped in Suspense
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent: ComponentType<LoadingProps> = DefaultLoading
) {
  const LazyComponent = lazy(importFn);

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Lazy loads a component when scrolled into view
 *
 * @param importFn - Dynamic import function
 * @param LoadingComponent - Custom loading component (optional)
 * @returns Lazy loaded component that only loads when scrolled into view
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoadOnScroll<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent: ComponentType<LoadingProps> = DefaultLoading
) {
  const LazyComponent = lazy(importFn);

  return function LazyLoadedScrollComponent(props: React.ComponentProps<T>) {
    const [shouldLoad, setShouldLoad] = useState(false);

    return (
      <IntersectionDetector onIntersect={() => setShouldLoad(true)}>
        {shouldLoad ? (
          <Suspense fallback={<LoadingComponent />}>
            <LazyComponent {...props} />
          </Suspense>
        ) : (
          <div className="min-h-[200px]">
            <DefaultLoading />
          </div>
        )}
      </IntersectionDetector>
    );
  };
}
