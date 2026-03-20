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
        className="w-full cursor-pointer"
        style={{ borderRadius: "16px" }}
        priority
        onClick={() => setPlaying(true)}
      />
      <div className="absolute bottom-2 right-2">
        <button
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
            borderRadius: "20px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            fontFamily: "monospace",
            textTransform: "uppercase",
            background: "rgba(10,18,32,0.6)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            whiteSpace: "nowrap",
            transform: pressed ? "translateY(1px)" : "translateY(0)",
            transition: "transform 0.07s",
          }}
          className="text-[16px] px-[8px] py-[6px] sm:text-[10px] sm:px-[12px] sm:py-[5px]"
        >
          <span className="sm:hidden">🕹️</span>
          <span className="hidden sm:inline">🕹️ TURBO MODE</span>
        </button>
      </div>
    </div>
  );
}
