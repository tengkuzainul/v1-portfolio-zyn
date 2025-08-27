"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";

export type LogoItem =
  | {
      node: React.ReactNode;
      href?: string;
      title?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      href?: string;
      title?: string;
      srcSet?: string;
      sizes?: string;
      width?: number;
      height?: number;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

// Optimized ResizeObserver hook with throttling
const useOptimizedResizeObserver = (
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
) => {
  const throttledCallback = useCallback(() => {
    // Throttle untuk mengurangi frequency
    let ticking = false;
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  }, [callback]);

  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => throttledCallback();
      window.addEventListener("resize", handleResize, { passive: true });
      throttledCallback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(throttledCallback);
      observer.observe(ref.current);
      return observer;
    });

    throttledCallback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

// Optimized Logo component dengan memo
const OptimizedLogoItem = memo(function LogoItem({
  logo,
  logoHeight,
  scaleOnHover,
}: {
  logo: LogoItem;
  logoHeight: number;
  scaleOnHover?: boolean;
}) {
  const isNode = "node" in logo;

  if (isNode) {
    return (
      <div
        className={cx(
          "flex-shrink-0 flex items-center justify-center",
          scaleOnHover && "transition-transform hover:scale-110"
        )}
        style={{ height: logoHeight }}
        title={logo.title}
        aria-label={logo.ariaLabel || logo.title}
      >
        {logo.href ? (
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            {logo.node}
          </a>
        ) : (
          logo.node
        )}
      </div>
    );
  }

  return (
    <div
      className={cx(
        "flex-shrink-0",
        scaleOnHover && "transition-transform hover:scale-110"
      )}
      style={{ height: logoHeight }}
    >
      {logo.href ? (
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          title={logo.title}
        >
          <img
            src={logo.src}
            alt={logo.alt || logo.title || "Logo"}
            style={{
              height: logoHeight,
              width: "auto",
              objectFit: "contain",
            }}
            loading="lazy" // Lazy loading untuk performa
            decoding="async" // Async decoding
          />
        </a>
      ) : (
        <img
          src={logo.src}
          alt={logo.alt || logo.title || "Logo"}
          style={{
            height: logoHeight,
            width: "auto",
            objectFit: "contain",
          }}
          loading="lazy"
          decoding="async"
          title={logo.title}
        />
      )}
    </div>
  );
});

const LogoLoop: React.FC<LogoLoopProps> = memo(function LogoLoop({
  logos,
  speed = 120, // Increased default speed for faster movement
  direction = "left",
  width = "100%",
  logoHeight = 32,
  gap = 32,
  pauseOnHover = false,
  fadeOut = false,
  fadeOutColor = "white",
  scaleOnHover = false,
  ariaLabel,
  className,
  style,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [seqWidth, setSeqWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Memoize calculated values
  const { numCopies, animationDuration } = useMemo(() => {
    if (containerWidth === 0 || seqWidth === 0) {
      return { numCopies: ANIMATION_CONFIG.MIN_COPIES, animationDuration: 0 };
    }

    const rawCopies =
      Math.ceil(containerWidth / seqWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
    const copies = Math.max(rawCopies, ANIMATION_CONFIG.MIN_COPIES);
    // Optimized duration calculation for smoother animation
    const duration = (seqWidth / speed) * 0.8; // Reduced multiplier for faster movement

    return { numCopies: copies, animationDuration: duration };
  }, [containerWidth, seqWidth, speed]);

  // Optimized dimension calculation
  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const seq = seqRef.current;

    if (!container || !seq) return;

    const containerRect = container.getBoundingClientRect();
    const seqRect = seq.getBoundingClientRect();

    setContainerWidth(containerRect.width);
    setSeqWidth(seqRect.width);
  }, []);

  // Use optimized resize observer
  useOptimizedResizeObserver(
    updateDimensions,
    [containerRef, seqRef],
    [logos, logoHeight, gap]
  );

  // Memoize logo elements
  const logoElements = useMemo(
    () =>
      logos.map((logo, index) => (
        <li key={index} style={{ marginRight: gap }}>
          <OptimizedLogoItem
            logo={logo}
            logoHeight={logoHeight}
            scaleOnHover={scaleOnHover}
          />
        </li>
      )),
    [logos, gap, logoHeight, scaleOnHover]
  );

  // Animation styles - Fix CSS property conflict and optimize performance
  const animationStyle = useMemo(() => {
    if (animationDuration === 0) return {};

    // Use longhand properties instead of shorthand to avoid conflicts
    return {
      animationName: `logoLoop-${direction}`,
      animationDuration: `${animationDuration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationPlayState: pauseOnHover && isPaused ? "paused" : "running",
      willChange: "transform", // Optimize for animation performance
      transform: "translateZ(0)", // Force hardware acceleration
    };
  }, [animationDuration, direction, pauseOnHover, isPaused]);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <>
      {/* Inject CSS animations only when needed */}
      {animationDuration > 0 && (
        <style jsx>{`
          @keyframes logoLoop-left {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-${seqWidth}px);
            }
          }
          @keyframes logoLoop-right {
            from {
              transform: translateX(-${seqWidth}px);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      )}

      <div
        ref={containerRef}
        className={cx("relative overflow-hidden", className)}
        style={{
          width: toCssLength(width),
          height: toCssLength(logoHeight),
          ...style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        role="marquee"
      >
        {/* Fade out gradients */}
        {fadeOut && (
          <>
            <div
              className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
              }}
            />
          </>
        )}

        {/* Logo sequence */}
        <div className="flex" style={animationStyle}>
          {Array.from({ length: numCopies }, (_, copyIndex) => (
            <ul
              key={copyIndex}
              ref={copyIndex === 0 ? seqRef : null}
              className="flex list-none p-0 m-0 flex-shrink-0"
              style={{ marginRight: copyIndex === numCopies - 1 ? 0 : gap }}
            >
              {logoElements}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
});

export default LogoLoop;
