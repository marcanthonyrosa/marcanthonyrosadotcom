import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixed a bug at the car wash",
  description:
    "I shipped a production bug fix from my phone while waiting at a car wash using Claude Code on iOS. The barrier between idea and live code keeps collapsing.",
  alternates: { canonical: "https://marcrosa.com/writing/fixed-a-bug-at-the-car-wash" },
};

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/marcanthonyrosa_today-i-got-to-live-in-the-future-for-about-activity-7434340604190552074-ggmp";

export default function FixedABugAtTheCarWash() {
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

      {/* Header */}
      <header className="mb-6">
        <h1
          className="font-semibold mb-4 tracking-tight leading-tight"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          Fixed a bug at the car wash
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
          {" · "}March 2, 2026
        </p>
      </header>

      <hr style={{ borderColor: "var(--border)" }} className="mb-10" />

      {/* Body */}
      <article
        className="flex flex-col gap-5 leading-relaxed"
        style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
      >
        <p>
          Today I got to live in the future for about 15 very ordinary minutes: sitting in the
          waiting room of a car wash. I had a truly mission-critical issue on my personal website:
          the Pac-Man Easter egg (where you play as "Marcman" and eat gummy bears) was bouncing the
          entire screen when you swiped to move. Peak severity. Clearly could not wait.
        </p>

        <p>
          At the same time, I'd been listening to Boris Cherny's chat with Lenny Rachitsky on
          Lenny's Newsletter that something like a third of the code he writes now comes from the
          Claude iOS app. That's obviously crazy, how does that happen?! I couldn't quite picture
          how that actually worked in practice.
        </p>

        <p>
          So I opened Claude on my phone, tapped Code, started a session, and wrote one very
          specific instruction:
        </p>

        <blockquote
          className="pl-4 border-l-2 italic"
          style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
        >
          "Prevent swipe gestures from moving the browser viewport when playing the Pac-Man game."
        </blockquote>

        <p>A couple minutes later:</p>

        <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: "disc" }}>
          <li>
            I reviewed the diff on the GitHub iOS app (about 8 lines, basically disabling touch
            scrolling inside the canvas)
          </li>
          <li>Approved my own PR</li>
          <li>Tested it directly in iOS Safari</li>
        </ul>

        <p>
          Bug fixed. Deployed to production. All from my phone. While waiting for a car wash, with
          no terminal or IDE or fancy dev tool in sight.
        </p>

        <p>
          What struck me wasn't just the novelty; it was how normal it felt. This wasn't a demo
          moment or a staged "AI magic" workflow. It was just… fixing something annoying while I
          had a few idle minutes. It felt like answering a few emails or approving a doc, except the
          output was code in prod.
        </p>

        <p>
          We keep talking about AI changing how software gets built. But the bigger shift might be
          where and when it gets built. The barrier between "I have an idea" and "it's live" keeps
          collapsing. The future isn't always some dramatic leap; it might just be turning
          podcast-listening time into shipping time.
        </p>

        <p style={{ color: "var(--text-3)", fontSize: "var(--text-small)" }}>
          (PS: try playing the game on{" "}
          <a
            href="https://marcanthonyrosa.com"
            className="underline underline-offset-2 hover:opacity-70"
            style={{ color: "var(--text-3)" }}
          >
            marcanthonyrosa.com
          </a>{" "}
          from your phone — no-jiggle swiping courtesy of Anthropic.)
        </p>
      </article>

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
