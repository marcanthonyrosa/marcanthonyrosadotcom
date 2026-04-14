import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stop shipping fast. Make it actually hold up.",
  description:
    "In the age of AI-generated vaporware, quality and support are the new competitive moat. A lesson from shipping at Thread.",
  alternates: { canonical: "https://marcrosa.com/writing/stop-shipping-fast" },
};

const LINKEDIN_URL =
  "https://www.linkedin.com/posts/marcanthonyrosa_this-photo-is-from-a-product-research-session-activity-7427724759553134592-wgAY";

export default function StopShippingFast() {
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

      {/* Hero image */}
      <div
        className="mb-8 overflow-hidden rounded-lg border"
        style={{ borderColor: "var(--border)" }}
      >
        <Image
          src="/writing/albert.jpeg"
          alt="Stop shipping fast. Make it actually hold up."
          width={1200}
          height={630}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Header */}
      <header className="mb-6">
        <h1
          className="font-semibold mb-4 tracking-tight leading-tight"
          style={{ color: "var(--text-1)", fontSize: "2rem" }}
        >
          Stop shipping fast. Make it actually hold up.
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
          {" · "}February 12, 2026
        </p>
      </header>

      <hr style={{ borderColor: "var(--border)" }} className="mb-10" />

      {/* Body */}
      <article
        className="flex flex-col gap-5 leading-relaxed"
        style={{ color: "var(--text-2)", fontSize: "1.125rem" }}
      >
        <p>
          This photo is from a product research session with Albert, a Thread partner who told us
          something ridiculous:
        </p>

        <blockquote
          className="pl-4 border-l-2 italic"
          style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
        >
          "Stop shipping fast. Make it actually hold up."
        </blockquote>

        <p>
          The most frustrating learning from 2025 was that shipping faster stopped being the right
          answer.
        </p>

        <p>As building software got cheaper and easier, we heard this from customers:</p>

        <p className="font-medium" style={{ color: "var(--text-1)" }}>
          Stop adding more features.
        </p>

        <hr style={{ borderColor: "var(--border)" }} />

        <p className="font-semibold" style={{ color: "var(--text-1)" }}>
          🧱 Quality and support are a competitive advantage in the Era of the Vibe
        </p>

        <p>
          Tools like Lovable, Claude Code, and Cursor have forever changed how fast ideas become
          software. Shipping is now cheap, which means delivery alone is no longer a competitive
          moat.
        </p>

        <p>So how do you stand out when competitors can sling similar-looking products overnight?</p>

        <p>One answer: quality and support.</p>

        <p>A brutally unsatisfying answer. 🤮</p>

        <p>
          Our reality is that vibecoding solved one problem and created another: a sea of
          vaporware.
        </p>

        <p>
          We're past the honeymoon phase of AI and starting to see fatigue with AI slop — not just
          ChatGPTerrible copy, but products that look right but crumble under edge cases, security
          expectations, or real-world usage.
        </p>

        <p>I heard this feedback fifty times from our partners:</p>

        <blockquote
          className="pl-4 border-l-2"
          style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
        >
          <p>"We love when you build the thing.</p>
          <p>Now, PLEASE, make sure it holds up when we use it."</p>
        </blockquote>

        <p>
          Super different than Move Fast and Break Things. It breaks the Lean Startup part of my
          brain.
        </p>

        <p>
          Despite our hesitations as a hyper-paced startup, we placed many bets on slowing down to
          scale the existing product.
        </p>

        <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: "disc" }}>
          <li>We ran long betas.</li>
          <li>Stress-tested a lot.</li>
          <li>Moved at a glacial pace (the deploy button is RIGHT THERE).</li>
          <li>Invested heavily in support and bug triage.</li>
        </ul>

        <p>In spite of a velocity-obsessed industry, it worked.</p>

        <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: "disc" }}>
          <li>Customers stuck around.</li>
          <li>Power users became advocates.</li>
          <li>Squeaky wheels turned into passionate community members.</li>
        </ul>

        <p>
          The boring stuff paid off, even when doing all of this wasn't sexy and we felt real
          pressure to ship ship ship.
        </p>

        <p>
          In the age of vibe-driven development, slop is real, and customers need to trust the
          systems behind it.
        </p>

        <p>
          Resiliency and support became one retention mechanism since it showed folks that we would
          be around tomorrow.
        </p>

        <p className="font-semibold" style={{ color: "var(--text-1)" }}>
          🔑 The takeaway: Build things that last. Back them with real support.
        </p>

        <p>Customers won't wander to the next vibed look-alike.</p>
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
