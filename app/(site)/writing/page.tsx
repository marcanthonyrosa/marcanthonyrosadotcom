import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
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
            <div className="flex flex-col gap-5">
              {posts.map((post) => (
                <div key={post.slug} className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="font-medium transition-opacity hover:opacity-70 leading-snug"
                    style={{ color: "var(--text-1)", fontSize: "1.1rem" }}
                  >
                    {post.title}
                  </Link>
                  <span
                    className="shrink-0"
                    style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
                  >
                    {post.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
