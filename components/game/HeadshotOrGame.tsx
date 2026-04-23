"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePostHog } from "posthog-js/react";

const MarcManGame = dynamic(() => import("./MarcManGame"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", aspectRatio: "1 / 1", background: "#0d0d1a", borderRadius: 16 }} />
  ),
});

const DURATION = 1300;
const EXIT_DURATION = 1050;
const EXIT_DOTS_PHASE = 200;
const EXIT_SWEEP_PHASE = 700;
const EXIT_FINISH_PHASE = EXIT_DURATION - EXIT_DOTS_PHASE - EXIT_SWEEP_PHASE;
const EXIT_GRID = 20;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInQuart(t: number) {
  return t * t * t * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeadshotOrGame() {
  const [playing, setPlaying] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pixelating, setPixelating] = useState(false);
  const [exiting, setExiting] = useState(false);
  const posthog = usePostHog();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const exitCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const exitAnimRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const exitStartRef = useRef<number>(0);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgSizeRef = useRef<{ w: number; h: number }>({ w: 611, h: 611 });
  const eatenRef = useRef<Uint8Array | null>(null);
  const burstsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);

  // Pre-load headshot on mount
  useEffect(() => {
    const img = new window.Image();
    img.src = "/headshot.jpeg";
    img.onload = () => {
      imgRef.current = img;
      imgSizeRef.current = { w: img.naturalWidth, h: img.naturalHeight };
    };
    import("./MarcManGame"); // preload chunk so it's ready on first click
    return () => {
      cancelAnimationFrame(animRef.current);
      cancelAnimationFrame(exitAnimRef.current);
    };
  }, []);

  const animatePixelation = useCallback((ts: number) => {
    const { w: W, h: H } = imgSizeRef.current;
    const progress = Math.min((ts - startTimeRef.current) / DURATION, 1);
    const waveY = H * easeInOutCubic(progress);
    const pixelSize = Math.max(1, Math.round(12 + 44 * easeInQuart(progress)));

    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    // Match canvas buffer to image dimensions
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw original photo as base layer
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, W, H);

    if (waveY > 0) {
      // Downscale then upscale to create pixel blocks
      const offW = Math.max(1, Math.ceil(W / pixelSize));
      const offH = Math.max(1, Math.ceil(H / pixelSize));

      if (!offscreenRef.current) {
        offscreenRef.current = document.createElement("canvas");
      }
      const off = offscreenRef.current;
      off.width = offW;
      off.height = offH;
      const offCtx = off.getContext("2d");
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(img, 0, 0, W, H, 0, 0, offW, offH);
      }

      // Clip to pixelated region (above wave front) and draw blocky version
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, Math.ceil(waveY));
      ctx.clip();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, offW, offH, 0, 0, W, H);
      ctx.restore();

      // Teal scan line glow at wave front
      if (waveY < H) {
        const glowH = 8;
        const grad = ctx.createLinearGradient(0, waveY - glowH * 2, 0, waveY + glowH);
        grad.addColorStop(0, "rgba(107,194,183,0)");
        grad.addColorStop(0.5, "rgba(107,194,183,0.85)");
        grad.addColorStop(1, "rgba(107,194,183,0.15)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, waveY - glowH * 2, W, glowH * 3);
      }
    }

    if (progress < 1) {
      animRef.current = requestAnimationFrame(animatePixelation);
    } else {
      setPlaying(true);
    }
  }, []);

  const startPixelation = useCallback(() => {
    setPixelating(true);
    startTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(animatePixelation);
  }, [animatePixelation]);

  const animateExit = useCallback((ts: number) => {
    const canvas = exitCanvasRef.current;
    if (!canvas) return;

    const { w: W, h: H } = imgSizeRef.current;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const elapsed = ts - exitStartRef.current;
    const progress = Math.min(elapsed / EXIT_DURATION, 1);
    const cellW = W / EXIT_GRID;
    const cellH = H / EXIT_GRID;
    const dotR = Math.min(cellW, cellH) * 0.16;

    const eaten = eatenRef.current;
    if (!eaten) return;

    const dotsProgress = Math.min(elapsed / EXIT_DOTS_PHASE, 1);
    const sweepStart = EXIT_DOTS_PHASE;
    const sweepEnd = EXIT_DOTS_PHASE + EXIT_SWEEP_PHASE;
    const sweepProgress = Math.max(0, Math.min((elapsed - sweepStart) / EXIT_SWEEP_PHASE, 1));
    const finishProgress = Math.max(0, Math.min((elapsed - sweepEnd) / EXIT_FINISH_PHASE, 1));

    ctx.clearRect(0, 0, W, H);

    const totalCells = EXIT_GRID * EXIT_GRID;
    const visitedBySweep = Math.floor(sweepProgress * totalCells);
    const visitedByFinish = visitedBySweep + Math.ceil((totalCells - visitedBySweep) * easeOutCubic(finishProgress));

    for (let visit = 0; visit < visitedByFinish; visit++) {
      const r = Math.min(EXIT_GRID - 1, Math.floor(visit / EXIT_GRID));
      const cOrder = visit - r * EXIT_GRID;
      const leftToRight = r % 2 === 0;
      const c = leftToRight ? cOrder : EXIT_GRID - 1 - cOrder;
      eaten[r * EXIT_GRID + c] = 1;
    }

    const washBase = elapsed < sweepEnd
      ? 0.55
      : 0.55 * (1 - easeOutCubic(finishProgress));

    for (let r = 0; r < EXIT_GRID; r++) {
      for (let c = 0; c < EXIT_GRID; c++) {
        if (eaten[r * EXIT_GRID + c]) continue;
        const x = c * cellW;
        const y = r * cellH;
        ctx.fillStyle = `rgba(13, 13, 26, ${washBase})`;
        ctx.fillRect(x, y, cellW + 1, cellH + 1);
        ctx.fillStyle = `rgba(107, 194, 183, ${0.08})`;
        ctx.fillRect(x, y, cellW + 1, cellH + 1);
      }
    }

    for (let r = 0; r < EXIT_GRID; r++) {
      for (let c = 0; c < EXIT_GRID; c++) {
        if (eaten[r * EXIT_GRID + c]) continue;
        const idx = r * EXIT_GRID + c;
        const stagger = (idx / totalCells) * 0.6;
        const localT = Math.max(0, Math.min((dotsProgress - stagger) / 0.35, 1));
        if (localT <= 0) continue;
        const cx = c * cellW + cellW / 2;
        const cy = r * cellH + cellH / 2;
        const a = 0.9 * localT;
        const rr = dotR * (0.5 + 0.5 * localT);

        ctx.fillStyle = `rgba(107, 194, 183, ${0.25 * localT})`;
        ctx.beginPath();
        ctx.arc(cx, cy, rr * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(107, 194, 183, ${a})`;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let pacX = 0;
    let pacY = 0;
    let pacDir = 0;
    let pacAlpha = 0;

    if (elapsed >= sweepStart && elapsed < sweepEnd) {
      const rowFloat = sweepProgress * EXIT_GRID;
      const row = Math.min(EXIT_GRID - 1, Math.floor(rowFloat));
      const rowT = rowFloat - row;
      const leftToRight = row % 2 === 0;
      const colF = leftToRight ? rowT * EXIT_GRID : (1 - rowT) * EXIT_GRID;
      pacX = colF * cellW;
      pacY = row * cellH + cellH / 2;
      pacDir = leftToRight ? 0 : Math.PI;
      pacAlpha = 1;

      if (Math.random() < 0.55) {
        burstsRef.current.push({ x: pacX, y: pacY, t: elapsed });
      }
    } else if (elapsed >= sweepEnd) {
      const lastRow = EXIT_GRID - 1;
      const leftToRight = lastRow % 2 === 0;
      pacX = leftToRight ? W - cellW / 2 : cellW / 2;
      pacY = lastRow * cellH + cellH / 2;
      pacDir = leftToRight ? 0 : Math.PI;
      pacAlpha = Math.max(0, 1 - easeOutCubic(finishProgress) / 0.85);
    }

    if (pacAlpha > 0) {
      const pacR = Math.min(cellW, cellH) * 0.7;
      const chompSpeed = 0.022;
      const mouthOpen = Math.abs(Math.sin(elapsed * chompSpeed));
      const mouthAngle = 0.05 + mouthOpen * 0.65;

      ctx.save();
      ctx.globalAlpha = pacAlpha;
      ctx.translate(pacX, pacY);
      ctx.rotate(pacDir);

      ctx.fillStyle = "rgba(255, 210, 63, 0.3)";
      ctx.beginPath();
      ctx.arc(0, 0, pacR * 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFD23F";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, pacR, mouthAngle, Math.PI * 2 - mouthAngle);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#0d0d1a";
      ctx.beginPath();
      ctx.arc(pacR * 0.15, -pacR * 0.45, pacR * 0.14, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    const liveBursts: Array<{ x: number; y: number; t: number }> = [];
    for (const b of burstsRef.current) {
      const age = (elapsed - b.t) / 280;
      if (age >= 1) continue;
      liveBursts.push(b);
      const rad = 4 + age * 20;
      ctx.strokeStyle = `rgba(107, 194, 183, ${0.55 * (1 - age)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(b.x, b.y, rad, 0, Math.PI * 2);
      ctx.stroke();
    }
    burstsRef.current = liveBursts;

    if (progress < 1) {
      exitAnimRef.current = requestAnimationFrame(animateExit);
    } else {
      ctx.clearRect(0, 0, W, H);
      burstsRef.current = [];
      setExiting(false);
    }
  }, []);

  const handleExit = useCallback(() => {
    posthog.capture("game_exited");
    eatenRef.current = new Uint8Array(EXIT_GRID * EXIT_GRID);
    burstsRef.current = [];
    setPlaying(false);
    setPixelating(false);
    setExiting(true);
    exitStartRef.current = performance.now();
    cancelAnimationFrame(exitAnimRef.current);
    exitAnimRef.current = requestAnimationFrame(animateExit);
  }, [animateExit, posthog]);

  if (playing) {
    return (
      <div className="w-full mb-8">
        <MarcManGame onExit={handleExit} />
      </div>
    );
  }

  return (
    <div className="relative w-full mb-8">
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={1200}
        height={1200}
        className="w-full cursor-pointer"
        style={{ borderRadius: "16px" }}
        priority
        onClick={() => { posthog.capture("avatar_clicked", { location: "about" }); startPixelation(); }}
      />
      <canvas
        ref={canvasRef}
        width={1200}
        height={1200}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          display: pixelating ? "block" : "none",
          imageRendering: "pixelated",
          cursor: "pointer",
        }}
      />
      <canvas
        ref={exitCanvasRef}
        width={1200}
        height={1200}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          display: exiting ? "block" : "none",
          pointerEvents: "none",
        }}
      />
      <style>{`
        @keyframes turbo-pulse {
          0%, 100% { box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 14px rgb(0 0 0 / 0.3), 0 0 8px rgb(107 194 183 / 0.2); }
          50% { box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 20px rgb(0 0 0 / 0.3), 0 0 18px rgb(107 194 183 / 0.45); }
        }
        .turbo-btn { animation: turbo-pulse 2.4s ease-in-out infinite; }
        .turbo-btn:hover { animation: none; box-shadow: 0 3px 0 rgb(30 75 70 / 0.7), 0 5px 20px rgb(0 0 0 / 0.3), 0 0 24px rgb(107 194 183 / 0.6) !important; }
      `}</style>
      <div className="absolute bottom-2 right-2">
        <button
          className={`${pressed ? "" : "turbo-btn"} px-[8px] py-[8px] sm:px-[20px] sm:py-[8px]`}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => {
            setPressed(false);
            posthog.capture("turbo_mode_clicked");
            startPixelation();
          }}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={(e) => {
            e.preventDefault();
            setPressed(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setPressed(false);
            posthog.capture("turbo_mode_clicked");
            startPixelation();
          }}
          style={{
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            fontFamily: "monospace",
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
          <span className="sm:hidden" style={{ fontSize: "16px" }}>🕹️</span>
          <span className="hidden sm:inline">🕹️ TURBO MODE</span>
        </button>
      </div>
    </div>
  );
}
