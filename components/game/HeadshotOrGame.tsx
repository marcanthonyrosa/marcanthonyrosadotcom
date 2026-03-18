"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MarcManGame = dynamic(() => import("./MarcManGame"), { ssr: false });

// Approximate perimeter of the 607×607 rounded rect (rx=14) drawn in the SVG
const PERIMETER = 2410;

export default function HeadshotOrGame() {
  const [playing, setPlaying] = useState(false);
  const [borderVisible, setBorderVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBorderVisible(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (playing) {
    return (
      <div className="w-full mb-8">
        <MarcManGame onExit={() => setPlaying(false)} />
      </div>
    );
  }

  return (
    <div
      className="relative w-full mb-8 group cursor-pointer"
      onClick={() => setPlaying(true)}
      title="Click to play MarcMan 🕹️"
    >
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={611}
        height={611}
        className="w-full"
        style={{ borderRadius: "16px" }}
        priority
      />
      {/* hover hint */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ borderRadius: "16px", background: "rgba(0,0,0,0.45)" }}
      >
        <span
          className="text-white font-semibold text-lg"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          🕹️ Play MarcMan
        </span>
      </div>
      {/* always-visible corner badge */}
      <div
        className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-1 text-sm select-none pointer-events-none"
        aria-hidden="true"
      >
        🕹️
      </div>
      {/* traveling border highlight on page load */}
      {borderVisible && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 611 611"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <rect
            x="2" y="2" width="607" height="607" rx="14" ry="14"
            fill="none"
            stroke="url(#border-grad)"
            strokeWidth="2"
            strokeDasharray={PERIMETER}
            style={{
              animation: "border-once 0.9s linear forwards",
              filter: "drop-shadow(0 0 4px #a855f7)",
            }}
          />
        </svg>
      )}
    </div>
  );
}
