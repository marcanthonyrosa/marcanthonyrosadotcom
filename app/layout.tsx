import type { Metadata } from "next";
import { Inter, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
  weight: ["600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marcrosa.com"),
  title: {
    default: "Marc Rosa — Full-Stack Product Creator | Sugo AI (Houston, TX)",
    template: "%s · Marc Rosa",
  },
  description:
    "Houston-based full-stack product creator and founder of Sugo AI, a product development studio helping traditional companies bring AI to market. Previously Head of Product at Thread, Twilio/Zipwhip, Tempus AI, Getty Images.",
  applicationName: "Marc Anthony Rosa",
  authors: [{ name: "Marc Anthony Rosa", url: "https://marcrosa.com" }],
  creator: "Marc Anthony Rosa",
  publisher: "Marc Anthony Rosa",
  keywords: [
    "Marc Rosa",
    "Marc Anthony Rosa",
    "Marc Rosa product",
    "Marc Rosa Houston",
    "Marc Rosa tech",
    "Marc Rosa Head of Product",
    "Marc Rosa Thread",
    "Marc Rosa Twilio",
    "Marc Rosa Zipwhip",
    "Marc Rosa Sugo",
    "Sugo AI",
    "Houston product leader",
    "Houston tech",
    "fractional product leader Houston",
    "product strategy",
    "full-stack product creator",
    "AI product studio",
    "Sugo AI Houston",
  ],
  alternates: {
    canonical: "https://marcrosa.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marcrosa.com",
    siteName: "Marc Anthony Rosa",
    title: "Marc Anthony Rosa — Full-Stack Product Creator | Sugo AI (Houston, TX)",
    description:
      "Full-stack product creator. I run Sugo AI, a studio helping traditional companies bring AI to market. Previously Head of Product at Thread.",
    images: [
      {
        url: "/headshot-v2.jpeg",
        width: 1200,
        height: 1200,
        alt: "Marc Anthony Rosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Anthony Rosa — Full-Stack Product Creator (Houston, TX)",
    description:
      "Houston-based full-stack product creator and founder of Sugo AI. Bringing AI to market for traditional companies. Previously Thread.",
    images: ["/headshot-v2.jpeg"],
    creator: "@marcanthonyrosa",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Person schema for "Marc Rosa" / "Marc Anthony Rosa" name search,
          // plus Houston locality and product/tech signals.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://marcrosa.com/#person",
              name: "Marc Anthony Rosa",
              alternateName: ["Marc Rosa", "Marc A. Rosa"],
              givenName: "Marc",
              additionalName: "Anthony",
              familyName: "Rosa",
              url: "https://marcrosa.com",
              image: "https://marcrosa.com/headshot-v2.jpeg",
              jobTitle: "Full-Stack Product Creator",
              description:
                "Houston-based full-stack product creator and founder of Sugo AI. Bringing AI to market for traditional companies. Previously Thread, Twilio/Zipwhip, Tempus AI, Getty Images, Buffer.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Houston",
                addressRegion: "TX",
                addressCountry: "US",
              },
              homeLocation: {
                "@type": "Place",
                name: "Houston, Texas",
              },
              worksFor: {
                "@type": "Organization",
                name: "Sugo AI",
                url: "https://sugoai.com",
              },
              knowsAbout: [
                "Product Management",
                "Product Strategy",
                "Product Leadership",
                "SaaS",
                "B2B Software",
                "AI Products",
                "Startups",
                "Houston Tech",
              ],
              sameAs: [
                "https://www.linkedin.com/in/marcanthonyrosa",
                "https://twitter.com/marcanthonyrosa",
                "https://github.com/marcanthonyrosa",
                "https://sugoai.com",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://marcrosa.com/#website",
              url: "https://marcrosa.com",
              name: "Marc Anthony Rosa",
              description:
                "Personal site of Marc Anthony Rosa — Houston-based full-stack product creator and founder of Sugo AI.",
              inLanguage: "en-US",
              publisher: { "@id": "https://marcrosa.com/#person" },
            }),
          }}
        />
      </head>
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
