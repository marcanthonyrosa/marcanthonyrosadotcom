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
    default: "Marc Rosa — Head of Product (Houston, TX)",
    template: "%s · Marc Rosa",
  },
  description:
    "Marc Anthony Rosa is a Houston-based product leader and tech founder. Head of Product, former Thread, Twilio/Zipwhip, Tempus AI, Getty Images. Writing on product strategy, leadership, and the craft of building.",
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
    "Sugo Product Company",
    "Houston product leader",
    "Houston tech",
    "fractional product leader Houston",
    "product strategy",
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
    title: "Marc Anthony Rosa — Head of Product (Houston, TX)",
    description:
      "Houston-based product leader and tech founder. Head of Product at Thread, formerly Twilio/Zipwhip, Tempus AI, Getty Images, Buffer.",
    images: [
      {
        url: "/headshot.png?v=2",
        width: 1200,
        height: 1200,
        alt: "Marc Anthony Rosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Anthony Rosa — Head of Product (Houston, TX)",
    description:
      "Houston-based product leader and tech founder. Head of Product at Thread, formerly Twilio/Zipwhip, Tempus AI.",
    images: ["/headshot.png?v=2"],
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
              image: "https://marcrosa.com/headshot.png?v=2",
              jobTitle: "Head of Product",
              description:
                "Houston-based product leader and tech founder. Head of Product, formerly Thread, Twilio/Zipwhip, Tempus AI, Getty Images, Buffer.",
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
                name: "Sugo Product Company",
                url: "https://sugoproduct.com",
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
                "https://sugoproduct.com",
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
                "Personal site of Marc Anthony Rosa — Houston-based Head of Product and tech founder.",
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
