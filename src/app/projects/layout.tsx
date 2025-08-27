import { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">{children}</main>
  );
}
