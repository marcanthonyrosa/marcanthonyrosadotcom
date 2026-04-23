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

const EXIT_COLLAPSE_MS = 350;
const EXIT_PINCH_MS = 150;
const EXIT_HOLD_MS = 50;
const EXIT_BLOOM_MS = 400;
const EXIT_BLOOM_START = EXIT_COLLAPSE_MS + EXIT_PINCH_MS + EXIT_HOLD_MS;
const EXIT_TOTAL_MS = EXIT_BLOOM_START + EXIT_BLOOM_MS;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInQuart(t: number) {
  return t * t * t * t;
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
  const swappedRef = useRef<boolean>(false);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgSizeRef = useRef<{ w: number; h: number }>({ w: 611, h: 611 });

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
    if (!canvas) {
      exitAnimRef.current = requestAnimationFrame(animateExit);
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const W = Math.max(1, Math.round(rect.width * dpr));
    const H = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const elapsed = ts - exitStartRef.current;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;

    if (elapsed < EXIT_COLLAPSE_MS) {
      const t = easeInOutCubic(elapsed / EXIT_COLLAPSE_MS);

      const shutterH = (H / 2) * t;
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, shutterH);
      ctx.fillRect(0, H - shutterH, W, shutterH);

      const lineH = Math.max(2 * dpr, 4 * dpr + 6 * dpr * t);
      const glowH = 10 * dpr + 36 * dpr * t;
      const grad = ctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
      grad.addColorStop(0, "rgba(107,194,183,0)");
      grad.addColorStop(0.5, `rgba(107,194,183,${0.35 + 0.6 * t})`);
      grad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, cy - glowH, W, glowH * 2);

      ctx.fillStyle = `rgba(230, 255, 248, ${0.55 + 0.45 * t})`;
      ctx.fillRect(0, cy - lineH / 2, W, lineH);
    } else if (elapsed < EXIT_COLLAPSE_MS + EXIT_PINCH_MS) {
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      const t = easeInOutCubic((elapsed - EXIT_COLLAPSE_MS) / EXIT_PINCH_MS);
      const halfW = (W / 2) * (1 - t);

      const glowH = 46 * dpr;
      const grad = ctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
      grad.addColorStop(0, "rgba(107,194,183,0)");
      grad.addColorStop(0.5, "rgba(107,194,183,0.95)");
      grad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - halfW, cy - glowH, halfW * 2, glowH * 2);

      const coreH = Math.max(1 * dpr, 5 * dpr);
      ctx.fillStyle = "rgba(235, 255, 250, 1)";
      ctx.fillRect(cx - halfW, cy - coreH / 2, halfW * 2, coreH);

      const dotR = 5 * dpr + 4 * dpr * t;
      const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR * 3);
      dotGrad.addColorStop(0, "rgba(235, 255, 250, 1)");
      dotGrad.addColorStop(0.4, "rgba(107,194,183,0.9)");
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (elapsed < EXIT_BLOOM_START) {
      if (!swappedRef.current) {
        swappedRef.current = true;
        setPixelating(false);
        setPlaying(false);
      }
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      const dotR = 9 * dpr;
      const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR * 3);
      dotGrad.addColorStop(0, "rgba(235, 255, 250, 1)");
      dotGrad.addColorStop(0.4, "rgba(107,194,183,0.95)");
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (elapsed < EXIT_TOTAL_MS) {
      const t = easeInOutCubic((elapsed - EXIT_BLOOM_START) / EXIT_BLOOM_MS);

      const lineExpand = Math.min(1, t / 0.35);
      const unfurl = t < 0.35 ? 0 : (t - 0.35) / 0.65;

      const revealH = H * unfurl;
      const shutterH = (H - revealH) / 2;
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, shutterH);
      ctx.fillRect(0, H - shutterH, W, shutterH);

      const halfW = (W / 2) * lineExpand;
      const glowH = Math.max(6 * dpr, 46 * dpr * (1 - t));
      const grad = ctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
      grad.addColorStop(0, "rgba(107,194,183,0)");
      grad.addColorStop(0.5, `rgba(107,194,183,${0.9 * (1 - t * 0.6)})`);
      grad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - halfW, cy - glowH, halfW * 2, glowH * 2);

      const coreH = Math.max(1 * dpr, 4 * dpr * (1 - t * 0.5));
      ctx.fillStyle = `rgba(235, 255, 250, ${1 - t * 0.8})`;
      ctx.fillRect(cx - halfW, cy - coreH / 2, halfW * 2, coreH);
    }

    if (elapsed < EXIT_TOTAL_MS) {
      exitAnimRef.current = requestAnimationFrame(animateExit);
    } else {
      ctx.clearRect(0, 0, W, H);
      swappedRef.current = false;
      setExiting(false);
    }
  }, []);

  const startExit = useCallback(() => {
    posthog.capture("game_exited");
    cancelAnimationFrame(exitAnimRef.current);
    swappedRef.current = false;
    setExiting(true);
    exitStartRef.current = performance.now();
    exitAnimRef.current = requestAnimationFrame(animateExit);
  }, [animateExit, posthog]);

  return (
    <div className="relative w-full mb-8">
      {playing ? (
        <MarcManGame onExit={startExit} />
      ) : (
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
      )}
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
          display: pixelating && !playing && !exiting ? "block" : "none",
          imageRendering: "pixelated",
          cursor: "pointer",
        }}
      />
      <canvas
        ref={exitCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          display: exiting ? "block" : "none",
          pointerEvents: "none",
          zIndex: 20,
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
      {!playing && !exiting && (
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
      )}
    </div>
  );
}
