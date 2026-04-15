import Link from "next/link";
import type { Metadata } from "next";
import { SocialLinks } from "@/components/SocialLinks";
import { AvatarButton } from "@/components/AvatarButton";

export const metadata: Metadata = {
  title: "Marc Anthony Rosa - Head of Product (Houston, TX)",
  description:
    "Marc Anthony Rosa is a Houston-based Head of Product and tech founder. Previously Thread, Twilio/Zipwhip, Tempus AI, Getty Images. Writing on product strategy, leadership, and the craft of building.",
  alternates: { canonical: "https://marcrosa.com/" },
  openGraph: {
    title: "Marc Anthony Rosa - Head of Product (Houston, TX)",
    description:
      "Houston-based Head of Product and tech founder. Writing on product strategy, leadership, and the craft of building.",
    url: "https://marcrosa.com/",
  },
};

const POSTS_BY_YEAR: Record<string, { slug: string; title: string; date: string }[]> = {
  "2026": [
    { slug: "after-9-months-of-development", title: "After 9 months of development", date: "March 6, 2026" },
    { slug: "fixed-a-bug-at-the-car-wash", title: "Fixed a bug at the car wash", date: "March 2, 2026" },
    { slug: "stop-shipping-fast", title: "Stop shipping fast. Make it actually hold up.", date: "February 12, 2026" },
    { slug: "your-market-will-show-you", title: "Your market will show you the right one", date: "February 10, 2026" },
  ],
};

const FEATURED_WORK = [
  {
    title: "Scaling a B2B product from 0 to 10k customers",
    tags: ["Product Strategy", "Growth", "B2B"],
    description:
      "Led product for a vertical SaaS platform from early beta to Series B. Rebuilt pricing, repositioned for mid-market, and cut time-to-value by 60%.",
  },
  {
    title: "Consumer app redesign · 4.2 → 4.8 App Store rating",
    tags: ["Consumer", "Redesign", "Mobile"],
    description:
      "Owned a ground-up redesign of a consumer iOS app while maintaining weekly releases. Improved retention D7 by 34% and D30 by 22%.",
  },
  {
    title: "Internal tooling that shipped to 500 enterprise teams",
    tags: ["Enterprise", "Tooling", "Platform"],
    description:
      "What started as a skunkworks project to solve an internal pain point became a standalone product line generating $2M ARR.",
  },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-16">
        <h1
          className="font-semibold mb-2 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
        >
          Marc Rosa
        </h1>
        <p
          className="mb-6 font-medium"
          style={{ color: "var(--text-2)", fontSize: "1.25rem" }}
        >
          Head of Product
        </p>
        <AvatarButton />
        <div className="prose max-w-none">
          <p>
            I help early products grow into enduring companies.
          </p>
          <p>
            Most recently, I was Head of Product at <a href="https://getthread.com/" target="_blank" rel="noopener noreferrer">Thread</a>. We turned a single product into an AI-native platform - growing revenue 10x, raising a Series A, and becoming category leader for MSPs.
          </p>
          <p>
            Before that, I led product at Zipwhip leading to its <a href="https://www.twilio.com/en-us/press/releases/twilio-completes-acquisition-of-zipwhip-a-leading-provider-of-toll-free-messaging-in-the-united-states" target="_blank" rel="noopener noreferrer">acquisition by Twilio</a>.
          </p>
          <p>
            I build <strong>Opinionated Software</strong> - purpose-built tools with a clear point of view - that are resilient enough to scale and endearing enough to love.
          </p>
        </div>

        <SocialLinks />
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-14" />

      {/* ── Writing ── */}
      <div className="flex items-center justify-between mb-7">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-3)" }}
        >
          Recent Writing
        </h2>
        <Link
          href="/writing"
          className="text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          All posts →
        </Link>
      </div>
      <div className="flex flex-col gap-12 mb-16">
        {Object.keys(POSTS_BY_YEAR).sort((a, b) => Number(b) - Number(a)).map((year) => (
          <section key={year}>
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--text-3)" }}
            >
              {year}
            </h2>
            <ul className="flex flex-col gap-2">
              {POSTS_BY_YEAR[year].map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="flex items-center gap-4 rounded-md -mx-2 px-2 py-2 transition-colors hover:bg-[var(--nav-item-hover)]"
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      className="leading-snug flex-1 min-w-0"
                      style={{ color: "var(--text-1)", fontSize: "1.1rem" }}
                    >
                      {post.title}
                    </span>
                    <span
                      className="tabular-nums shrink-0"
                      style={{
                        color: "var(--text-3)",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {post.date.split(",")[0]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {process.env.NODE_ENV === "development" && (
        <hr style={{ borderColor: "var(--border)" }} className="mb-14" />
      )}

      {/* ── Featured Work (dev only) ── */}
      {process.env.NODE_ENV === "development" && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-7">
            <h2
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-3)" }}
            >
              Selected Work
            </h2>
            <Link
              href="/work"
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              All case studies →
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {FEATURED_WORK.map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded font-medium"
                      style={{
                        background: "var(--tag-bg)",
                        color: "var(--tag-text)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-semibold mb-2 leading-snug"
                  style={{ color: "var(--text-1)", fontSize: "1.075rem" }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text-2)", fontSize: "1rem" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
