import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

const EXPERIENCE = [
  {
    role: "Head of Product",
    company: "Thread",
    period: "2023 – Present",
    description:
      "Led product through Thread's transition from a single Slack-based IT ticketing tool into a multi-product AI service platform, building and leading a 25+ person product organization and establishing the strategy, roadmaps, and operating rhythms that supported sustained revenue growth.",
  },
  {
    role: "Director / Senior Product Manager",
    company: "Tempus AI",
    period: "2021 – 2023",
    description:
      "Led development of clinical search products that match complex trial criteria against 30M patient records, improving matching accuracy and enabling research teams to identify eligible patients months faster across large health systems.",
  },
  {
    role: "Product Manager",
    company: "Twilio (Zipwhip)",
    period: "2020 – 2021",
    description:
      "Helped scale a business messaging platform by improving shared inbox collaboration and leading the rollout of carrier compliance systems that ensured customers could continue messaging under new industry regulations.",
  },
  {
    role: "Product Manager",
    company: "Getty Images / iStock",
    period: "2016 – 2019",
    description:
      "Led contributor platform improvements, growing the mobile contributor ecosystem by enhancing keyword intelligence, search discovery, and upload workflows.",
  },
  {
    role: "Product Manager",
    company: "Buffer",
    period: "2016 – 2019",
    description:
      "Shipped major publishing capabilities including Social Media Calendar and Video, and helped integrate the Respond acquisition into Buffer's core product workflows.",
  },
  {
    role: "Product Manager",
    company: "Tribune Media (Dose)",
    period: "2014 – 2016",
    description:
      "Built consumer apps and content ranking systems that helped scale Dose.com to tens of millions of monthly visitors.",
  },
];

const VALUES = [
  {
    title: "Clarity over cleverness",
    body: "A clear strategy beats a sophisticated one. A simple product beats a feature-rich one. I try to make things that don't need an explanation.",
  },
  {
    title: "Users first, metrics second",
    body: "Metrics are how you know the product is working, not why it should exist. I start with a deep understanding of the people I'm building for.",
  },
  {
    title: "Ship, learn, iterate",
    body: "Perfect products don't ship. I'd rather get real feedback from real users than optimize something in a vacuum for another quarter.",
  },
  {
    title: "Strong opinions, loosely held",
    body: "I form a point of view quickly, share it confidently, and update it readily. Epistemic courage without epistemic arrogance.",
  },
];

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10 sm:py-24">
      {/* ── Header ── */}
      <section className="mb-14">
        <h1
          className="font-semibold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
        >
          About
        </h1>
        <Image
          src="/headshot.jpeg"
          alt="Marc Anthony Rosa"
          width={611}
          height={611}
          className="w-full mb-8"
          style={{ borderRadius: "16px" }}
          priority
        />
        <div className="prose max-w-none">
          <p>
            I&apos;m Marc Rosa. I lead product organizations and help companies turn early traction into scalable, durable platforms.
          </p>
          <p>
            Over the past 15 years, I&apos;ve worked primarily with SaaS companies at moments of transition — when a strong product needs to evolve into a system that can support real scale.
          </p>
          <p>
            Most recently, I was Head of Product at <a href="https://getthread.com/" target="_blank" rel="noopener noreferrer">Thread</a>. I joined at seed stage when the company had a narrow IT ticketing product inside Slack and Teams. Over the next few years, we expanded it into a broader AI service platform spanning chat, inbox workflows, automation, and agentic tools. During that time, the company grew more than 10× in revenue, raised a Series A, and became a category leader in service desks for MSPs.
          </p>
          <p>
            Before Thread, I led product at Zipwhip, where I owned our flagship business messaging platform during a period of rapid adoption in 2020, leading up to the company&apos;s <a href="https://www.twilio.com/en-us/press/releases/twilio-completes-acquisition-of-zipwhip-a-leading-provider-of-toll-free-messaging-in-the-united-states" target="_blank" rel="noopener noreferrer">acquisition by Twilio</a>.
          </p>
          <p>
            Today, I advise early-stage founders through my practice, <a href="https://www.linkedin.com/company/sunday-sauce-studios" target="_blank" rel="noopener noreferrer">Sunday Sauce Studios</a>, providing fractional product leadership and helping teams bring clarity to strategy, execution, and product systems.
          </p>
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Experience ── */}
      <section className="mb-14">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-3)" }}
        >
          Experience
        </h2>
        <div className="flex flex-col gap-8">
          {EXPERIENCE.map((job) => (
            <div key={job.company}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-1)", fontSize: "1.075rem" }}
                  >
                    {job.role}
                  </span>
                  <span
                    className="mx-2"
                    style={{ color: "var(--text-3)", fontSize: "0.975rem" }}
                  >
                    ·
                  </span>
                  <span
                    style={{ color: "var(--text-2)", fontSize: "0.975rem" }}
                  >
                    {job.company}
                  </span>
                </div>
                <span
                  className="tabular-nums"
                  style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
                >
                  {job.period}
                </span>
              </div>
              <p
                className="leading-relaxed"
                style={{ color: "var(--text-2)", fontSize: "1rem" }}
              >
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Values ── */}
      <section className="mb-14">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-3)" }}
        >
          How I work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl p-5"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: "var(--text-1)", fontSize: "1.0rem" }}
              >
                {v.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "var(--text-2)", fontSize: "0.975rem" }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Contact ── */}
      <section className="mb-12">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--text-3)" }}
        >
          Get in touch
        </h2>
        <p
          className="leading-relaxed mb-4"
          style={{ color: "var(--text-2)", fontSize: "1rem" }}
        >
          I&apos;m always happy to chat about product, give feedback on a strategy doc,
          or connect with early-stage founders figuring out their product motion.
          The best way to reach me is by email.
        </p>
        <a
          href="mailto:marc.anthony.rosa@gmail.com"
          className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)", fontSize: "0.975rem" }}
        >
          marc.anthony.rosa@gmail.com →
        </a>
      </section>

      <footer
        className="pb-8"
        style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
      >
        Handcrafted by Marc · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
