import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays by Marc Anthony Rosa on product strategy, team leadership, and the craft of building software.",
  alternates: { canonical: "https://marcrosa.com/writing" },
  openGraph: {
    title: "Writing · Marc Anthony Rosa",
    description:
      "Essays on product strategy, team leadership, and the craft of building software.",
    url: "https://marcrosa.com/writing",
  },
};

const RECENT_WRITING = [
  {
    slug: "after-9-months-of-development",
    title: "After 9 months of development",
    date: "March 6",
    year: 2026,
  },
  {
    slug: "fixed-a-bug-at-the-car-wash",
    title: "Fixed a bug at the car wash",
    date: "March 2",
    year: 2026,
  },
  {
    slug: "stop-shipping-fast",
    title: "Stop shipping fast. Make it actually hold up.",
    date: "February 12",
    year: 2026,
  },
  {
    slug: "your-market-will-show-you",
    title: "Your market will show you the right one",
    date: "February 10",
    year: 2026,
  },
];

const years = [...new Set(RECENT_WRITING.map((p) => p.year))].sort(
  (a, b) => b - a
);

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      <h1
        className="font-semibold mb-12 tracking-tight"
        style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
      >
        Writing
      </h1>

      {years.map((year) => {
        const posts = RECENT_WRITING.filter((p) => p.year === year);
        return (
          <section key={year} className="mb-12">
            <h2
              className="font-medium mb-6"
              style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
            >
              {year}
            </h2>
            <ul className="flex flex-col gap-2">
              {posts.map((post) => (
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
                      {post.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
