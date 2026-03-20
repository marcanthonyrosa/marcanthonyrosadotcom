"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MarcManGame = dynamic(() => import("./MarcManGame"), { ssr: false });

export default function HeadshotOrGame() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="w-full mb-8">
        <MarcManGame onExit={() => setPlaying(false)} />
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={611}
        height={611}
        className="w-full"
        style={{ borderRadius: "16px" }}
        priority
      />
      <div className="flex justify-end mt-1.5">
        <button
          onClick={() => setPlaying(true)}
          style={{
            background: "none",
            border: "none",
            padding: "0",
            fontSize: "11px",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
            cursor: "pointer",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.color = "var(--text-3)";
          }}
        >
          🕹️ play marcman
        </button>
      </div>
    </div>
  );
}
