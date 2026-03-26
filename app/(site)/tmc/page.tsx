"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BarChart3,
  Database,
  Megaphone,
  Users,
  HandCoins,
  ArrowDown,
  Layers,
  Monitor,
  Mail,
  FileText,
  ExternalLink,
  MonitorPlay,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const stats = [
  { label: "Companies Tracked", value: "450+" },
  { label: "Total Funding Raised", value: "$5.2B" },
  { label: "Data Sources", value: "4" },
  { label: "AI Classification", value: "Real-time" },
];

const ideas = [
  {
    title: "Portfolio Tracking & Dashboard",
    icon: BarChart3,
    highlight: true,
    bullets: [
      "Track 450+ companies through accelerator programs",
      "Live dashboard with funding rounds, key hires, milestones",
      "Differentiate Innovation vs. Venture Fund portfolios",
      "Curated positive signal feed on website",
    ],
  },
  {
    title: "Social Media & Marketing Automation",
    icon: Megaphone,
    highlight: false,
    bullets: [
      "Transform static content into active community presence",
      "Pre-create and schedule conference content",
      "Stock exchange-style company activity feed on digital boards",
      "Leverage marketing learnings across Innovation division",
    ],
  },
  {
    title: "Executives in Residence (EIR) Program",
    icon: Users,
    highlight: false,
    bullets: [
      "AI agent for talent pipeline of seasoned med device executives",
      "Continuously search for PhD-level candidates",
      "Transition to Venture Studio model with T Labs access",
      "Share BioBridge cohort success stories to attract talent",
    ],
  },
  {
    title: "Philanthropic Investment Strategy",
    icon: HandCoins,
    highlight: false,
    bullets: [
      "Track Houston philanthropic community foundations",
      "Promote 'Program Related Investments' — IRS-approved alternative to grants",
      "Position TMC as investment opportunity for foundations",
      "Example: $6M investment yielding $300M return",
    ],
  },
];

const surfaces = [
  {
    icon: Monitor,
    title: "Internal Dashboard",
    desc: "Real-time portfolio intelligence for TMC leadership — funding signals, company health scores, and AI-classified news.",
  },
  {
    icon: Layers,
    title: "Public Marketing Feed",
    desc: "Curated, positive-signal company activity feed for TMC's website and digital boards throughout the campus.",
  },
  {
    icon: Mail,
    title: "Email Digest",
    desc: "Weekly stakeholder briefings with portfolio highlights, new funding rounds, and emerging trends.",
  },
];

const archImages = [
  { src: "/tmc/arch-02-enrichment-pipeline.png", caption: "Nightly Enrichment Pipeline — Data ingestion, AI classification, scoring" },
  { src: "/tmc/arch-03-database-erd.png", caption: "Database ERD — Companies, signals, users, preferences" },
];

type Tab = "product" | "architecture" | "prototype";

const TABS: { value: Tab; label: string; icon: React.ElementType }[] = [
  { value: "prototype", label: "Prototype", icon: MonitorPlay },
  { value: "product", label: "Product", icon: FileText },
  { value: "architecture", label: "Architecture", icon: Database },
];

// ── Component ─────────────────────────────────────────────────────────

