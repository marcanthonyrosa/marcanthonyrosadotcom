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

const EXIT_COLLAPSE_MS = 500;
const EXIT_PINCH_MS = 220;
const EXIT_HOLD_MS = 100;
const EXIT_BLOOM_MS = 580;
const EXIT_BLOOM_START = EXIT_COLLAPSE_MS + EXIT_PINCH_MS + EXIT_HOLD_MS;
const EXIT_TOTAL_MS = EXIT_BLOOM_START + EXIT_BLOOM_MS;

const SCANLINE_COUNT = 100;
const SCANLINE_ILLUMINATE_MS = 450;
const SCANLINE_GLOW_DECAY_MS = 60;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInQuart(t: number) {
  return t * t * t * t;
}

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
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
  const headshotCacheRef = useRef<{ canvas: HTMLCanvasElement; w: number; h: number } | null>(null);
  const vignetteCacheRef = useRef<{ canvas: HTMLCanvasElement; w: number; h: number } | null>(null);
  const blurredProxyRef = useRef<{ canvas: HTMLCanvasElement; w: number; h: number } | null>(null);

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

  const ensureHeadshotCache = useCallback((W: number, H: number) => {
    const img = imgRef.current;
    if (!img) return null;
    const cache = headshotCacheRef.current;
    if (cache && cache.w === W && cache.h === H) return cache;
    const c = cache?.canvas ?? document.createElement("canvas");
    c.width = W;
    c.height = H;
    const cctx = c.getContext("2d");
    if (!cctx) return null;
    cctx.imageSmoothingEnabled = true;
    cctx.drawImage(img, 0, 0, W, H);
    headshotCacheRef.current = { canvas: c, w: W, h: H };
    return headshotCacheRef.current;
  }, []);

  const ensureVignetteCache = useCallback((W: number, H: number) => {
    const cache = vignetteCacheRef.current;
    if (cache && cache.w === W && cache.h === H) return cache;
    const c = cache?.canvas ?? document.createElement("canvas");
    c.width = W;
    c.height = H;
    const cctx = c.getContext("2d");
    if (!cctx) return null;
    const cx = W / 2;
    const cy = H / 2;
    const r = Math.sqrt(cx * cx + cy * cy);
    const grad = cctx.createRadialGradient(cx, cy, r * 0.45, cx, cy, r);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.7, "rgba(0,0,0,0.15)");
    grad.addColorStop(1, "rgba(0,0,0,0.35)");
    cctx.fillStyle = grad;
    cctx.fillRect(0, 0, W, H);
    vignetteCacheRef.current = { canvas: c, w: W, h: H };
    return vignetteCacheRef.current;
  }, []);

  const ensureBlurredProxy = useCallback((W: number, H: number) => {
    const cache = blurredProxyRef.current;
    if (cache && cache.w === W && cache.h === H) return cache;
    const c = cache?.canvas ?? document.createElement("canvas");
    c.width = W;
    c.height = H;
    const cctx = c.getContext("2d");
    if (!cctx) return null;
    cctx.fillStyle = "#0d0d1a";
    cctx.fillRect(0, 0, W, H);
    let usedFilter = false;
    try {
      cctx.filter = "blur(4px)";
      if (cctx.filter === "blur(4px)") usedFilter = true;
    } catch {
      usedFilter = false;
    }
    const cy = H / 2;
    const glowH = H * 0.25;
    const grad = cctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
    grad.addColorStop(0, "rgba(107,194,183,0)");
    grad.addColorStop(0.5, "rgba(107,194,183,0.55)");
    grad.addColorStop(1, "rgba(107,194,183,0)");
    cctx.fillStyle = grad;
    if (usedFilter) {
      cctx.fillRect(0, cy - glowH, W, glowH * 2);
      cctx.filter = "none";
    } else {
      for (let i = -2; i <= 2; i++) {
        cctx.globalAlpha = 0.35;
        cctx.fillRect(0, cy - glowH + i * 2, W, glowH * 2);
      }
      cctx.globalAlpha = 1;
    }
    blurredProxyRef.current = { canvas: c, w: W, h: H };
    return blurredProxyRef.current;
  }, []);

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

    const vignette = ensureVignetteCache(W, H);

    if (elapsed < EXIT_COLLAPSE_MS) {
      const raw = elapsed / EXIT_COLLAPSE_MS;
      const t = easeInOutQuart(raw);

      const proxy = ensureBlurredProxy(W, H);
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      const bandH = H * (1 - t);
      const bandTop = cy - bandH / 2;
      if (proxy && bandH > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, bandTop, W, bandH);
        ctx.clip();
        ctx.globalAlpha = 0.6 + 0.3 * t;
        ctx.drawImage(proxy.canvas, 0, 0, W, H);
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      const shutterH = (H / 2) * t;
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, shutterH);
      ctx.fillRect(0, H - shutterH, W, shutterH);

      const lineH = Math.max(2 * dpr, 4 * dpr + 8 * dpr * t);
      const glowH = 14 * dpr + 52 * dpr * t;
      const grad = ctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
      grad.addColorStop(0, "rgba(107,194,183,0)");
      grad.addColorStop(0.5, `rgba(107,194,183,${0.3 + 0.65 * t})`);
      grad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, cy - glowH, W, glowH * 2);

      ctx.fillStyle = `rgba(230, 255, 248, ${0.5 + 0.5 * t})`;
      ctx.fillRect(0, cy - lineH / 2, W, lineH);

      const pump = Math.pow(t, 3) * 0.1;
      if (pump > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${pump})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (vignette) ctx.drawImage(vignette.canvas, 0, 0, W, H);
    } else if (elapsed < EXIT_COLLAPSE_MS + EXIT_PINCH_MS) {
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      const raw = (elapsed - EXIT_COLLAPSE_MS) / EXIT_PINCH_MS;
      const t = easeInOutQuart(raw);
      const halfW = (W / 2) * (1 - t);

      const streakLen = W * (0.6 + 0.4 * raw);
      const streakAlpha = Math.sin(raw * Math.PI);
      const streakH = 18 * dpr + 10 * dpr * streakAlpha;
      const streakGradH = ctx.createLinearGradient(cx - streakLen / 2, 0, cx + streakLen / 2, 0);
      streakGradH.addColorStop(0, "rgba(107,194,183,0)");
      streakGradH.addColorStop(0.5, `rgba(230,255,248,${0.95 * streakAlpha})`);
      streakGradH.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = streakGradH;
      ctx.fillRect(cx - streakLen / 2, cy - streakH / 2, streakLen, streakH);

      const streakGradV = ctx.createLinearGradient(0, cy - streakH * 2, 0, cy + streakH * 2);
      streakGradV.addColorStop(0, "rgba(107,194,183,0)");
      streakGradV.addColorStop(0.5, `rgba(107,194,183,${0.55 * streakAlpha})`);
      streakGradV.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = streakGradV;
      ctx.fillRect(cx - streakLen / 2, cy - streakH * 2, streakLen, streakH * 4);

      const glowH = 52 * dpr;
      const grad = ctx.createLinearGradient(0, cy - glowH, 0, cy + glowH);
      grad.addColorStop(0, "rgba(107,194,183,0)");
      grad.addColorStop(0.5, "rgba(107,194,183,0.95)");
      grad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - halfW, cy - glowH, halfW * 2, glowH * 2);

      const coreH = Math.max(1 * dpr, 5 * dpr);
      ctx.fillStyle = "rgba(235, 255, 250, 1)";
      ctx.fillRect(cx - halfW, cy - coreH / 2, halfW * 2, coreH);

      const dotR = 5 * dpr + 5 * dpr * t;
      const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR * 4);
      dotGrad.addColorStop(0, "rgba(235, 255, 250, 1)");
      dotGrad.addColorStop(0.35, `rgba(107,194,183,${0.9 * streakAlpha})`);
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 4, 0, Math.PI * 2);
      ctx.fill();

      const flashAlpha = Math.pow(streakAlpha, 2) * 0.22;
      if (flashAlpha > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (vignette) ctx.drawImage(vignette.canvas, 0, 0, W, H);
    } else if (elapsed < EXIT_BLOOM_START) {
      if (!swappedRef.current) {
        swappedRef.current = true;
        setPixelating(false);
        setPlaying(false);
      }
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      const holdT = (elapsed - EXIT_COLLAPSE_MS - EXIT_PINCH_MS) / EXIT_HOLD_MS;
      const jitter = Math.sin(holdT * Math.PI * 3) * 0.5 * dpr;

      const streakExtinguish = 1 - holdT;
      const streakLen = W * 0.9;
      const streakH = 14 * dpr * streakExtinguish;
      if (streakH > 0) {
        const streakGrad = ctx.createLinearGradient(cx - streakLen / 2, 0, cx + streakLen / 2, 0);
        streakGrad.addColorStop(0, "rgba(107,194,183,0)");
        streakGrad.addColorStop(0.5, `rgba(230,255,248,${0.6 * streakExtinguish})`);
        streakGrad.addColorStop(1, "rgba(107,194,183,0)");
        ctx.fillStyle = streakGrad;
        ctx.fillRect(cx - streakLen / 2, cy - streakH / 2 + jitter, streakLen, streakH);
      }

      const dotR = 9 * dpr;
      const dotGrad = ctx.createRadialGradient(cx, cy + jitter, 0, cx, cy + jitter, dotR * 3);
      dotGrad.addColorStop(0, "rgba(235, 255, 250, 1)");
      dotGrad.addColorStop(0.4, "rgba(107,194,183,0.95)");
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy + jitter, dotR * 3, 0, Math.PI * 2);
      ctx.fill();

      const retraceAppear = Math.min(1, holdT * 1.4);
      if (retraceAppear > 0) {
        const barH = 20 * dpr;
        const barGrad = ctx.createLinearGradient(0, 0, 0, barH);
        barGrad.addColorStop(0, "rgba(107,194,183,0)");
        barGrad.addColorStop(0.5, `rgba(230,255,248,${0.35 * retraceAppear})`);
        barGrad.addColorStop(1, "rgba(107,194,183,0)");
        ctx.fillStyle = barGrad;
        ctx.fillRect(0, 0, W, barH);
      }

      if (vignette) ctx.drawImage(vignette.canvas, 0, 0, W, H);
    } else if (elapsed < EXIT_TOTAL_MS) {
      const bloomElapsed = elapsed - EXIT_BLOOM_START;
      const bloomT = bloomElapsed / EXIT_BLOOM_MS;
      const scanT = Math.min(1, bloomElapsed / SCANLINE_ILLUMINATE_MS);
      const eased = easeInOutQuart(scanT);
      const revealedPairs = Math.floor(eased * (SCANLINE_COUNT / 2));

      const headshot = ensureHeadshotCache(W, H);

      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(0, 0, W, H);

      if (headshot) {
        const bandH = H / SCANLINE_COUNT;
        const midIndex = SCANLINE_COUNT / 2;
        const topFirst = Math.max(0, Math.floor(midIndex - revealedPairs));
        const topHeight = Math.min(H, Math.ceil((midIndex - topFirst) * bandH));
        const bottomFirst = Math.min(SCANLINE_COUNT, Math.ceil(midIndex));
        const bottomHeight = Math.min(
          H - Math.ceil(midIndex * bandH),
          Math.ceil(Math.min(revealedPairs, SCANLINE_COUNT - midIndex) * bandH),
        );

        if (topHeight > 0) {
          const y = Math.floor(topFirst * bandH);
          ctx.drawImage(headshot.canvas, 0, y, W, topHeight, 0, y, W, topHeight);
        }
        if (bottomHeight > 0) {
          const y = Math.floor(bottomFirst * bandH);
          ctx.drawImage(headshot.canvas, 0, y, W, bottomHeight, 0, y, W, bottomHeight);
        }

        const chromaAmount = (1 - easeOutQuart(bloomT)) * 3 * dpr;
        if (chromaAmount > 0.2 && revealedPairs > 0) {
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = 0.25;
          if (topHeight > 0) {
            const y = Math.floor(topFirst * bandH);
            ctx.drawImage(headshot.canvas, 0, y, W, topHeight, -chromaAmount, y, W, topHeight);
            ctx.drawImage(headshot.canvas, 0, y, W, topHeight, chromaAmount, y, W, topHeight);
          }
          if (bottomHeight > 0) {
            const y = Math.floor(bottomFirst * bandH);
            ctx.drawImage(headshot.canvas, 0, y, W, bottomHeight, -chromaAmount, y, W, bottomHeight);
            ctx.drawImage(headshot.canvas, 0, y, W, bottomHeight, chromaAmount, y, W, bottomHeight);
          }
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
        }

        const glowWindowMs = SCANLINE_GLOW_DECAY_MS;
        const glowWindowPairs = Math.max(
          1,
          Math.ceil((glowWindowMs / SCANLINE_ILLUMINATE_MS) * (SCANLINE_COUNT / 2)),
        );
        for (let i = 0; i < glowWindowPairs; i++) {
          const pairIdx = revealedPairs - i;
          if (pairIdx <= 0) break;
          const age = i / glowWindowPairs;
          const alpha = (1 - age) * 0.55;
          if (alpha <= 0.01) continue;
          const topY = Math.floor((midIndex - pairIdx) * bandH);
          const botY = Math.floor((midIndex + pairIdx - 1) * bandH);
          ctx.fillStyle = `rgba(107,194,183,${alpha})`;
          ctx.fillRect(0, topY, W, Math.ceil(bandH));
          ctx.fillRect(0, botY, W, Math.ceil(bandH));
        }
      }

      const retraceTravel = H * 1.5;
      const retraceY = -30 * dpr + retraceTravel * easeInOutQuart(bloomT);
      if (retraceY > -40 * dpr && retraceY < H + 40 * dpr) {
        const barH = 36 * dpr;
        const barGrad = ctx.createLinearGradient(0, retraceY - barH, 0, retraceY + barH);
        barGrad.addColorStop(0, "rgba(107,194,183,0)");
        barGrad.addColorStop(0.5, `rgba(230,255,248,${0.28 * (1 - bloomT * 0.4)})`);
        barGrad.addColorStop(1, "rgba(107,194,183,0)");
        ctx.fillStyle = barGrad;
        ctx.fillRect(0, retraceY - barH, W, barH * 2);
      }

      if (scanT >= 1) {
        const settleT = Math.min(1, (bloomElapsed - SCANLINE_ILLUMINATE_MS) / (EXIT_BLOOM_MS - SCANLINE_ILLUMINATE_MS));
        const eased2 = easeOutQuart(settleT);
        const scale = 1.025 - 0.025 * eased2;
        if (scale !== 1 && headshot) {
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 0.35 * (1 - eased2);
          ctx.translate(cx, cy);
          ctx.scale(scale, scale);
          ctx.translate(-cx, -cy);
          ctx.drawImage(headshot.canvas, 0, 0, W, H);
          ctx.restore();
        }
      }

      if (vignette) ctx.drawImage(vignette.canvas, 0, 0, W, H);
    }

    if (elapsed < EXIT_TOTAL_MS) {
      exitAnimRef.current = requestAnimationFrame(animateExit);
    } else {
      ctx.clearRect(0, 0, W, H);
      swappedRef.current = false;
      setExiting(false);
    }
  }, [ensureHeadshotCache, ensureVignetteCache, ensureBlurredProxy]);

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
