import type { Metadata } from "next";
import { Public_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageview } from "@/components/PostHogPageview";
import { Suspense } from "react";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Marc Anthony Rosa",
    template: "%s · Marc Anthony Rosa",
  },
  description:
    "Head of Product. Building products people love. Writing about product strategy, team leadership, and the craft of building.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marcanthonyrosa.com",
    siteName: "Marc Anthony Rosa",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <PostHogProvider>
          <Providers>
            <Suspense>
              <PostHogPageview />
            </Suspense>
            {children}
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
