import type { Metadata } from "next";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/Sidebar";
import { JohnnyBanner } from "@/components/JohnnyBanner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageview } from "@/components/PostHogPageview";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["700"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}>
        <PostHogProvider>
          <Providers>
            <Suspense>
              <PostHogPageview />
            </Suspense>
            <JohnnyBanner />
            <Sidebar />
            <main className="min-h-screen pt-14 min-[750px]:pt-0">
              {children}
            </main>
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
