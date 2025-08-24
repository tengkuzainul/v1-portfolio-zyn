"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface NavigationContextType {
  loading: boolean;
  loadingMessage: string;
  navigateTo: (path: string, message?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const router = useRouter();

  const navigateTo = (path: string, message: string = "Loading...") => {
    setLoading(true);
    setLoadingMessage(message);

    // Simulate a loading state for a smoother transition
    setTimeout(() => {
      router.push(path);

      // Reset loading state after navigation
      setTimeout(() => {
        setLoading(false);
        setLoadingMessage("");
      }, 500); // Small delay after navigation to ensure smooth transition
    }, 300);
  };

  return (
    <NavigationContext.Provider value={{ loading, loadingMessage, navigateTo }}>
      {/* Optional loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center text-white transition-all">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-lg font-medium">{loadingMessage}</p>
          </div>
        </div>
      )}
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
