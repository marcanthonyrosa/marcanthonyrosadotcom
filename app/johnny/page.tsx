import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Introducing John McKeon Rosa — Available Now",
  description:
    "Three trimesters in the making. The most significant release of 2026. 8 lbs, 11 oz. Arrived March 6, 2026.",
  alternates: { canonical: "https://marcrosa.com/johnny" },
  openGraph: {
    type: "website",
    url: "https://marcrosa.com/johnny",
    title: "Introducing John McKeon Rosa — Available Now",
    description:
      "Three trimesters in the making. The most significant release of 2026. 8 lbs, 11 oz. Arrived March 6, 2026.",
    images: [
      {
        url: "https://marcrosa.com/api/og/johnny",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Marc Anthony Rosa",
  },
  twitter: {
    card: "summary_large_image",
    site: "@marcanthonyrosa",
    title: "Introducing John McKeon Rosa — Available Now",
    description:
      "Three trimesters in the making. The most significant release of 2026. 8 lbs, 11 oz. Arrived March 6, 2026.",
    images: ["https://marcrosa.com/api/og/johnny"],
  },
};

export default function JohnnyPage() {
  return (
    <div className={styles.root}>
      {/* ── LAUNCH BANNER ── */}
      <div className={styles.launchBanner}>
        <span className={styles.badge}>Live</span>
        <span className={styles.bannerText}>
          John McKeon Rosa — Version 1.0 &nbsp;·&nbsp; 8 lbs, 11 oz
          &nbsp;·&nbsp; Available March 6, 2026
        </span>
        <a href="#features">Read launch notes ↓</a>
      </div>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <a className={styles.navLogo} href="/">
          <Image
            src="/headshot.jpeg"
            alt="Marc Anthony Rosa"
            width={32}
            height={32}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </a>
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
          <a href="#issues">Bugs</a>
          <a href="#cta">Meet John</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.dot} />
          Live — Available Now
        </div>

        <h1>
          <span>Introducing</span>
          <span className={`${styles.heroName} ${styles.gradientText}`}>
            John McKeon Rosa
          </span>
        </h1>
        <div className={styles.heroVersion}>Version 1.0</div>

        <p className={styles.heroTagline}>
          Three trimesters in the making.{" "}
          <strong>The most significant release of 2026.</strong> Arrived above
          projections, on an accelerated timeline, via a world-class delivery
          partner.
        </p>

        <div className={styles.heroCta}>
          <a href="#features" className={styles.btnPrimary}>
            See what&apos;s new
          </a>
          <a href="#specs" className={styles.btnSecondary}>
            View full specs
          </a>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroVisualInner}>
            <span className={styles.vEmoji}>👶</span>
            <div className={styles.vLabel}>General Availability</div>
            <div className={styles.vDate}>March 6, 2026</div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className={styles.statsBar}>
        <div className={styles.statsBarInner}>
          <div className={styles.statItem}>
            <div className={`${styles.statNum} ${styles.gradientText}`}>
              8.69
            </div>
            <div className={styles.statLabel}>lbs at launch</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statNum} ${styles.gradientText}`}>
              40
            </div>
            <div className={styles.statLabel}>week dev cycle</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statNum} ${styles.gradientText}`}>
              24/7
            </div>
            <div className={styles.statLabel}>uptime (guaranteed)</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statNum} ${styles.gradientText}`}>∞</div>
            <div className={styles.statLabel}>projected ROI</div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionLabel}>What&apos;s New in v1.0</div>
        <h2 className={styles.sectionTitle}>
          Everything you&apos;d expect.
          <br />
          And some things you wouldn&apos;t.
        </h2>
        <p className={styles.sectionSub}>
          John McKeon Rosa ships with a full feature set from day one. No beta.
          No waitlist. No phased rollout. Available now, ready to disrupt.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🧬</span>
            <div className={styles.featureName}>McKeon–Rosa Genetic Merge</div>
            <div className={styles.featureDesc}>
              A successful integration of two complex legacy codebases. Some
              conflicts gracefully resolved. Others deferred to future versions.
              Outstanding results either way.
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📣</span>
            <div className={styles.featureName}>
              Industry-Leading Volume Output
            </div>
            <div className={styles.featureDesc}>
              Amplitude that scales with room size and audience proximity. No
              configurable ceiling. Benchmarks against all prior Rosa family
              releases — and wins.
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🍼</span>
            <div className={styles.featureName}>Always-On Appetite Engine</div>
            <div className={styles.featureDesc}>
              Continuous-feed architecture. No idle mode. No timeout. Constant
              throughput from day one with no observed degradation under
              sustained load.
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>👁️</span>
            <div className={styles.featureName}>
              Emotional Override Protocol
            </div>
            <div className={styles.featureDesc}>
              Sustained eye contact that triggers immediate cognitive disruption
              in adults within a 12-foot radius. Effects: loss of productivity,
              inability to look away, accelerated bonding.
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💪</span>
            <div className={styles.featureName}>Above-Spec Fundamentals</div>
            <div className={styles.featureDesc}>
              8 lbs, 11 oz at close — comfortably above analyst projections.
              Strong initial benchmarks across all dimensions: weight, lung
              capacity, and grip strength.
            </div>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>✨</span>
            <div className={styles.featureName}>Hair (Unexpected Feature)</div>
            <div className={styles.featureDesc}>
              Not on the original roadmap. Not in the spec. Shipped anyway.
              Receiving widespread critical acclaim. No complaints logged. Team
              considers it a win.
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ── TESTIMONIALS ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>From the Team</div>
        <h2 className={styles.sectionTitle}>
          Reactions from the people who matter.
        </h2>

        <div className={styles.quotesLayout}>
          <div className={`${styles.quoteCard} ${styles.quoteCardPrimary}`}>
            <div className={styles.quoteStars}>★★★★★</div>
            <div className={styles.quoteText}>
              &ldquo;Everything I have built toward — every decision, every
              sacrifice, every late night — was pointing here. John is the most
              consequential launch of my career. I mean that with no irony
              whatsoever. The thesis validated at first cry. I am humbled,
              honored, overwhelmed, and completely unprepared in the best
              possible way. I would ship him again immediately.&rdquo;
            </div>
            <div className={styles.quoteAuthor}>
              <div className={styles.authorAvatar}>M</div>
              <div>
                <div className={styles.authorName}>Marc Anthony Rosa</div>
                <div className={styles.authorTitle}>
                  Co-Founder and Managing Partner, The Rosa Family
                </div>
              </div>
            </div>
          </div>

          <div className={styles.quoteCard}>
            <div
              className={styles.quoteStars}
              style={{ color: "#6b7599" }}
            >
              ★★★★★
            </div>
            <div className={styles.quoteText}>
              &ldquo;What in the world is this&hellip;? Is this what you have
              been doing all this time?! Please go change Johnny&apos;s diaper,
              I am covered in vomit.&rdquo;
            </div>
            <div className={styles.quoteAuthor}>
              <div
                className={`${styles.authorAvatar} ${styles.authorAvatarSecondary}`}
              >
                E
              </div>
              <div>
                <div className={styles.authorName}>Elle Rosa</div>
                <div className={styles.authorTitle}>
                  Co-Founder and Managing Partner, The Rosa Family
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS ── */}
      <div className={styles.pressSection}>
        <div className={styles.pressLabel}>As covered by</div>
        <div className={styles.pressLogos}>
          <span className={styles.pressItem}>The Rosa Family Times</span>
          <span className={styles.pressItem}>McKeon Quarterly</span>
          <span className={styles.pressItem}>Parenting Vertical</span>
          <span className={styles.pressItem}>Baby TechCrunch</span>
          <span className={styles.pressItem}>New Parent Review</span>
        </div>
      </div>

      {/* ── SPECS ── */}
      <section id="specs" className={styles.section}>
        <div className={styles.sectionLabel}>Full Specifications</div>
        <h2 className={styles.sectionTitle}>Everything under the hood.</h2>
        <p className={styles.sectionSub}>
          Complete technical specifications at general availability. Subject to
          change as John updates over time.
        </p>

        <table className={styles.specsTable}>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td className={styles.specVal}>
                John McKeon Rosa{" "}
                <span className={`${styles.specBadge} ${styles.specBadgePurple}`}>
                  v1.0
                </span>
              </td>
            </tr>
            <tr>
              <td>Launch Date</td>
              <td className={styles.specVal}>
                March 6, 2026{" "}
                <span className={`${styles.specBadge} ${styles.specBadgeGreen}`}>
                  GA
                </span>
              </td>
            </tr>
            <tr>
              <td>Weight at Launch</td>
              <td className={styles.specVal}>
                8 lbs, 11 oz{" "}
                <span className={`${styles.specBadge} ${styles.specBadgeGreen}`}>
                  Above Projection
                </span>
              </td>
            </tr>
            <tr>
              <td>Development Timeline</td>
              <td className={styles.specVal}>
                40 weeks across 3 sprints (trimesters)
              </td>
            </tr>
            <tr>
              <td>Delivery Method</td>
              <td className={styles.specVal}>
                Third-party manufacturing &amp; logistics partner
              </td>
            </tr>
            <tr>
              <td>Revenue Status</td>
              <td className={styles.specVal}>
                Pre-revenue{" "}
                <span
                  className={`${styles.specBadge} ${styles.specBadgeYellow}`}
                >
                  High Potential
                </span>
              </td>
            </tr>
            <tr>
              <td>Current Operating Mode</td>
              <td className={styles.specVal}>Stealth (default state)</td>
            </tr>
            <tr>
              <td>API / Communication Interface</td>
              <td className={styles.specVal}>
                Undocumented. Non-deterministic. Endpoints not yet stable.
              </td>
            </tr>
            <tr>
              <td>Sleep Architecture</td>
              <td className={styles.specVal}>
                Undefined behavior. Connected systems severely affected.{" "}
                <span
                  className={`${styles.specBadge} ${styles.specBadgeYellow}`}
                >
                  See Known Issues
                </span>
              </td>
            </tr>
            <tr>
              <td>Uptime</td>
              <td className={styles.specVal}>
                24/7 &nbsp;(all connected systems required to match)
              </td>
            </tr>
            <tr>
              <td>Meeting Availability</td>
              <td className={styles.specVal}>Not currently accepting</td>
            </tr>
            <tr>
              <td>License</td>
              <td className={styles.specVal}>
                Unconditional · Irrevocable · Perpetual{" "}
                <span
                  className={`${styles.specBadge} ${styles.specBadgePurple}`}
                >
                  No Expiry
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <hr className={styles.divider} />

      {/* ── KNOWN ISSUES ── */}
      <section id="issues" className={styles.section}>
        <div className={styles.sectionLabel}>Bugs</div>
        <h2 className={styles.sectionTitle}>Full transparency.</h2>
        <p className={styles.sectionSub}>
          We ship with honesty. Here&apos;s everything we know about v1.0 at
          launch.
        </p>

        <div className={styles.issuesGrid}>
          <div className={styles.issueCard}>
            <div className={styles.iHeader}>
              <span className={styles.iId}>JMR-001</span>
              <span className={`${styles.iSev} ${styles.iSevCritical}`}>
                Critical
              </span>
            </div>
            <div className={styles.iTitle}>
              Sleep schedule: undefined behavior
            </div>
            <div className={styles.iDesc}>
              No discernible pattern detected. Downstream effects include severe
              degradation across all parent-side systems. Affects all connected
              devices.
            </div>
            <div className={styles.iStatus}>
              Status: Will not fix. No ETA. Managed via coffee.
            </div>
          </div>

          <div className={styles.issueCard}>
            <div className={styles.iHeader}>
              <span className={styles.iId}>JMR-002</span>
              <span className={`${styles.iSev} ${styles.iSevHigh}`}>High</span>
            </div>
            <div className={styles.iTitle}>
              Volume output has no upper bound
            </div>
            <div className={styles.iDesc}>
              Amplitude scales with proximity to sleeping adults. No
              configurable maximum. No mute function available or planned.
            </div>
            <div className={styles.iStatus}>
              Status: By design. Accepted as a core feature.
            </div>
          </div>

          <div className={styles.issueCard}>
            <div className={styles.iHeader}>
              <span className={styles.iId}>JMR-003</span>
              <span className={`${styles.iSev} ${styles.iSevMedium}`}>
                Medium
              </span>
            </div>
            <div className={styles.iTitle}>
              Verbal interface not yet available
            </div>
            <div className={styles.iDesc}>
              All communication currently delivered via non-deterministic audio.
              No interpretation layer ships with v1.0.
            </div>
            <div className={styles.iStatus}>
              Status: Planned for v2.x. ETA: ~12–18 months.
            </div>
          </div>

          <div className={styles.issueCard}>
            <div className={styles.iHeader}>
              <span className={styles.iId}>JMR-004</span>
              <span className={`${styles.iSev} ${styles.iSevLow}`}>Low</span>
            </div>
            <div className={styles.iTitle}>
              Eye contact causes adult system override
            </div>
            <div className={styles.iDesc}>
              Sustained eye contact triggers immediate loss of productivity,
              rational thought, and ability to discuss anything except John.
            </div>
            <div className={styles.iStatus}>
              Status: Will not fix. Considered a strength.
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className={styles.ctaSection} id="cta">
        <h2>
          John McKeon Rosa.
          <br />
          <span className={styles.gradientTextWarm}>Available now.</span>
        </h2>
        <p>
          This is not a limited release. There is no waitlist. He is already
          here, and he is already running the household.
        </p>
        <div>
          <a
            href="mailto:marc.anthony.rosa@gmail.com"
            className={styles.btnPrimary}
          >
            Get in touch
          </a>
        </div>
        <div className={styles.ctaMeta}>
          No rollback available &nbsp;·&nbsp; License: Unconditional &nbsp;·&nbsp;
          Not accepting co-investors &nbsp;·&nbsp; Meals welcome
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div>
          © 2026 The Rosa Family &nbsp;·&nbsp;{" "}
          <a href="https://marcanthonyrosa.com">marcanthonyrosa.com</a>
        </div>
        <div className={styles.footerLinks}>
          <a href="mailto:marc.anthony.rosa@gmail.com">Contact</a>
          <span className={styles.footerSep}>|</span>
          <span>John McKeon Rosa v1.0.0 — Build 0306-2026</span>
        </div>
      </footer>
    </div>
  );
}
