import Link from "next/link";

export function JohnnyBanner() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "nowrap",
        textAlign: "center",
        fontSize: "13px",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          background: "linear-gradient(90deg, #7c5cfc, #4f8ef7)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: "20px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Live
      </span>
      <span
        style={{
          color: "var(--text-2)",
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        John McKeon Rosa — Version 1.0 &nbsp;·&nbsp; 8 lbs, 11 oz &nbsp;·&nbsp; Available March 6, 2026
      </span>
      <Link
        href="/johnny"
        style={{
          color: "#93c5fd",
          fontWeight: 600,
          textDecoration: "none",
          borderBottom: "1px solid rgba(147,197,253,0.3)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Learn more ↓
      </Link>
    </div>
  );
}
