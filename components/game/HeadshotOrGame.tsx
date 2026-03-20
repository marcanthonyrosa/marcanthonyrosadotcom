"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MarcManGame = dynamic(() => import("./MarcManGame"), { ssr: false });

export default function HeadshotOrGame() {
  const [playing, setPlaying] = useState(false);
  const [pressed, setPressed] = useState(false);

  if (playing) {
    return (
      <div className="w-full mb-8">
        <MarcManGame onExit={() => setPlaying(false)} />
      </div>
    );
  }

  return (
    <div className="relative w-full mb-8">
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={611}
        height={611}
        className="w-full"
        style={{ borderRadius: "16px" }}
        priority
      />
      <style>{`
        @keyframes turbo-pulse {
          0%, 100% { box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 14px rgb(0 0 0 / 0.3), 0 0 8px rgb(107 194 183 / 0.2); }
          50% { box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 20px rgb(0 0 0 / 0.3), 0 0 18px rgb(107 194 183 / 0.45); }
        }
        .turbo-btn { animation: turbo-pulse 2.4s ease-in-out infinite; }
        .turbo-btn:hover { animation: none; box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 20px rgb(0 0 0 / 0.3), 0 0 24px rgb(107 194 183 / 0.6) !important; }
      `}</style>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button
          className={pressed ? undefined : "turbo-btn"}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => {
            setPressed(false);
            setPlaying(true);
          }}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={(e) => {
            e.preventDefault();
            setPressed(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setPressed(false);
            setPlaying(true);
          }}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "rgb(107 194 183 / 38%)",
            color: "#fff",
            border: "1px solid rgb(107 194 183 / 55%)",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            textShadow: "0 1px 3px rgba(0,0,0,0.35)",
            boxShadow: pressed
              ? "0 1px 0 rgb(30 75 70 / 0.7), 0 2px 6px rgba(0,0,0,0.25)"
              : undefined,
            transform: pressed ? "translateY(2px)" : "translateY(0)",
            transition: "box-shadow 0.07s, transform 0.07s",
          }}
        >
          🕹️ TURBO MODE
        </button>
      </div>
    </div>
  );
}
