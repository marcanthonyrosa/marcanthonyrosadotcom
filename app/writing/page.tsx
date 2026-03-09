import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
};

const RECENT_WRITING = [
  {
    slug: "fixed-a-bug-at-the-car-wash",
    title: "Fixed a bug at the car wash",
    date: "March 2026",
    description:
      "I shipped a production fix from my phone while waiting for a car wash using Claude Code on iOS. The barrier between idea and live code keeps collapsing.",
  },
  {
    slug: "stop-shipping-fast",
    title: "Stop shipping fast. Make it actually hold up.",
    date: "February 2026",
    description:
      "A Thread partner's counterintuitive advice: in the age of AI-generated vaporware, quality and support are the new competitive moat.",
  },
  {
    slug: "your-market-will-show-you",
    title: "Your market will show you the right one",
    date: "February 2026",
    description:
      "After 2.5 years at Thread, the market taught me where the real opportunity was. Your customers will show you — if you're willing to watch.",
  },
];

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-12">
        <h1
          className="font-semibold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
        >
          Writing
        </h1>
        <p
          className="leading-relaxed"
          style={{ color: "var(--text-2)", fontSize: "1.1rem" }}
        >
          I write about product management, team leadership, and the craft of building
          software products. No newsletter, no algorithm — just posts when I have
          something worth saying.
        </p>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-10" />

      {/* ── Posts ── */}
      <div className="flex flex-col gap-8">
        {RECENT_WRITING.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="font-medium transition-opacity hover:opacity-70 leading-snug"
              style={{ color: "var(--text-1)", fontSize: "1.1rem" }}
            >
              {post.title}
            </Link>
            <p
              className="leading-relaxed mt-1.5 mb-2"
              style={{ color: "var(--text-2)", fontSize: "1rem" }}
            >
              {post.description}
            </p>
            <span style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
              {post.date}
            </span>
          </article>
        ))}
      </div>

      <footer
        className="pt-16 pb-8"
        style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
      >
        {RECENT_WRITING.length} posts · Handcrafted by Marc · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
