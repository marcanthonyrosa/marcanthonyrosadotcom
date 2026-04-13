import type { Metadata } from "next";
import HeadshotOrGame from "@/components/game/HeadshotOrGame";
import CompanyLogo from "@/components/CompanyLogo";

export const metadata: Metadata = {
  title: "About Marc Anthony Rosa",
  description:
    "About Marc Anthony Rosa — Houston-based Head of Product and tech founder. 15+ years building SaaS products at Thread, Twilio/Zipwhip, Tempus AI, Getty Images, Buffer, and Tribune Media.",
  alternates: { canonical: "https://marcrosa.com/about" },
  openGraph: {
    title: "About Marc Anthony Rosa",
    description:
      "Houston-based Head of Product and tech founder. 15+ years building SaaS products.",
    url: "https://marcrosa.com/about",
  },
};

type Acquisition = {
  acquiredCompany: string;
  acquiredCompanyUrl: string;
  announcementUrl: string;
};

type ExperienceEntry = {
  role: string;
  company: string;
  url: string;
  period: string;
  logo: string;
  acquisition?: Acquisition;
};

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Founder",
    company: "Sugo Product Company",
    url: "https://sugoproduct.com",
    period: "2026 –",
    logo: "/logos/sugo.png",
  },
  {
    role: "Head of Product",
    company: "Thread",
    url: "https://www.getthread.com",
    period: "2023 – 2025",
    logo: "/logos/thread.jpeg",
  },
  {
    role: "Director / Senior Product Manager",
    company: "Tempus AI",
    url: "https://www.tempus.com",
    period: "2021 – 2023",
    logo: "/logos/tempus.jpeg",
    acquisition: {
      acquiredCompany: "Deep 6 AI",
      acquiredCompanyUrl: "https://deep6.ai/",
      announcementUrl: "https://www.tempus.com/news/pr/tempus-announces-acquisition-of-deep-6-ai/",
    },
  },
  {
    role: "Product Manager",
    company: "Twilio",
    url: "https://www.twilio.com",
    period: "2019 – 2021",
    logo: "/logos/twilio.jpeg",
    acquisition: {
      acquiredCompany: "Zipwhip",
      acquiredCompanyUrl: "https://www.zipwhip.com",
      announcementUrl: "https://www.twilio.com/en-us/press/releases/twilio-completes-acquisition-of-zipwhip-a-leading-provider-of-toll-free-messaging-in-the-united-states",
    },
  },
  {
    role: "Product Manager",
    company: "Getty Images",
    url: "https://www.gettyimages.com",
    period: "2016 – 2019",
    logo: "/logos/getty.jpeg",
  },
  {
    role: "Product Manager",
    company: "Buffer",
    url: "https://buffer.com",
    period: "2015 – 2016",
    logo: "/logos/buffer.jpeg",
  },
  {
    role: "Product Manager / Associate PM",
    company: "Tribune Media",
    url: "https://www.tribunemedia.com",
    period: "2013 – 2015",
    logo: "/logos/tribune.jpeg",
    acquisition: {
      acquiredCompany: "Dose",
      acquiredCompanyUrl: "https://www.dose.com",
      announcementUrl: "https://www.prnewswire.com/news-releases/dose-formerly-spartz-media-raises-25-million-series-b-financing-led-by-tribune-media-300190548.html",
    },
  },
];

const VALUES = [
  {
    title: "Software should be opinionated",
    body: "Build products with a clear point of view on how they should be used. Tools that try to do everything end up doing nothing well.",
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
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-14">
        <h1
          className="font-semibold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
        >
          About
        </h1>
        <HeadshotOrGame />
        <div className="prose max-w-none">
          <p>
            I&apos;m Marc Anthony Rosa — a product leader and tech founder based in Houston, Texas. I lead product organizations and help companies turn early traction into scalable, durable platforms.
          </p>
          <p>
            Over the past 15 years, I&apos;ve worked primarily with SaaS and tech companies at moments of transition — when a strong product needs to evolve into a system that can support real scale.
          </p>
          <p>
            Most recently, I was Head of Product at <a href="https://getthread.com/" target="_blank" rel="noopener noreferrer">Thread</a>. I joined at seed stage when the company had a narrow IT ticketing product inside Slack and Teams. Over the next few years, we expanded it into a broader AI service platform spanning chat, inbox workflows, automation, and agentic tools. During that time, the company grew more than 10× in revenue, raised a Series A, and became a category leader in service desks for MSPs.
          </p>
          <p>
            Before Thread, I led product at Zipwhip, where I owned our flagship business messaging platform during a period of rapid adoption in 2020, leading up to the company&apos;s <a href="https://www.twilio.com/en-us/press/releases/twilio-completes-acquisition-of-zipwhip-a-leading-provider-of-toll-free-messaging-in-the-united-states" target="_blank" rel="noopener noreferrer">acquisition by Twilio</a>.
          </p>
          <p>
            Today, I advise early-stage founders through my practice, <a href="https://www.linkedin.com/company/sunday-sauce-studios" target="_blank" rel="noopener noreferrer">Sugo Product Company</a>, providing fractional product leadership and helping teams bring clarity to strategy, execution, and product systems.
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
          Work
        </h2>
        <div className="flex flex-col gap-5 sm:gap-4">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
            >
              {/* Logo + company + role:
                  < 480px  → logo / company+role / date each on own row
                  480–640px → logo+company+role on one row, date below
                  640px+   → everything on one row (handled by outer sm:flex-row) */}
              <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center gap-2 flex-1 min-w-0">
                <CompanyLogo
                  name={job.company}
                  logoSrc={job.logo}
                  size={32}
                  className="flex-shrink-0"
                />
                <span className="min-w-0">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-1)" }}
                  >
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {job.company}
                    </a>
                  </span>
                  {job.acquisition && (
                    <>
                      {" "}
                      <a
                        href={job.acquisition.announcementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded"
                        style={{
                          background: "var(--tag-bg)",
                          color: "var(--tag-text)",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          lineHeight: 1.4,
                          padding: "1px 6px",
                          verticalAlign: "middle",
                          textDecoration: "none",
                        }}
                      >
                        acq. {job.acquisition.acquiredCompany}
                      </a>
                    </>
                  )}
                  {" "}
                  <span style={{ color: "var(--text-2)", fontSize: "0.95rem" }}>
                    {job.role}
                  </span>
                </span>
              </div>
              {/* Date: below the top row on mobile, right-aligned on desktop */}
              <span
                className="tabular-nums flex-shrink-0"
                style={{
                  color: "var(--text-3)",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {job.period}
              </span>
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
                style={{ color: "var(--text-1)", fontSize: "1.05rem" }}
              >
                {v.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "var(--text-2)", fontSize: "1.0rem" }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
