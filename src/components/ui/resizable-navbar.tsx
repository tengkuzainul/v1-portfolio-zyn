"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  // Create a spring-based animation value for smoother transitions
  const scrollYProgress = useTransform(scrollY, [0, 100], [0, 1], {
    clamp: false,
  });

  // Use spring physics for smoother animation
  const springConfig = { stiffness: 400, damping: 25 };
  const animatedScrollYProgress = useSpring(scrollYProgress, springConfig);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      // Changed to fixed to prevent overlap with content
      className={cn("fixed inset-x-0 top-5 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{
                visible?: boolean;
                animatedScrollYProgress?: MotionValue<number>;
              }>,
              { visible, animatedScrollYProgress }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible,
  animatedScrollYProgress,
}: NavBodyProps & { animatedScrollYProgress?: MotionValue<number> }) => {
  // Create default motion values if none are provided
  const defaultScrollProgress = useMotionValue(0);
  const scrollProgress = animatedScrollYProgress || defaultScrollProgress;

  // Dynamic styles based on scroll progress
  const backdropBlur = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    ["blur(0px)", "blur(5px)", "blur(10px)"]
  );

  const backgroundOpacity = useTransform(scrollProgress, [0, 1], [0, 0.8]);

  const navWidth = useTransform(scrollProgress, [0, 1], ["100%", "50%"]);

  const navYOffset = useTransform(scrollProgress, [0, 1], [0, 20]);

  const navScale = useTransform(scrollProgress, [0, 1], [1, 0.95]);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      }}
      style={{
        minWidth: "800px",
        backdropFilter: backdropBlur,
        y: navYOffset,
        width: navWidth,
        scale: navScale,
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
      }}
      className={cn(
        "relative z-[100] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent transition-colors duration-300",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      <div className="w-full flex flex-row items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-3 text-sm font-medium text-zinc-600 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={`nav-item-${idx}`}
          initial={{ opacity: 0, y: -15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut",
              delay: 0.1 + idx * 0.05,
            },
          }}
          className="nav-item-container isolate"
        >
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={`relative px-4 py-2.5 inline-block transition-colors duration-200 ${
              hovered === idx
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-600 dark:text-neutral-300"
            }`}
            key={`link-${idx}`}
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                key={`hover-bg-${idx}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            <span className="relative z-20 font-medium">{item.name}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-gray-200 dark:bg-neutral-950",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
            y: -20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
            scale: 1,
            transition: {
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth motion
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            y: -10,
            scale: 0.95,
            transition: {
              duration: 0.2,
              ease: [0.36, 0, 0.66, -0.56], // Quick exit animation
            },
          }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 origin-top rounded-lg bg-white overflow-hidden px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className
          )}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              staggerChildren: 0.07,
              delayChildren: 0.1,
            }}
          >
            {Array.isArray(children) ? (
              children.map((child, index) => (
                <motion.div
                  key={`menu-child-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: 0.05 * index,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  {child}
                </motion.div>
              ))
            ) : (
              <motion.div>{children}</motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className="relative h-6 w-6 cursor-pointer"
      onClick={onClick}
      initial={false}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <IconMenu2 className="text-black dark:text-white" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconX className="text-black dark:text-white" />
      </motion.div>
    </motion.div>
  );
};

export const NavbarLogo = () => {
  return (
    <motion.a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div className="flex items-center space-x-2">
        <motion.span
          className="text-3xl font-bold text-black dark:text-white"
          animate={{ y: [0, -1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        >
          Zyn &mdash;
        </motion.span>
        <motion.span
          className="font-semibold text-black dark:text-white"
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Portfolio
        </motion.span>
      </motion.div>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  disabled = false,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  disabled?: boolean;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer inline-block text-center overflow-hidden";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  // Instead of using motion components that might share context,
  // we'll use standard elements with CSS transitions for the button
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Tag
      href={disabled ? undefined : href || undefined}
      className={cn(
        baseStyles,
        variantStyles[variant],
        className,
        "transition-all duration-300",
        isHovered && !disabled && "transform -translate-y-1 shadow-lg",
        isPressed && !disabled && "transform scale-95",
        disabled && "opacity-70 cursor-not-allowed"
      )}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => !disabled && setIsPressed(false)}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-20 flex items-center justify-center">
        {children}
      </span>

      {isHovered && !disabled && (
        <div className="absolute inset-0 w-full h-full bg-black/5 dark:bg-white/10" />
      )}
    </Tag>
  );
};
