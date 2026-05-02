"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "onLoad"> & {
  /** Animation duration in ms (default 800) */
  revealDuration?: number;
  /** Starting pixel block size (default 40) */
  maxPixelSize?: number;
};

export default function PixelRevealImage({
  revealDuration = 800,
  maxPixelSize = 40,
  style,
  ...imageProps
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const startedRef = useRef(false);

  const drawPixelated = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement, pixelSize: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;

      if (pixelSize <= 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, W, H);
        return;
      }

      const offW = Math.max(1, Math.ceil(W / pixelSize));
      const offH = Math.max(1, Math.ceil(H / pixelSize));

      if (!offscreenRef.current) {
        offscreenRef.current = document.createElement("canvas");
      }
      const off = offscreenRef.current;
      off.width = offW;
      off.height = offH;

      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(img, 0, 0, offW, offH);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, offW, offH, 0, 0, W, H);
    },
    [],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Draw the initial fully-pixelated frame immediately
      drawPixelated(canvas, img, maxPixelSize);
    },
    [drawPixelated, maxPixelSize],
  );

  const animate = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / revealDuration, 1);

        // Ease out cubic
        const ease = 1 - Math.pow(1 - t, 3);
        const pixelSize = Math.max(1, Math.round(maxPixelSize * (1 - ease)));

        if (pixelSize <= 1) {
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(img, 0, 0, W, H);
          setRevealed(true);
          return;
        }

        drawPixelated(canvas, img, pixelSize);
        animRef.current = requestAnimationFrame(tick);
      };

      animRef.current = requestAnimationFrame(tick);
    },
    [revealDuration, maxPixelSize, drawPixelated],
  );

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    const src =
      typeof imageProps.src === "string"
        ? imageProps.src
        : "src" in (imageProps.src as object)
          ? (imageProps.src as { src: string }).src
          : "";
    img.src = src;

    img.onload = () => {
      imgRef.current = img;

      const canvas = canvasRef.current;
      if (!canvas) return;

      setupCanvas(canvas, img);

      // Hold the pixelated frame briefly so it's always visible,
      // then animate to full resolution
      setTimeout(() => {
        animate(canvas, img);
      }, 150);
    };

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [imageProps.src, animate, setupCanvas]);

  const w = Number(imageProps.width) || 0;
  const h = Number(imageProps.height) || 0;
  const aspect = w && h ? `${w} / ${h}` : undefined;

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: aspect, overflow: "hidden" }}>
      {/* Canvas for pixelation animation */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            imageRendering: "pixelated",
            background: "var(--surface)",
            zIndex: 1,
          }}
        />
      )}

      {/* Real Next.js Image, hidden until reveal completes */}
      <Image
        {...imageProps}
        style={{
          ...style,
          opacity: revealed ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      />
    </div>
  );
}
