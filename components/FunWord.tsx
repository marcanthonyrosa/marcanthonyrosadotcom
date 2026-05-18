"use client";

import { useState, useCallback, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  dx: number;
  dy: number;
  spin: number;
  w: number;
  h: number;
}

const PARTY_COLORS = [
  "#FF6B6B", "#FECA57", "#48DBFB", "#FF9FF3",
  "#54A0FF", "#5F27CD", "#01A3A4", "#F368E0",
  "#FF6348", "#7BED9F", "#70A1FF", "#FFA502",
];

const PARTY_DURATION = 2000;

let particleId = 0;

interface FunWordProps {
  children?: React.ReactNode;
}

export function FunWord({ children = "fun" }: FunWordProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [partyMode, setPartyMode] = useState(false);
  const partyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const newParticles: Particle[] = [];

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 120 + Math.random() * 280;
        const size = 5 + Math.random() * 6;
        newParticles.push({
          id: particleId++,
          x: cx,
          y: cy,
          color: PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)],
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity,
          spin: (Math.random() - 0.5) * 720,
          w: size,
          h: size * (0.5 + Math.random() * 0.8),
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.includes(p))
        );
      }, 900);

      document.documentElement.classList.add("party-mode");
      setPartyMode(true);

      if (partyTimeout.current) clearTimeout(partyTimeout.current);
      partyTimeout.current = setTimeout(() => {
        document.documentElement.classList.remove("party-mode");
        setPartyMode(false);
      }, PARTY_DURATION);
    },
    [],
  );

  return (
    <>
      <span
        onClick={handleClick}
        className={`fun-word${partyMode ? " fun-word-party" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
        aria-label="Click for a surprise"
      >
        {children}
      </span>

      {particles.length > 0 && (
        <span
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
          }}
          aria-hidden
        >
          {particles.map((p) => (
            <span
              key={p.id}
              className="fun-confetti"
              style={{
                "--fx": `${p.x}px`,
                "--fy": `${p.y}px`,
                "--fdx": `${p.dx}px`,
                "--fdy": `${p.dy + 60}px`,
                "--fs": `${p.spin}deg`,
                "--fw": `${p.w}px`,
                "--fh": `${p.h}px`,
                backgroundColor: p.color,
              } as React.CSSProperties}
            />
          ))}
        </span>
      )}
    </>
  );
}