export default function TMCPage() {
  const [activeTab, setActiveTab] = useState<Tab>("prototype");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.80)", cursor: "zoom-out" }}
          onClick={() => setLightboxImg(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImg}
            alt=""
            className="rounded-lg shadow-2xl"
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
          />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-12" style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>

        {/* ── Hero ── */}
        <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <span
            className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              border: "1px solid var(--tmc-blue-30)",
              color: "var(--tmc-blue)",
              background: "transparent",
            }}
          >
            Pre-Interview Product Discovery
          </span>
          <h1
            className="font-bold tracking-tight"
            style={{ color: "var(--tmc-navy)", fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.1 }}
          >
            TMC Intelligence
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
            A solo product exploration from discovery through architecture — four product
            opportunities surfaced from a CEO interview, with a deep dive into portfolio
            intelligence for the Texas Medical Center.
          </p>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            March 2026 · Built with Claude, Cursor, Figma &amp; ChatPRD
          </p>
        </section>

        {/* ── Four Ideas ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h2 className="text-2xl font-bold" style={{ color: "var(--tmc-navy)" }}>
              Four Product Opportunities
            </h2>
            <p style={{ color: "var(--text-2)" }}>
              From a discovery interview with the CEO, these four software concepts emerged.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ideas.map((idea) => (
              <div
                key={idea.title}
                className="rounded-xl p-5"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: 36,
                        height: 36,
                        background: "var(--surface-hover)",
                        color: "var(--text-3)",
                      }}
                    >
                      <idea.icon size={18} />
                    </div>
                    <span className="font-semibold text-base" style={{ color: "var(--text-1)" }}>
                      {idea.title}
                    </span>
                  </div>
                  {idea.highlight && (
                    <a
                      href="#deep-dive"
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--tmc-blue)", color: "#fff" }}
                    >
                      <ArrowDown size={11} />
                      Deep Dive
                    </a>
                  )}
                </div>
                {/* Bullets */}
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {idea.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm" style={{ color: "var(--text-2)" }}>
                      <span
                        className="flex-shrink-0 rounded-full mt-[0.4rem]"
                        style={{ width: 5, height: 5, background: "var(--tmc-blue-60)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Deep Dive ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h2 id="deep-dive" className="text-2xl font-bold" style={{ color: "var(--tmc-navy)" }}>
              Deep Dive: TMC Intelligence
            </h2>
            <p style={{ color: "var(--text-2)" }}>
              A portfolio intelligence platform that transforms scattered data into actionable
              insights for TMC leadership.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4 text-center"
                style={{ border: "1px solid var(--border)", background: "var(--tmc-light)" }}
              >
                <div className="text-2xl font-bold" style={{ color: "var(--tmc-navy)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--text-3)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Tab list */}
            <div
              className="flex gap-1 p-1 rounded-xl flex-wrap"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {TABS.map(({ value, label, icon: Icon }) => {
                const isActive = activeTab === value;
                return (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium"
                    style={{
                      background: isActive ? "var(--tmc-blue)" : "transparent",
                      color: isActive ? "#fff" : "var(--text-2)",
                      transition: "background 0.15s ease, color 0.15s ease",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Product Tab */}
            {activeTab === "product" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--tmc-navy)" }}>The Problem</h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-2)" }}>
                    TMC tracks 450+ portfolio companies across its Innovation and Venture Fund
                    programs, but company data is scattered across Salesforce, spreadsheets,
                    news feeds, and individual knowledge. Leadership lacks a unified, real-time
                    view of portfolio health and activity.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--tmc-navy)" }}>Three Surfaces</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {surfaces.map((s) => (
                      <div
                        key={s.title}
                        className="rounded-xl p-5"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-lg"
                          style={{
                            width: 40,
                            height: 40,
                            background: "var(--tmc-light)",
                            color: "var(--tmc-blue)",
                          }}
                        >
                          <s.icon size={20} />
                        </div>
                        <h4 className="font-semibold" style={{ color: "var(--text-1)" }}>{s.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--tmc-navy)" }}>User Segments</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { role: "TMC Leadership", need: "High-level portfolio health and fundraising metrics" },
                      { role: "Investment Team", need: "Company-level signals and due diligence data" },
                      { role: "Marketing Team", need: "Curated positive stories for external comms" },
                      { role: "External Stakeholders", need: "Public-facing success metrics and activity" },
                    ].map((u) => (
                      <div
                        key={u.role}
                        className="rounded-lg p-4"
                        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
                      >
                        <div className="font-medium mb-1" style={{ color: "var(--text-1)" }}>{u.role}</div>
                        <div className="text-sm" style={{ color: "var(--text-2)" }}>{u.need}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Architecture Tab */}
            {activeTab === "architecture" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Interactive HTML diagram */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <h3 className="text-lg font-semibold" style={{ color: "var(--tmc-navy)" }}>
                    Interactive System Architecture
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-2)" }}>
                    Shows the three-layer stack: External APIs → Supabase Backend → React Frontend.
                  </p>
                  <div
                    className="overflow-hidden rounded-xl"
                    style={{ border: "1px solid var(--border)", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    <iframe
                      src="/tmc/tmc_system_architecture.html"
                      title="TMC System Architecture"
                      style={{ height: 600, width: "100%", border: "none", display: "block" }}
                    />
                  </div>
                </div>

                {/* Diagram images */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <p className="text-sm" style={{ color: "var(--text-2)" }}>
                    Click any diagram to enlarge.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {archImages.map((img) => (
                      <div key={img.src} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div
                          className="overflow-hidden rounded-xl"
                          style={{
                            border: "1px solid var(--border)",
                            background: "#fff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                            cursor: "zoom-in",
                          }}
                          onClick={() => setLightboxImg(img.src)}
                        >
                          <Image
                            src={img.src}
                            alt={img.caption}
                            width={1456}
                            height={816}
                            className="w-full h-auto"
                            style={{ display: "block" }}
                          />
                        </div>
                        <p className="text-sm text-center" style={{ color: "var(--text-3)" }}>{img.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Prototype Tab */}
            {activeTab === "prototype" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="flex items-start justify-between gap-4">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--tmc-navy)" }}>
                      Working Figma Prototype
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-2)" }}>
                      Click through the interactive prototype below — it demonstrates the dashboard,
                      company detail views, and signal feeds.
                    </p>
                  </div>
                  <a
                    href="https://fixed-dawn-29068691.figma.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text-1)",
                      background: "var(--surface)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <ExternalLink size={13} />
                    Open in Figma
                  </a>
                </div>
                <div
                  className="overflow-hidden rounded-xl"
                  style={{ border: "1px solid var(--border)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  <iframe
                    src="https://fixed-dawn-29068691.figma.site"
                    title="TMC Intelligence Prototype"
                    allowFullScreen
                    style={{ height: 700, width: "100%", border: "none", display: "block" }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="text-center text-sm pb-4"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", color: "var(--text-3)" }}
        >
          Prepared by{" "}
          <a
            href="https://marcanthonyrosa.com"
            style={{ color: "var(--tmc-blue)" }}
            className="hover:underline"
          >
            Marc Anthony Rosa
          </a>
          {" "}· March 2026
        </footer>
      </div>
    </div>
  );
}
