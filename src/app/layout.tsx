import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { NavBar } from "@/components/layout/navbar";
import Providers from "@/components/providers/providers";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/components/web-vitals";

const manrope = Manrope({
  variable: "--font-geist-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

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
  icons: {
    icon: [
      { url: "/images/favicon/16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon/64x64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/images/favicon/128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      { url: "/images/favicon/32x32.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
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
