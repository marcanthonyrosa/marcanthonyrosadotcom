import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "After 9 months of development",
  description:
    "The Rosa Family has a new launch to share. Shipping above projections. Immediately disruptive. Not yet taking meetings.",
  alternates: { canonical: "https://marcrosa.com/writing/after-9-months-of-development" },
};

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/marcanthonyrosa_after-9-months-of-development-and-several-share-7437136460576681984-dK-8";

export default function After9MonthsOfDevelopment() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/writing"
          className="text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--text-3)" }}
        >
          ← Writing
        </Link>
      </div>

      {/* Launch announcement tag */}
      <Link
        href="/johnny"
        className="mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          color: "var(--text-2)",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.18)" }}
        />
        <span style={{ color: "var(--text-1)" }}>Live</span>
        <span style={{ color: "var(--text-3)" }}>·</span>
        <span>Launch announcement</span>
      </Link>

      {/* Header */}
      <header className="mb-6">
        <h1
          className="font-bold mb-4 tracking-tight leading-tight"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          After 9 months of development
        </h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          Originally posted on{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70"
          >
            LinkedIn
          </a>
          {" · "}March 6, 2026
        </p>
      </header>

      <hr style={{ borderColor: "var(--border)" }} className="mb-10" />

      {/* Body */}
      <article
        className="flex flex-col gap-5 leading-relaxed"
        style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
      >
        <p>
          After 9 months of development and several rigorous sprints, the Rosa Family has a new
          launch to share.
        </p>

        <p>Today we&apos;re proud to introduce:</p>

        <p className="font-semibold" style={{ color: "var(--text-1)" }}>
          John McKeon Rosa
          <br />
          <span className="font-normal" style={{ fontSize: "var(--text-small)", color: "var(--text-2)" }}>
            8 lbs, 11 oz · March 6, 2026
          </span>
        </p>

        <ul className="flex flex-col gap-1.5 pl-4" style={{ listStyleType: "disc" }}>
          <li>Shipping above projections.</li>
          <li>Immediately disruptive.</li>
          <li>Not yet taking meetings.</li>
        </ul>

        <p>Strong early investor interest from grandparents.</p>

        <p>A few early learnings from the first 24 hours:</p>

        <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: "disc" }}>
          <li>Returns are immediate and wildly non-linear</li>
          <li>Sleep appears to have been deprecated in this release</li>
          <li>The emotional override protocol is real and I was not prepared</li>
          <li>Hair was not on the roadmap. It shipped anyway. No complaints</li>
          <li>Current go-to-market strategy consists primarily of crying</li>
        </ul>

        <p>
          None of this would have been possible without my co-founder,{" "}
          <span className="font-semibold" style={{ color: "var(--text-1)" }}>
            Elle Rosa
          </span>
          , who — when asked to provide a quote for this announcement — said:
        </p>

        <blockquote
          className="pl-4 border-l-2 italic"
          style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
        >
          &ldquo;I cannot believe you are writing a LinkedIn post about this.&rdquo;
        </blockquote>

        <p>She has since been included in the announcement.</p>

        <p>
          John is currently pre-revenue, operating in stealth, and declining all inbound at this
          time.
        </p>

        <p>But he is here.</p>

        <p>And he is extraordinary.</p>

        <p>We&apos;re excited about the roadmap ahead.</p>

        <p>Onward.</p>
      </article>

      {/* Read more — launch page card */}
      <Link
        href="/johnny"
        className="group mt-14 block overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <Image
          src="/api/og/johnny"
          alt="John McKeon Rosa — Version 1.0"
          width={1200}
          height={630}
          unoptimized
          className="w-full h-auto"
        />
        <div
          className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: "var(--text-3)" }}
            >
              Read more
            </span>
            <span
              className="font-semibold"
              style={{ color: "var(--text-1)", fontSize: "var(--text-h2)" }}
            >
              Visit the official launch page
            </span>
            <span className="text-sm" style={{ color: "var(--text-2)" }}>
              John McKeon Rosa — Version 1.0. Specs, features, known issues, and press.
            </span>
          </div>
          <span
            aria-hidden
            className="shrink-0 text-xl transition-transform group-hover:translate-x-1"
            style={{ color: "var(--text-1)" }}
          >
            →
          </span>
        </div>
      </Link>

      {/* Footer */}
      <div className="pt-16 pb-8">
        <Link
          href="/writing"
          className="text-sm transition-opacity hover:opacity-70"
          style={{ color: "var(--text-3)" }}
        >
          ← Back to Writing
        </Link>
      </div>
    </div>
  );
}
