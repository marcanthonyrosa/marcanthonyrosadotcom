import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
};

const POSTS_BY_YEAR: Record<string, { slug: string; title: string; date: string }[]> = {
  "2026": [
    { slug: "fixed-a-bug-at-the-car-wash", title: "Fixed a bug at the car wash", date: "March 2, 2026" },
    { slug: "stop-shipping-fast", title: "Stop shipping fast. Make it actually hold up.", date: "February 12, 2026" },
    { slug: "your-market-will-show-you", title: "Your market will show you the right one", date: "February 10, 2026" },
  ],
};

export default function Writing() {
  const years = Object.keys(POSTS_BY_YEAR).sort((a, b) => Number(b) - Number(a));

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

      {/* ── Posts by year ── */}
      <div className="flex flex-col gap-12">
        {years.map((year) => (
          <section key={year}>
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--text-3)" }}
            >
              {year}
            </h2>
            <ul className="flex flex-col gap-4">
              {POSTS_BY_YEAR[year].map((post) => (
                <li key={post.slug} className="group flex items-baseline justify-between gap-4">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="leading-snug transition-opacity hover:opacity-70 flex-1"
                    style={{ color: "var(--text-1)", fontSize: "1.05rem" }}
                  >
                    {post.title}
                  </Link>
                  <span
                    className="tabular-nums shrink-0"
                    style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
                  >
                    {post.date.split(",")[0]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer
        className="pt-16 pb-8"
        style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
      >
        {Object.values(POSTS_BY_YEAR).flat().length} posts · Handcrafted by Marc · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
