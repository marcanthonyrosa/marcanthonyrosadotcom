"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

const CTA_COPY = [
  "TELL ME MORE",
  "I'M INTRIGUED",
  "WHO IS THIS GUY",
  "KEEP TALKING",
  "I'M LISTENING",
  "MORE PLEASE",
  "THE FULL STORY",
  "GO ON",
  "WHO'S MARC",
  "LET ME IN",
  "GIVE ME THE BACKSTORY",
  "SHOW ME AROUND",
];

export function HomeCTAButton() {
  const [copy, setCopy] = useState(CTA_COPY[0]);
  const posthog = usePostHog();

  useEffect(() => {
    setCopy(CTA_COPY[Math.floor(Math.random() * CTA_COPY.length)]);
  }, []);

  return (
    <Link
      href="/about"
      onClick={() => posthog?.capture("home_cta_clicked", { copy })}
      className="home-cta inline-flex items-center mt-8"
      style={{
        borderRadius: "8px",
        padding: "12px 22px",
        fontSize: "13px",
        fontWeight: 800,
        letterSpacing: "0.08em",
        fontFamily: "var(--font-mono), monospace",
        textTransform: "uppercase",
        background: "rgb(107 194 183)",
        color: "rgb(20 56 51)",
        border: "1px solid rgb(30 75 70 / 35%)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        cursor: "pointer",
      }}
    >
      <span suppressHydrationWarning>{copy}</span>
      <span className="home-cta-dots" aria-hidden="true">
        <span className="home-cta-dot home-cta-dot-1">.</span>
        <span className="home-cta-dot home-cta-dot-2">.</span>
        <span className="home-cta-dot home-cta-dot-3">.</span>
      </span>
    </Link>
  );
}
