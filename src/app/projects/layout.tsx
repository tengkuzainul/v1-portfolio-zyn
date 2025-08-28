import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-neutral-900">
      {children}
    </main>
  );
}
