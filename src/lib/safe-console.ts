"use client";

/**
 * Safe logging utility to handle console logs properly
 * - In production: only critical errors are logged
 * - In development: all logs are shown
 * This helps prevent exposing sensitive information or debugging details in production
 */

// Detect if we're in development environment
const isDev = process.env.NODE_ENV === "development";

/**
 * Safe console functions that only log in development or when forced
 */
const safeConsole = {
  // Only logs in development
  log: (message?: unknown, ...optionalParams: unknown[]) => {
    if (isDev) {
      console.log(message, ...optionalParams);
    }
  },

  // Only logs in development
  info: (message?: unknown, ...optionalParams: unknown[]) => {
    if (isDev) {
      console.info(message, ...optionalParams);
    }
  },

  // Only logs in development
  debug: (message?: unknown, ...optionalParams: unknown[]) => {
    if (isDev) {
      console.debug(message, ...optionalParams);
    }
  },

  // Warnings are shown in development, suppressed in production
  warn: (message?: unknown, ...optionalParams: unknown[]) => {
    if (isDev) {
      console.warn(message, ...optionalParams);
    }
  },

  // Errors are always logged (for critical issues)
  error: (message?: unknown, ...optionalParams: unknown[]) => {
    console.error(message, ...optionalParams);
  },

  // Force a log even in production (use sparingly)
  forceLog: (message?: unknown, ...optionalParams: unknown[]) => {
    console.log(message, ...optionalParams);
  },
};

export default safeConsole;
