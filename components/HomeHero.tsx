"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

const AVATAR_SIZE = 57;
const AVATAR_RADIUS = Math.round(AVATAR_SIZE / 6);
const NAV_DELAY_MS = 220;
const CONFETTI_DURATION_MS = 700;
const CONFETTI_COLORS = ["#6BC2B7", "#9BD4CB", "#3A8A80", "#1E4B46"];

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dyUp: number;
  dyDown: number;
  rot: number;
  size: number;
  color: string;
};

export function HomeHero() {
  const router = useRouter();
  const posthog = usePostHog();
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const counterRef = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback((x: number, y: number) => {
    const count = 6 + Math.floor(Math.random() * 3);
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const speed = 60 + Math.random() * 55;
      const dx = Math.cos(angle) * speed;
      const dyUp = Math.sin(angle) * speed - 28;
      newParticles.push({
        id: counterRef.current++,
        x,
        y,
        dx,
        dyUp,
        dyDown: dyUp + 90,
        rot: (Math.random() - 0.5) * 540,
        size: 5 + Math.random() * 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    const ids = new Set(newParticles.map((p) => p.id));
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
    }, CONFETTI_DURATION_MS + 50);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();

      posthog?.capture("home_hero_clicked");

      const rect = wrapperRef.current?.getBoundingClientRect();
      if (rect) burst(e.clientX - rect.left, e.clientY - rect.top);

      controls
        .start({ scale: 0.92, transition: { type: "spring", duration: 0.05, bounce: 0 } })
        .then(() =>
          controls.start({ scale: 1, transition: { type: "spring", duration: 0.2, bounce: 0.1 } }),
        );

      setTimeout(() => router.push("/about"), NAV_DELAY_MS);
    },
    [burst, controls, posthog, router],
  );

  return (
    <Link
      ref={wrapperRef}
      href="/about"
      onClick={handleClick}
      aria-label="Go to About page"
      className="relative flex items-start gap-4 mb-8"
      style={{ textDecoration: "none", borderRadius: 12 }}
    >
      <motion.div animate={controls} className="mt-[3px]" style={{ flexShrink: 0 }}>
        <Image
          src="/headshot.jpeg"
          alt="Marc Anthony Rosa"
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          style={{ borderRadius: AVATAR_RADIUS, display: "block" }}
          priority
        />
      </motion.div>
      <div className="min-w-0">
        <h1
          className="font-bold tracking-tight leading-none"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          Marc Rosa
        </h1>
        <p
          className="font-medium mt-2.5 leading-none"
          style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
        >
          Head of Product
        </p>
      </div>

      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-confetti"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: p.color,
                ["--cx" as string]: `${p.dx}px`,
                ["--cy-up" as string]: `${p.dyUp}px`,
                ["--cy-down" as string]: `${p.dyDown}px`,
                ["--crot" as string]: `${p.rot}deg`,
              }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
