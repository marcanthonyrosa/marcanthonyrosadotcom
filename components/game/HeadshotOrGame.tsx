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
    <div className="w-full mb-8">
      <div
        className="relative w-full group cursor-pointer"
        onClick={() => setPlaying(true)}
        title="Click to play MarcMan 👾"
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
            👾 Play MarcMan
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-4">
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
            padding: "10px 28px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "linear-gradient(180deg, #e83030 0%, #a81010 100%)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
            boxShadow: pressed
              ? "0 1px 0 #6b0000, 0 2px 6px rgba(0,0,0,0.3)"
              : "0 4px 0 #6b0000, 0 6px 14px rgba(0,0,0,0.35)",
            transform: pressed ? "translateY(3px)" : "translateY(0)",
            transition: "box-shadow 0.07s, transform 0.07s, filter 0.15s",
            filter: pressed ? "brightness(0.9)" : "brightness(1)",
          }}
        >
          ⚡ TURBO MODE
        </button>
      </div>
    </div>
  );
}
