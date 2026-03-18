"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MarcManGame = dynamic(() => import("./MarcManGame"), { ssr: false });

export default function HeadshotOrGame() {
  const [playing, setPlaying] = useState(false);
  const [mobileHint, setMobileHint] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setMobileHint(true);
      const t = setTimeout(() => setMobileHint(false), 2000);
      return () => clearTimeout(t);
    }
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
      {/* hover hint + mobile auto-hint */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${mobileHint ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        style={{ borderRadius: "16px", background: "rgba(0,0,0,0.45)" }}
      >
        <span
          className="text-white font-semibold text-lg"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          👾 Play MarcMan
        </span>
      </div>
      {/* always-visible corner badge */}
      <div
        className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-1 text-sm select-none pointer-events-none"
        aria-hidden="true"
      >
        👾
      </div>
    </div>
  );
}
