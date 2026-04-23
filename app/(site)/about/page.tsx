import type { Metadata } from "next";
import HeadshotOrGame from "@/components/game/HeadshotOrGame";
import CompanyLogo from "@/components/CompanyLogo";

export const metadata: Metadata = {
  title: "About Marc Rosa",
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

type Talk = {
  title: string;
  url: string;
  date: string;
};

const TALKS: Talk[] = [
  {
    title: "Merry Shipmas: Views and Insights by Thread",
    url: "https://www.linkedin.com/posts/thread-shipmas-servicemagic-ugcPost-7276992058387546113-FO5t",
    date: "December 2024",
  },
  {
    title: "Supercharge Your Service Experience: Thread and Halo",
    url: "https://www.youtube.com/watch?v=T8cnPqaKLwE",
    date: "July 2024",
  },
  {
    title: "Thread x TimeZest Webinar",
    url: "https://www.youtube.com/watch?v=tuOea01kKHY",
    date: "June 2024",
  },
];

const VALUES = [
  {
    title: "Software should be opinionated.",
    body: "Build products with a clear point of view on how they should be used. Tools that try to do everything end up doing nothing well.",
  },
  {
    title: "Mandatory spicy conversations.",
    body: "The hard, honest takes — the ones people hesitate to say out loud — are how a product actually gets sharper. I push for them, and expect them back.",
  },
];

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-14">
        <h1
          className="font-bold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          About
        </h1>
        <div className="max-w-md">
          <HeadshotOrGame />
        </div>
        <div className="prose max-w-none">
          <p>
            I&apos;m Marc 👋. I live in Houston with my wife Elle and our two boys — one four, one born this past March.
          </p>
          <p>
            I&apos;m a product leader who ships code. I built this site, my wife&apos;s interior design tools, and the internal tools behind my consulting practice. Less deck, more specs and software.
          </p>
          <h2
            className="font-semibold tracking-tight mt-10 mb-4"
            style={{ color: "var(--text-1)", fontSize: "var(--text-h2)" }}
          >
            How I got here
          </h2>
          <p>
            I love building things that people love. In college, as a way to hack around the finance major I hated, I built an Instacart-for-college-campuses business, sold it, used the energy to raise a seed round for a Foursquare-for-events app that failed hard, and then taught myself product from the studs.
          </p>
          <p>
            I&apos;ve led product at SaaS companies ever since. I led product at Zipwhip through its acquisition by Twilio, and built product at Deep 6 AI — AI-powered clinical trial matching, later acquired by Tempus. Most recently I was Head of Product at Thread, where we grew a narrow Slack ticketing tool into an AI-native service platform for MSPs.
          </p>
          <p>
            We became category leader because of the grown-up work that happens after an idea clicks: scaling products for a mainstream audience, building a distribution channel for our segments, and crossing the chasm with a whole product solution.
          </p>
          <h2
            className="font-semibold tracking-tight mt-10 mb-4"
            style={{ color: "var(--text-1)", fontSize: "var(--text-h2)" }}
          >
            Sugo
          </h2>
          <p>
            My practice is Sugo AI — I help mid-to-large enterprises cross the gap between AI pilots and production.
          </p>
          <p>
            Sugo is Italian for sauce. Every Sunday my boys and I make it; we&apos;ve got a recipe we&apos;ve been refining, tweaking it a little each time. That&apos;s also a great description of how I think about product work. The logo is a pixel tomato. It&apos;s a joke and it isn&apos;t.
          </p>
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Experience ── */}
      <section className="mb-14">
        <h2
          className="font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
        >
          Work
        </h2>
        <div className="flex flex-col gap-5 sm:gap-4">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
            >
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
                        style={{
                          color: "var(--text-3)",
                          fontSize: "var(--text-small)",
                          textDecoration: "none",
                        }}
                      >
                        (acq. {job.acquisition.acquiredCompany})
                      </a>
                    </>
                  )}
                  {" "}
                  <span style={{ color: "var(--text-2)", fontSize: "var(--text-body)" }}>
                    {job.role}
                  </span>
                </span>
              </div>
              <span
                className="tabular-nums flex-shrink-0"
                style={{
                  color: "var(--text-3)",
                  fontSize: "var(--text-small)",
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

      {/* ── Speaking ── */}
      <section className="mb-14">
        <h2
          className="font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
        >
          Speaking
        </h2>
        <div className="flex flex-col gap-2">
          {TALKS.map((talk) => (
            <a
              key={talk.url}
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md -mx-2 px-2 py-2 transition-colors hover:bg-[var(--nav-item-hover)]"
              style={{ textDecoration: "none" }}
            >
              <span
                className="font-semibold flex-1 min-w-0"
                style={{ color: "var(--text-1)" }}
              >
                {talk.title}
              </span>
              <span
                className="tabular-nums flex-shrink-0"
                style={{
                  color: "var(--text-3)",
                  fontSize: "var(--text-small)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {talk.date}
              </span>
            </a>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── How I work ── */}
      <section className="mb-14">
        <h2
          className="font-semibold uppercase tracking-widest mb-8"
          style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
        >
          How I work
        </h2>
        <div className="flex flex-col gap-6">
          {VALUES.map((v) => (
            <p
              key={v.title}
              className="leading-relaxed"
              style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
            >
              <span className="font-semibold" style={{ color: "var(--text-1)" }}>
                {v.title}
              </span>{" "}
              {v.body}
            </p>
          ))}
        </div>
      </section>

    </div>
  );
}
