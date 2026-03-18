"use client";

import { useMemo, useState } from "react";

type Props = {
  name: string;
  logoSrc?: string | null;
  size?: number;
  className?: string;
};

export default function CompanyLogo({ name, logoSrc, size = 32, className }: Props) {
  const [failed, setFailed] = useState(false);

  const initial = useMemo(() => {
    const trimmed = name.trim();
    return (trimmed[0] ?? "?").toUpperCase();
  }, [name]);

  const showFallback = !logoSrc || failed;

  const boxStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  };

  if (showFallback) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          ...boxStyle,
          background: "var(--surface)",
          color: "var(--text-2)",
          fontWeight: 700,
          fontSize: Math.max(12, Math.round(size * 0.55)),
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    <div className={className} style={boxStyle}>
      <img
        src={logoSrc}
        alt={name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          padding: Math.max(4, Math.round(size * 0.16)),
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

