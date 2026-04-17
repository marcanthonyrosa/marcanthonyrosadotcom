import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Work",
  alternates: { canonical: "https://marcrosa.com/work" },
};

const CASE_STUDIES = [
  {
    title: "Scaling a B2B product from 0 to 10k customers",
    period: "2023 – Present",
    tags: ["Product Strategy", "Growth", "B2B", "Series B"],
    problem:
      "Joined a seed-stage vertical SaaS company with 200 customers, no pricing strategy, and a product roadmap that was essentially a backlog dump. The board wanted a path to Series B in 18 months.",
    work: [
      "Rebuilt the product strategy from first principles, starting with 40 customer interviews in 6 weeks.",
      "Repositioned from SMB generalist to mid-market specialist — raising ACV from $3k to $18k.",
      "Designed and shipped a self-serve onboarding flow that cut time-to-value from 14 days to 3.",
      "Built and managed a team of 4 PMs, 3 designers, and 2 researchers.",
      "Established quarterly planning and a discovery/delivery cadence that the engineering org could depend on.",
    ],
    outcome:
      "Grew from 200 to 10,000+ customers in 18 months. Closed Series B at a $75M valuation. Time-to-value down 78%.",
  },
  {
    title: "Consumer app redesign · 4.2 → 4.8 App Store rating",
    period: "2021 – 2022",
    tags: ["Consumer", "Redesign", "iOS", "Retention"],
    problem:
      "A popular consumer lifestyle app had stagnated: D7 retention was 21%, the App Store rating had slipped to 4.2, and engineering was drowning in tech debt that made shipping anything painful.",
    work: [
      "Ran a 3-month discovery sprint to understand where users were dropping off — the biggest offender was a 9-step onboarding flow.",
      "Reduced onboarding from 9 steps to 3 by cutting everything that wasn't essential to the first 'aha moment'.",
      "Redesigned the core content feed from a TikTok-style infinite scroll to a curated daily digest — counterintuitive, but users loved it.",
      "Worked with engineering to pay down the navigation debt that had accumulated over 4 years.",
      "Shipped bi-weekly while the redesign was in progress, maintaining momentum with the existing user base.",
    ],
    outcome:
      "D7 retention improved from 21% to 34%. D30 improved from 8% to 19%. App Store rating climbed from 4.2 to 4.8 within 90 days of launch.",
  },
  {
    title: "Internal tooling → $2M ARR product line",
    period: "2019 – 2021",
    tags: ["Platform", "Enterprise", "0 to 1", "Tooling"],
    problem:
      "Our support team was spending 4 hours a day on a manual reporting process that existed because our core product didn't surface the right data. I proposed building an internal tool to fix it — and realized other companies had the same problem.",
    work: [
      "Built the internal tool in 6 weeks with one engineer. Cut the support team's daily reporting time from 4 hours to 15 minutes.",
      "Identified 5 similar companies through customer interviews who had the identical pain point.",
      "Convinced leadership to spin it out as a standalone product with a dedicated team of 2.",
      "Designed the pricing model, onboarding, and initial GTM strategy.",
      "Partnered with Sales to close the first 10 enterprise contracts, averaging $200k ARR each.",
    ],
    outcome:
      "Grew to $2M ARR in 14 months with 0 paid acquisition. Spun out as a separate business unit with its own P&L.",
  },
  {
    title: "Self-serve PLG motion · 18% → 54% activation rate",
    period: "2020 – 2021",
    tags: ["PLG", "Growth", "SaaS", "Activation"],
    problem:
      "A Series D SaaS company had a great sales-led business but almost no self-serve. Marketing was generating 2,000 free trial signups a month; only 18% ever activated (defined as completing a core action within 7 days).",
    work: [
      "Audited the signup and onboarding flow and found that 60% of users dropped off at step 2 — an email verification gate that was entirely unnecessary.",
      "Removed the email gate and replaced it with progressive disclosure — ask for info when it's needed, not upfront.",
      "Built an in-app checklist tied to the milestones that correlated most strongly with conversion to paid.",
      "Shipped personalized empty states for 4 distinct user personas, reducing 'blank canvas paralysis'.",
      "Created a product-qualified lead (PQL) scoring model that Sales used to prioritize outreach.",
    ],
    outcome:
      "Activation rate improved from 18% to 54% in 3 months. CAC from self-serve channel dropped 40%. Self-serve ARR grew from $800k to $8M over 18 months.",
  },
];

export default function Work() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-12">
        <h1
          className="font-semibold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          Work
        </h1>
        <p
          className="leading-relaxed"
          style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
        >
          A selection of case studies from my career. All numbers are real;
          company names are redacted by agreement.
        </p>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Case Studies ── */}
      <div className="flex flex-col gap-14">
        {CASE_STUDIES.map((cs, i) => (
          <article key={i}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
              <h2
                className="font-semibold leading-snug"
                style={{ color: "var(--text-1)", fontSize: "var(--text-h1)" }}
              >
                {cs.title}
              </h2>
              <span
                className="tabular-nums shrink-0"
                style={{
                  color: "var(--text-3)",
                  fontSize: "var(--text-small)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {cs.period}
              </span>
            </div>

            <p
              className="mb-6"
              style={{ color: "var(--text-3)", fontSize: "var(--text-small)" }}
            >
              {cs.tags.join(" · ")}
            </p>

            <div className="space-y-6">
              <div>
                <h3
                  className="font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
                >
                  The Problem
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text-2)", fontSize: "var(--text-body)" }}
                >
                  {cs.problem}
                </p>
              </div>

              <div>
                <h3
                  className="font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
                >
                  What I Did
                </h3>
                <ul className="flex flex-col gap-2">
                  {cs.work.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: "var(--text-3)" }}
                      />
                      <span
                        className="leading-relaxed"
                        style={{ color: "var(--text-2)", fontSize: "var(--text-body)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className="font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
                >
                  Outcome
                </h3>
                <p
                  className="leading-relaxed font-medium"
                  style={{ color: "var(--text-1)", fontSize: "var(--text-body)" }}
                >
                  {cs.outcome}
                </p>
              </div>
            </div>

            {i < CASE_STUDIES.length - 1 && (
              <hr
                className="mt-14"
                style={{ borderColor: "var(--border)" }}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
