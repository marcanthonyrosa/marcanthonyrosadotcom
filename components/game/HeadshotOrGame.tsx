"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePostHog } from "posthog-js/react";
import { MAZE_TEMPLATE, COLS, ROWS, GHOST_STARTS } from "./mazeConfig";

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
const EXIT_PINCH_START = EXIT_COLLAPSE_MS;
const EXIT_HOLD_START = EXIT_COLLAPSE_MS + EXIT_PINCH_MS;
const EXIT_BLOOM_START = EXIT_COLLAPSE_MS + EXIT_PINCH_MS + EXIT_HOLD_MS;
const EXIT_TOTAL_MS = EXIT_BLOOM_START + EXIT_BLOOM_MS;

const CRT_BG = "#050708";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInQuart(t: number) {
  return t * t * t * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function buildNoiseCanvas() {
  const c = document.createElement("canvas");
  c.width = 160;
  c.height = 160;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const img = ctx.createImageData(160, 160);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 22;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

const PROXY_BEAR_COLORS = [
  "#3498db", "#2ecc71", "#1abc9c",
  "#27ae60", "#2980b9", "#16a085",
  "#00b894", "#0984e3",
];

function buildProxyCanvas() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  ctx.fillStyle = "#0d0d1a";
  ctx.fillRect(0, 0, 512, 512);

  const CS = 512 / ROWS;
  const offsetX = (512 - COLS * CS) / 2;

  ctx.save();
  ctx.translate(offsetX, 0);

  ctx.fillStyle = "#1a1aff";
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      if (MAZE_TEMPLATE[r][col] === 1) {
        ctx.fillRect(col * CS, r * CS, CS, CS);
      }
    }
  }
  ctx.strokeStyle = "#5566ff";
  ctx.lineWidth = 0.8;
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      if (MAZE_TEMPLATE[r][col] === 1) {
        ctx.strokeRect(col * CS + 0.5, r * CS + 0.5, CS - 1, CS - 1);
      }
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      const cell = MAZE_TEMPLATE[r][col];
      if (cell !== 2 && cell !== 3) continue;
      const cx = col * CS + CS / 2;
      const cy = r * CS + CS / 2;
      if (cell === 2) {
        ctx.fillStyle = PROXY_BEAR_COLORS[(col * 7 + r * 3) % PROXY_BEAR_COLORS.length];
        ctx.beginPath();
        ctx.arc(cx, cy, CS * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = PROXY_BEAR_COLORS[(col + r * 5) % PROXY_BEAR_COLORS.length];
        ctx.beginPath();
        ctx.arc(cx, cy, CS * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (const ghost of GHOST_STARTS) {
    const gx = ghost.col * CS + CS / 2;
    const gy = ghost.row * CS + CS / 2;
    const gr = CS * 0.4;
    const bR = gr / 3;
    const domeY = gy - gr * 0.15;
    const bodyBot = domeY + gr;
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.arc(gx, domeY, gr, Math.PI, 0, false);
    ctx.lineTo(gx + gr, bodyBot);
    ctx.arc(gx + gr - bR, bodyBot, bR, 0, Math.PI, false);
    ctx.arc(gx, bodyBot, bR, 0, Math.PI, false);
    ctx.arc(gx - gr + bR, bodyBot, bR, 0, Math.PI, false);
    ctx.lineTo(gx - gr, domeY);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(gx - gr * 0.32, domeY - gr * 0.08, gr * 0.2, gr * 0.27, 0, 0, Math.PI * 2);
    ctx.ellipse(gx + gr * 0.32, domeY - gr * 0.08, gr * 0.2, gr * 0.27, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0044ff";
    ctx.beginPath();
    ctx.arc(gx - gr * 0.28, domeY - gr * 0.06, gr * 0.11, 0, Math.PI * 2);
    ctx.arc(gx + gr * 0.36, domeY - gr * 0.06, gr * 0.11, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  ctx.fillStyle = "rgba(0,0,0,0.32)";
  for (let y = 0; y < 512; y += 3) {
    ctx.fillRect(0, y, 512, 1);
  }
  ctx.fillStyle = "rgba(107,194,183,0.05)";
  for (let y = 1; y < 512; y += 3) {
    ctx.fillRect(0, y, 512, 1);
  }
  return c;
}

function buildShadowMask() {
  const c = document.createElement("canvas");
  c.width = 1;
  c.height = 3;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.fillRect(0, 0, 1, 1);
  return c;
}

function drawVignette(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const r = Math.hypot(W, H) / 2;
  const g = ctx.createRadialGradient(W / 2, H / 2, r * 0.55, W / 2, H / 2, r);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawNoise(ctx: CanvasRenderingContext2D, noise: HTMLCanvasElement, W: number, H: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const nx = -Math.floor(Math.random() * noise.width);
  const ny = -Math.floor(Math.random() * noise.height);
  for (let y = ny; y < H; y += noise.height) {
    for (let x = nx; x < W; x += noise.width) {
      ctx.drawImage(noise, x, y);
    }
  }
  ctx.restore();
}

function drawPhosphorLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  dpr: number,
  coreAlpha: number,
  haloScale: number,
) {
  const halo = 30 * dpr * haloScale;
  const coreW = 2 * dpr;
  const grad = ctx.createLinearGradient(0, y - halo, 0, y + halo);
  grad.addColorStop(0, "rgba(107,194,183,0)");
  grad.addColorStop(0.5 - (coreW / halo) * 0.5, `rgba(107,194,183,${0.15 * coreAlpha})`);
  grad.addColorStop(0.5 - (coreW / halo) * 0.25, `rgba(107,194,183,${0.85 * coreAlpha})`);
  grad.addColorStop(0.5, `rgba(255,255,255,${0.9 * coreAlpha})`);
  grad.addColorStop(0.5 + (coreW / halo) * 0.25, `rgba(107,194,183,${0.85 * coreAlpha})`);
  grad.addColorStop(0.5 + (coreW / halo) * 0.5, `rgba(107,194,183,${0.15 * coreAlpha})`);
  grad.addColorStop(1, "rgba(107,194,183,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y - halo, w, halo * 2);
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
  const noiseRef = useRef<HTMLCanvasElement | null>(null);
  const proxyRef = useRef<HTMLCanvasElement | null>(null);
  const shadowMaskRef = useRef<HTMLCanvasElement | null>(null);
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

    if (!noiseRef.current) noiseRef.current = buildNoiseCanvas();
    if (!proxyRef.current) proxyRef.current = buildProxyCanvas();
    if (!shadowMaskRef.current) shadowMaskRef.current = buildShadowMask();
    const noise = noiseRef.current;
    const proxy = proxyRef.current;
    const shadowMask = shadowMaskRef.current;

    const elapsed = ts - exitStartRef.current;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;

    if (elapsed < EXIT_COLLAPSE_MS) {
      const raw = elapsed / EXIT_COLLAPSE_MS;
      const t = easeInOutCubic(raw);

      ctx.fillStyle = CRT_BG;
      ctx.fillRect(0, 0, W, H);

      const scaleY = Math.max(0.02, 1 - 0.98 * t);
      const jitterX = (Math.random() - 0.5) * 2 * dpr;

      ctx.save();
      ctx.translate(cx + jitterX, cy);
      ctx.scale(1, scaleY);
      ctx.drawImage(proxy, -W / 2, -H / 2, W, H);
      ctx.restore();

      const coreAlpha = 0.4 + 0.6 * t;
      const haloScale = 0.6 + 0.8 * t;
      drawPhosphorLine(ctx, 0, cy, W, dpr, coreAlpha, haloScale);

      const coreH = 3 * dpr + 5 * dpr * t;
      ctx.fillStyle = `rgba(255,255,255,${0.85 + 0.15 * t})`;
      ctx.fillRect(0, cy - coreH / 2, W, coreH);
    } else if (elapsed < EXIT_HOLD_START) {
      const raw = (elapsed - EXIT_PINCH_START) / EXIT_PINCH_MS;
      const t = easeInOutCubic(raw);

      ctx.fillStyle = CRT_BG;
      ctx.fillRect(0, 0, W, H);

      const halfW = (W / 2) * (1 - t);
      const jitterX = (Math.random() - 0.5) * 1.5 * dpr;

      const chromaOffset = (4 + 2 * t) * dpr;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = `rgba(255,60,60,${0.55 + 0.3 * t})`;
      ctx.fillRect(cx - halfW - chromaOffset + jitterX, cy - 2 * dpr, halfW * 2, 4 * dpr);
      ctx.fillStyle = `rgba(60,120,255,${0.55 + 0.3 * t})`;
      ctx.fillRect(cx - halfW + chromaOffset + jitterX, cy - 2 * dpr, halfW * 2, 4 * dpr);
      ctx.restore();

      drawPhosphorLine(ctx, cx - halfW + jitterX, cy, halfW * 2, dpr, 1, 1.3);

      const coreH = 4 * dpr;
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(cx - halfW + jitterX, cy - coreH / 2, halfW * 2, coreH);

      const pulse = 0.85 + 0.15 * Math.sin(raw * Math.PI * 3);
      const dotR = (8 + 6 * t) * dpr * pulse;
      const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR * 4);
      dotGrad.addColorStop(0, "rgba(255,255,255,1)");
      dotGrad.addColorStop(0.15, "rgba(230,255,250,0.95)");
      dotGrad.addColorStop(0.45, "rgba(107,194,183,0.7)");
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (elapsed < EXIT_BLOOM_START) {
      if (!swappedRef.current) {
        swappedRef.current = true;
        setPixelating(false);
        setPlaying(false);
      }
      ctx.fillStyle = CRT_BG;
      ctx.fillRect(0, 0, W, H);

      const raw = (elapsed - EXIT_HOLD_START) / EXIT_HOLD_MS;
      const decay = 1 - easeOutCubic(raw);

      const streakW = W * (0.45 + 0.35 * raw);
      const streakH = 2 * dpr + 2 * dpr * decay;
      const streakGrad = ctx.createLinearGradient(cx - streakW / 2, 0, cx + streakW / 2, 0);
      streakGrad.addColorStop(0, "rgba(107,194,183,0)");
      streakGrad.addColorStop(0.5, `rgba(107,194,183,${0.7 * decay})`);
      streakGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = streakGrad;
      ctx.fillRect(cx - streakW / 2, cy - streakH / 2, streakW, streakH);

      const dotR = (11 + 3 * raw) * dpr;
      const dotGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR * 4);
      dotGrad.addColorStop(0, `rgba(255,255,255,${0.95 * decay})`);
      dotGrad.addColorStop(0.2, `rgba(230,255,250,${0.8 * decay})`);
      dotGrad.addColorStop(0.5, `rgba(107,194,183,${0.55 * decay})`);
      dotGrad.addColorStop(1, "rgba(107,194,183,0)");
      ctx.fillStyle = dotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (elapsed < EXIT_TOTAL_MS) {
      const raw = (elapsed - EXIT_BLOOM_START) / EXIT_BLOOM_MS;
      const t = easeInOutCubic(raw);

      ctx.fillStyle = CRT_BG;
      ctx.fillRect(0, 0, W, H);

      const scaleY = Math.max(0.02, 0.02 + 0.98 * t);
      const jitterX = raw < 0.8 ? (Math.random() - 0.5) * 2 * dpr * (1 - raw / 0.8) : 0;

      const img = imgRef.current;
      if (img) {
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(W / iw, H / ih);
        const drawW = iw * scale;
        const drawH = ih * scale;

        ctx.save();
        ctx.translate(cx + jitterX, cy);
        ctx.scale(1, scaleY);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        if (raw < 0.35) {
          const chroma = (5 * dpr) * (1 - raw / 0.35);
          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.globalAlpha = 0.35;
          ctx.drawImage(img, -drawW / 2 - chroma, -drawH / 2, drawW, drawH);
          ctx.drawImage(img, -drawW / 2 + chroma, -drawH / 2, drawW, drawH);
          ctx.restore();
        }
        ctx.restore();
      }

      const maskAlpha = raw < 0.75 ? 1 : Math.max(0, 1 - (raw - 0.75) / 0.25);
      if (maskAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = maskAlpha;
        const pattern = ctx.createPattern(shadowMask, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, W, H);
        }
        ctx.restore();
      }

      const lineFade = 1 - easeOutCubic(raw);
      const coreAlpha = lineFade;
      const haloScale = 1 + 2 * easeOutCubic(raw);
      drawPhosphorLine(ctx, 0, cy, W, dpr, coreAlpha, haloScale);

      if (raw < 0.5) {
        const coreH = 3 * dpr * (1 - raw / 0.5);
        ctx.fillStyle = `rgba(255,255,255,${0.7 * (1 - raw / 0.5)})`;
        ctx.fillRect(0, cy - coreH / 2, W, coreH);
      }
    }

    if (elapsed < EXIT_TOTAL_MS) {
      drawNoise(ctx, noise, W, H, 0.08);
      drawVignette(ctx, W, H);
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
