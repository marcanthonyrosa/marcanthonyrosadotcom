import Link from "next/link";
import type { Metadata } from "next";
import { SocialLinks } from "@/components/SocialLinks";
import { HomeHero } from "@/components/HomeHero";
import { HomeCTAButton } from "@/components/HomeCTAButton";
import { FunWord } from "@/components/FunWord";

export const metadata: Metadata = {
  title: "Marc Rosa - Head of Product (Houston, TX)",
  description:
    "Marc Rosa is a Houston-based Head of Product and tech founder. Previously Thread, Twilio/Zipwhip, Tempus AI, Getty Images. Writing on product strategy, leadership, and the craft of building.",
  alternates: { canonical: "https://marcrosa.com/" },
  openGraph: {
    title: "Marc Rosa - Head of Product (Houston, TX)",
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

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-16">
        <HomeHero />
        <div className="prose max-w-none">
          <p>
            I turn early products into growth companies.
          </p>
          <p>
            Most recently, I was Head of Product at <a href="https://getthread.com/" target="_blank" rel="noopener noreferrer">Thread</a>, where we turned a feature with traction into the category-leading AI service desk for MSPs.
          </p>
          <p>
            I build opinionated software — products with a clear point of view — that hold up at scale and bring <FunWord>joy</FunWord> to your daily stack.
          </p>
        </div>

        <HomeCTAButton />
      </section>

      <hr style={{ borderColor: "var(--accent-ink)", opacity: 0.25 }} className="mb-14" />

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
                className="tabular-nums shrink-0 flex items-center gap-2"
                style={{
                  color: "var(--text-3)",
                  fontSize: "var(--text-small)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span style={{ color: "var(--accent-ink)", fontSize: "8px", lineHeight: 1 }} aria-hidden="true">●</span>
                {post.date.split(",")[0]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <SocialLinks />
    </div>
  );
}
