import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <p
        className="font-semibold uppercase tracking-widest mb-4"
        style={{ color: "var(--text-3)", fontSize: "var(--text-micro)" }}
      >
        404
      </p>
      <h1
        className="font-bold tracking-tight mb-3 text-center"
        style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
      >
        Page not found
      </h1>
      <p
        className="text-center mb-8 max-w-sm leading-relaxed"
        style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
      >
        This page doesn&apos;t exist or was moved. Head back home.
      </p>
      <Link
        href="/"
        className="font-medium transition-opacity hover:opacity-70"
        style={{
          color: "var(--text-1)",
          fontSize: "var(--text-body)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        ← Back home
      </Link>
    </div>
  );
}
