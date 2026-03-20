import type { Metadata } from "next";
import { Hanken_Grotesk, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageview } from "@/components/PostHogPageview";
import { Suspense } from "react";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${hankenGrotesk.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable} antialiased`}>
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
