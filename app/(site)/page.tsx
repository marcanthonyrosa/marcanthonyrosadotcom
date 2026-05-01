import Link from "next/link";
import type { Metadata } from "next";
import { SocialLinks } from "@/components/SocialLinks";
import { AvatarButton } from "@/components/AvatarButton";

export const metadata: Metadata = {
  title: "Marc Rosa - Head of Product (Houston, TX)",
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

const RECENT_POSTS = [
  { slug: "after-9-months-of-development", title: "After 9 months of development", date: "March 6, 2026" },
  { slug: "fixed-a-bug-at-the-car-wash", title: "Fixed a bug at the car wash", date: "March 2, 2026" },
  { slug: "stop-shipping-fast", title: "Stop shipping fast. Make it actually hold up.", date: "February 12, 2026" },
  { slug: "your-market-will-show-you", title: "Your market will show you the right one", date: "February 10, 2026" },
].slice(0, 3);

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
        <div className="flex items-start gap-4 mb-8">
          <AvatarButton size={57} className="mt-[3px]" />
          <div className="min-w-0">
            <h1
              className="font-bold tracking-tight leading-none"
              style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
            >
              Marc Rosa
            </h1>
            <p
              className="font-medium mt-2.5 leading-none"
              style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
            >
              Head of Product
            </p>
          </div>
        </div>
        <div className="prose max-w-none">
          <p>
            I turn products that work into companies that last.
          </p>
          <p>
            Most recently, I was Head of Product at <a href="https://getthread.com/" target="_blank" rel="noopener noreferrer">Thread</a>. We turned a feature with traction into the category-leading AI Inbox for MSPs — 10x revenue growth.
          </p>
          <p>
            Earlier, I shipped messaging product at Zipwhip through its <a href="https://www.twilio.com/en-us/press/releases/twilio-completes-acquisition-of-zipwhip-a-leading-provider-of-toll-free-messaging-in-the-united-states" target="_blank" rel="noopener noreferrer">acquisition by Twilio</a>.
          </p>
          <p>
            I believe in opinionated software: purpose-built tools with a clear point of view, resilient enough to scale and delightful enough to use every day.
          </p>
        </div>

        <SocialLinks />
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-14" />

      {/* ── Writing ── */}
      <div className="flex items-center justify-between mb-7">
        <h2
          className="font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
        >
          Recent Writing
        </h2>
        <Link
          href="/writing"
          className="transition-opacity hover:opacity-70"
          style={{ color: "var(--text-2)", fontSize: "var(--text-micro)" }}
        >
          All posts →
        </Link>
      </div>
      <ul className="flex flex-col gap-2 mb-16">
        {RECENT_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="flex items-center gap-4 rounded-md -mx-2 px-2 py-2 transition-colors hover:bg-[var(--nav-item-hover)]"
              style={{ textDecoration: "none" }}
            >
              <span
                className="leading-snug flex-1 min-w-0"
                style={{ color: "var(--text-1)", fontSize: "var(--text-h2)" }}
              >
                {post.title}
              </span>
              <span
                className="tabular-nums shrink-0"
                style={{
                  color: "var(--text-3)",
                  fontSize: "var(--text-small)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {post.date.split(",")[0]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {process.env.NODE_ENV === "development" && (
        <hr style={{ borderColor: "var(--border)" }} className="mb-14" />
      )}

      {/* ── Featured Work (dev only) ── */}
      {process.env.NODE_ENV === "development" && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-7">
            <h2
              className="font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
            >
              Selected Work
            </h2>
            <Link
              href="/work"
              className="transition-opacity hover:opacity-70"
              style={{ color: "var(--text-2)", fontSize: "var(--text-micro)" }}
            >
              All case studies →
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {FEATURED_WORK.map((item) => (
              <div key={item.title}>
                <h3
                  className="font-semibold mb-2 leading-snug"
                  style={{ color: "var(--text-1)", fontSize: "var(--text-h2)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed mb-2"
                  style={{ color: "var(--text-2)", fontSize: "var(--text-body)" }}
                >
                  {item.description}
                </p>
                <p
                  style={{ color: "var(--text-3)", fontSize: "var(--text-small)" }}
                >
                  {item.tags.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
