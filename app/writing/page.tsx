import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
};

const POSTS_BY_YEAR: Record<string, { slug: string; title: string; date: string }[]> = {
  "2026": [
    { slug: "product-strategy-that-actually-works", title: "Product strategy that actually works", date: "January 15, 2026" },
    { slug: "how-to-hire-pms", title: "How to hire PMs: the interview questions I actually use", date: "January 3, 2026" },
  ],
  "2025": [
    { slug: "the-product-manager-as-editor", title: "The product manager as editor", date: "November 20, 2025" },
    { slug: "discovery-vs-delivery", title: "Discovery vs delivery: why the dichotomy is a trap", date: "October 8, 2025" },
    { slug: "how-i-run-user-research", title: "How I run user research as a team of one", date: "August 14, 2025" },
    { slug: "writing-a-good-prd", title: "Writing a good PRD in 2025", date: "July 1, 2025" },
    { slug: "north-star-metric-trap", title: "The north star metric trap", date: "May 22, 2025" },
    { slug: "stakeholder-management-is-product-work", title: "Stakeholder management is product work", date: "March 10, 2025" },
    { slug: "on-roadmaps", title: "On roadmaps", date: "January 29, 2025" },
  ],
  "2024": [
    { slug: "shipping-is-the-easy-part", title: "Shipping is the easy part", date: "December 5, 2024" },
    { slug: "the-activation-problem", title: "The activation problem", date: "October 17, 2024" },
    { slug: "product-thinking-is-a-skill", title: "Product thinking is a skill, not a personality", date: "September 3, 2024" },
    { slug: "on-positioning", title: "On positioning: how to make your product feel inevitable", date: "July 22, 2024" },
    { slug: "feedback-loops", title: "Feedback loops and why most teams don't have one", date: "June 4, 2024" },
    { slug: "working-with-engineers", title: "Working with engineers: what I've learned", date: "April 11, 2024" },
    { slug: "customer-interviews-101", title: "Customer interviews 101", date: "February 28, 2024" },
  ],
  "2023": [
    { slug: "the-pm-career-ladder", title: "The PM career ladder is broken", date: "November 14, 2023" },
    { slug: "building-b2b-vs-b2c", title: "Building B2B vs B2C: the real differences", date: "September 9, 2023" },
    { slug: "how-to-run-a-sprint-review", title: "How to run a sprint review people actually want to attend", date: "July 30, 2023" },
    { slug: "the-discovery-anti-pattern", title: "The discovery anti-pattern", date: "May 16, 2023" },
    { slug: "writing-as-a-product-skill", title: "Writing as a product skill", date: "March 7, 2023" },
    { slug: "product-led-growth-primer", title: "A practical primer on product-led growth", date: "January 22, 2023" },
  ],
};

export default function Writing() {
  const years = Object.keys(POSTS_BY_YEAR).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
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
