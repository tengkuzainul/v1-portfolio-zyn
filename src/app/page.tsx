import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load components
const HomeSection = dynamic(() => import("./pages/home/home-section"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main
      className="flex flex-col w-full overflow-hidden"
      style={{ position: "relative" }}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            </div>
          </div>
        }
      >
        <HomeSection />
      </Suspense>
      {/* Add other sections here as needed */}
      {/* <AboutSection />
      <SkillsSection />
      <ProjectSection />
      <ContactSection /> */}
    </main>
  );
}
