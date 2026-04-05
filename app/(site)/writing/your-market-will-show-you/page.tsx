import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your market will show you the right one",
  description:
    "After 2.5 years at Thread, the market taught me where the real opportunity was. Your customers will show you the right market — if you're willing to watch.",
  alternates: { canonical: "https://marcrosa.com/writing/your-market-will-show-you" },
};

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/marcanthonyrosa_personal-news-i-recently-wrapped-up-my-time-activity-7427003710419128320-H62N";

export default function YourMarketWillShowYou() {
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
          style={{ color: "var(--text-1)", fontSize: "2rem" }}
        >
          Your market will show you the right one
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
          {" · "}February 10, 2026
        </p>
      </header>

      <hr style={{ borderColor: "var(--border)" }} className="mb-10" />

      {/* Body */}
      <article
        className="flex flex-col gap-5 leading-relaxed"
        style={{ color: "var(--text-2)", fontSize: "1.125rem" }}
      >
        <p>
          Personal news: I recently wrapped up my time at Thread after two and a half years helping
          grow the product. I joined early to focus on a very specific problem. The market pulled us
          somewhere very different. Thank the software gods it did.
        </p>

        <p>One lesson from that journey 👇</p>

        <p className="font-semibold" style={{ color: "var(--text-1)" }}>
          🧭 Your market matters (and your customers will show you the right one)
        </p>

        <p>
          When I joined Thread, we owned a niche: create IT tickets in Slack or Teams when IT
          contractors who own them live outside of your company. A solid pain point and a
          differentiator IT teams could pitch their clients in a post-email, post-phone world.
        </p>

        <p>
          But to some, this was a meaningful but non-existential problem. So we focused on driving
          adoption. When we pushed some folks to engage, we would hear this objection:
        </p>

        <blockquote
          className="pl-4 border-l-2 italic"
          style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
        >
          "I can't use tools like yours without restructuring our entire team first. We're too
          brittle, even if these things will make us money."
        </blockquote>

        <p>
          To service this, we leaned hard into helping teams better operate so we could make chat
          stickier. With no intention to do so, this side quest quickly became the main course.
        </p>

        <p>
          We shipped products that used AI to triage IT tickets coming in and inbox tools that let
          techs work with one another in real time — so when chats came in, they'd be easier to
          manage.
        </p>

        <p>
          Less tedious work would create more time to engage in active chat conversations, our main
          product. That was the hypothesis.
        </p>

        <p>
          How did we do? Our chat customers grew, but so did IT teams using Thread for use cases
          that had nothing to do with chat.
        </p>

        <p>
          In unblocking the thing we cared about, we stumbled into a separate legitimate
          problem/solution fit elsewhere and a larger market.
        </p>

        <p>Today, chat is an optional add-on.</p>

        <p className="font-semibold" style={{ color: "var(--text-1)" }}>
          🔑 The takeaway: Listen closely, stay fluid, and explore adjacent markets when customers
          keep pulling you there. Larger opportunities are often disguised as a smaller speed bump.
        </p>

        <p>
          Customers are actually pretty good at showing you when you should circle a different
          problem — if you're willing to watch long enough.
        </p>

        <hr style={{ borderColor: "var(--border)" }} />

        <p style={{ color: "var(--text-3)", fontSize: "0.95rem" }}>
          I'm deeply grateful to Matt and Mark for inviting me to Thread; to the Thread leadership
          team for your partnership (Michael, Stephen, Bobby, Paralee, Samuel, Laura); to the PD
          team (Kristof, Amine, Ricardo, Julie), PDE leadership (Vyacheslav, Luiz Pedone, Gabriel,
          Bositkhon, Ziad), and investor partners who helped see the path forward (John, Michael,
          Jacob, David, Adam).
        </p>

        <p style={{ color: "var(--text-3)", fontSize: "0.95rem" }}>More to come on what's next.</p>
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
