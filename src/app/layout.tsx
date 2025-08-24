import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { NavBar } from "./components/navbar";
import Providers from "@/components/providers/providers";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/components/web-vitals";

const manrope = Manrope({
  variable: "--font-geist-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tengku M Zainul A • Full Stack Web Developer Portfolio",
  description:
    "Full Stack Web Developer specializing in React, Next.js, TypeScript, and modern web technologies. View my projects, skills, and professional experience.",
  keywords: [
    "web developer",
    "full stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "Tengku Zainul",
  ],
  authors: [{ name: "Tengku M Zainul A" }],
  creator: "Tengku M Zainul A",
  publisher: "Tengku M Zainul A",
  robots: "index, follow",
  metadataBase: new URL("https://tengkuzainul.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tengkuzainul.me",
    siteName: "Tengku Zainul Portfolio",
    title: "Tengku M Zainul A • Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Tengku Zainul Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tengku M Zainul A • Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/api/og"],
    creator: "@tengkuzainul",
  },
  alternates: {
    canonical: "/",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased bg-gray-200 dark:bg-neutral-900`}
      >
        <Providers>
          <NavBar>{children}</NavBar>
          <div className="fixed bottom-4 right-4 z-[9999]">
            <AnimatedThemeToggler className="text-gray-200 bg-neutral-900 dark:text-neutral-900 dark:bg-gray-200 rounded-full p-3" />
          </div>
          {/* Social icons now moved to home-section.tsx */}
          <WebVitals />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
