"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import {
  IconFileCv,
  IconFidgetSpinner,
  IconAlertCircle,
} from "@tabler/icons-react";

interface NavBarProps {
  children?: React.ReactNode;
}

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
  onClose: () => void;
}

// Toast notification component with improved animation
const Toast = ({ message, type, visible, onClose }: ToastProps) => {
  // Get icons based on toast type
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  // Define styles based on type
  const styles = {
    success: {
      bg: "bg-white dark:bg-gray-800",
      border: "border-l-4 border-green-500",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500 dark:text-green-400",
      text: "text-gray-800 dark:text-gray-200",
    },
    error: {
      bg: "bg-white dark:bg-gray-800",
      border: "border-l-4 border-red-500",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500 dark:text-red-400",
      text: "text-gray-800 dark:text-gray-200",
    },
    info: {
      bg: "bg-white dark:bg-gray-800",
      border: "border-l-4 border-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500 dark:text-blue-400",
      text: "text-gray-800 dark:text-gray-200",
    },
  };

  const style = styles[type];

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
          <div className="w-full max-w-sm px-4">
            <motion.div
              initial={{ opacity: 0, y: -100, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                },
              }}
              exit={{
                opacity: 0,
                y: -50,
                scale: 0.95,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              className={`${style.bg} ${style.border} pointer-events-auto flex items-center p-4 shadow-lg rounded-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transform-gpu`}
              role="alert"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: 0.1,
                  },
                }}
                className={`flex-shrink-0 ${style.iconColor} p-2 rounded-full ${style.iconBg}`}
              >
                {getIcon()}
              </motion.div>

              <div className="ml-3 flex-1">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: 0.2,
                      duration: 0.3,
                    },
                  }}
                  className={`font-medium ${style.text}`}
                >
                  {message}
                </motion.p>
              </div>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.85 }}
                onClick={onClose}
                className="ml-4 text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export function NavBar({ children }: NavBarProps) {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Skills",
      link: "#skills",
    },
    {
      name: "Projects",
      link: "#projects",
    },
  ];

  const [activeSection, setActiveSection] = useState<string>("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // States for CV download
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  // Function to check if a nav item is active
  const isActiveSection = (sectionId: string) => {
    return activeSection === sectionId;
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId.replace("#", "");
    const section = document.getElementById(targetId);

    if (section) {
      console.log(`Scrolling to section: ${targetId}`);
      // Add offset to account for fixed navbar
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    } else {
      console.error(
        `Element with id "${targetId}" not found when trying to scroll`
      );
    }
  };

  // Track section visibility with improved sensitivity
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.link.replace("#", ""));

    // Keep track of sections and their visibility percentages
    const visibleSections = new Map<string, number>();

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;

        // Calculate visibility percentage (how much of the section is visible)
        const visiblePercentage = entry.intersectionRatio;

        if (visiblePercentage > 0) {
          visibleSections.set(id, visiblePercentage);
        } else {
          visibleSections.delete(id);
        }

        // Find the section with the highest visibility
        if (visibleSections.size > 0) {
          let maxVisibility = 0;
          let mostVisibleSection = "";

          visibleSections.forEach((percentage, sectionId) => {
            if (percentage > maxVisibility) {
              maxVisibility = percentage;
              mostVisibleSection = sectionId;
            }
          });

          setActiveSection(`#${mostVisibleSection}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Element with id "${id}" not found in the DOM`);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [navItems]);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const getButtonVariant = () => (theme === "dark" ? "primary" : "dark");

  // Function to download CV securely via API route
  const handleDownloadCV = async () => {
    const fileName = "tengku_zainul_resume.pdf";
    try {
      setIsDownloading(true);

      // Use the secure API route to get the CV file
      const response = await fetch(`/api/downloads?filename=${fileName}`);

      if (!response.ok) {
        // Handle error responses from the API
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download CV");
      }

      // Get the file blob from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a hidden link element
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      // Append to body, click to trigger download, then clean up
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the blob URL to free up memory
      window.URL.revokeObjectURL(url);

      // Success notification
      setToast({
        visible: true,
        message: "CV downloaded successfully! Thank you for your interest.",
        type: "success",
      });

      // Hide the notification after 4 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 4000);
    } catch (error) {
      console.error("Error downloading CV:", error);

      // Error notification
      setToast({
        visible: true,
        message:
          "Sorry, couldn't download CV. Please try again or contact me directly.",
        type: "error",
      });

      // Hide the notification after 4 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 4000);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative w-full">
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
      {!isProjectsPage && (
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <motion.div
              onMouseLeave={() => setHovered(null)}
              className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 lg:flex lg:space-x-2"
            >
              {navItems.map((item, idx) => {
                const active = isActiveSection(item.link);
                return (
                  <a
                    key={`nav-item-${idx}`}
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.link);
                    }}
                    onMouseEnter={() => setHovered(idx)}
                    className={`relative px-4 py-2 cursor-pointer block transition-all duration-300 ${
                      active
                        ? "font-semibold text-gray-200 dark:text-neutral-900"
                        : "text-neutral-600 dark:text-gray-200"
                    }`}
                  >
                    {hovered === idx && !active && (
                      <motion.div
                        layoutId="hovered"
                        className="absolute inset-0 h-full w-full rounded-full bg-gray-300 dark:bg-neutral-800"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      />
                    )}
                    {active && (
                      <motion.div
                        className="absolute inset-0 h-full w-full rounded-full bg-neutral-900 dark:bg-gray-200"
                        layoutId="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                          mass: 0.8,
                        }}
                      />
                    )}
                    <motion.span
                      className="relative z-20"
                      animate={{ scale: active ? 1.05 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  </a>
                );
              })}
            </motion.div>
            <div className="flex items-center gap-2">
              <div className="nav-button-container">
                <NavbarButton
                  variant={getButtonVariant()}
                  className="flex items-center gap-3 select-none"
                  onClick={handleDownloadCV}
                  as="button"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4"
                        >
                          <IconFidgetSpinner size={16} stroke={1.5} />
                        </motion.div>
                        Downloading...
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <IconFileCv stroke={1.5} className="size-5" /> {""}
                      Download My CV
                    </>
                  )}
                </NavbarButton>
              </div>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => {
                const active = isActiveSection(item.link);
                return (
                  <motion.a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      scrollToSection(item.link);
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className={`relative py-3 px-4 w-full flex items-center cursor-pointer rounded-md transition-all duration-300 ${
                      active
                        ? "font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800"
                        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    {/* Blue indicator removed */}
                    <motion.span
                      className="block ml-2 text-lg"
                      whileTap={{ scale: 0.97 }}
                    >
                      {item.name}
                    </motion.span>
                  </motion.a>
                );
              })}
              <div className="flex w-full flex-col gap-4 mt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <NavbarButton
                    onClick={(e: React.MouseEvent) => {
                      setIsMobileMenuOpen(false);
                      !isDownloading && handleDownloadCV();
                    }}
                    variant={getButtonVariant()}
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 justify-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4"
                        >
                          <IconFidgetSpinner size={16} stroke={1.5} />
                        </motion.div>
                        Downloading...
                      </motion.div>
                    ) : (
                      <>
                        <motion.span
                          initial={{ x: -5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Download My CV
                        </motion.span>
                        <motion.span
                          initial={{ x: 5, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <IconFileCv stroke={1.5} />
                        </motion.span>
                      </>
                    )}
                  </NavbarButton>
                </motion.div>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      )}

      {/* Page Content */}
      <div className={isProjectsPage ? "" : "pt-16"}>{children}</div>
    </div>
  );
}
