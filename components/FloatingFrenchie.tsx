"use client";

import { useState, useEffect, useRef } from "react";

type PetState = "idle" | "walking";
type Direction = "left" | "right";
type EyeDirection = "center" | "left" | "right";

// Pixel grid for the frenchie body (0=transparent, 1=black, 2=white)
// Eyes and paws are rendered separately for animation
const BODY_PIXELS: number[][] = [
  //0 1 2 3 4 5 6 7 8 9 0 1 2 3
  [0,0,1,1,0,0,0,0,0,0,1,1,0,0], // 0  ear tips
  [0,1,1,1,0,0,0,0,0,0,1,1,1,0], // 1  ear outer
  [0,1,2,1,0,0,0,0,0,0,1,2,1,0], // 2  ear inner
  [0,1,2,1,1,1,1,1,1,1,1,2,1,0], // 3  ears meet head
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0], // 4  forehead
  [0,0,1,0,0,1,1,1,0,0,1,0,0,0], // 5  eye row top (eyes overlaid)
  [0,0,1,0,0,1,1,1,0,0,1,0,0,0], // 6  eye row bottom
  [0,0,0,1,1,2,2,2,1,1,0,0,0,0], // 7  upper muzzle
  [0,0,0,1,2,2,1,2,2,1,0,0,0,0], // 8  nose/mouth
  [0,0,0,0,1,1,1,1,1,0,0,0,0,0], // 9  chin
  [0,0,0,1,1,1,1,1,1,1,0,0,0,0], // 10 neck
  [0,0,1,1,1,1,1,1,1,1,1,0,0,0], // 11 upper body
  [0,1,1,1,1,1,1,1,1,1,1,1,0,0], // 12 body
  [0,1,1,1,1,1,1,1,1,1,1,1,0,0], // 13 body
];

const LEFT_EYE = [
  { x: 3, y: 5 }, { x: 4, y: 5 },
  { x: 3, y: 6 }, { x: 4, y: 6 },
];

const RIGHT_EYE = [
  { x: 8, y: 5 }, { x: 9, y: 5 },
  { x: 8, y: 6 }, { x: 9, y: 6 },
];

const LEFT_LEG = [
  { x: 1, y: 14 }, { x: 2, y: 14 },
  { x: 1, y: 15 }, { x: 2, y: 15 },
  { x: 0, y: 16 }, { x: 1, y: 16 }, { x: 2, y: 16 },
];

const RIGHT_LEG = [
  { x: 10, y: 14 }, { x: 11, y: 14 },
  { x: 10, y: 15 }, { x: 11, y: 15 },
  { x: 10, y: 16 }, { x: 11, y: 16 }, { x: 12, y: 16 },
];

const BODY_BOTTOM = [
  { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 },
  { x: 5, y: 15 }, { x: 6, y: 15 }, { x: 7, y: 15 },
];

// Pupil pixel offset for each gaze direction
const PUPIL_OFFSETS: Record<EyeDirection, { dx: number; dy: number }> = {
  center: { dx: 0.5, dy: 0.5 },
  left:   { dx: 0,   dy: 0.5 },
  right:  { dx: 1,   dy: 0.5 },
};

const S = 5; // pixel scale
const SVG_W = 14 * S;
const SVG_H = 18 * S; // extra row for paw bounce room

function Px({ x, y, color }: { x: number; y: number; color: string }) {
  return <rect x={x * S} y={y * S} width={S} height={S} fill={color} />;
}

export function FloatingFrenchie() {
  const [isLocal, setIsLocal] = useState(false);
  const [petState, setPetState] = useState<PetState>("idle");
  const [direction, setDirection] = useState<Direction>("right");
  const [eyeDir, setEyeDir] = useState<EyeDirection>("center");
  const [position, setPosition] = useState(50);
  const [walkFrame, setWalkFrame] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [bounce, setBounce] = useState(0);

  useEffect(() => {
    setIsLocal(window.location.hostname === "localhost");
  }, []);

  const posRef = useRef(position);
  posRef.current = position;
  const stateRef = useRef(petState);
  stateRef.current = petState;
  const dirRef = useRef(direction);
  dirRef.current = direction;

  // Walk frame cycling
  useEffect(() => {
    if (petState !== "walking") { setBounce(0); return; }
    const id = setInterval(() => {
      setWalkFrame((f) => {
        const next = (f + 1) % 2;
        setBounce(next === 0 ? -2 : 0);
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, [petState]);

  // Movement
  useEffect(() => {
    if (petState !== "walking") return;
    const id = setInterval(() => {
      setPosition((p) => {
        const delta = dirRef.current === "right" ? 0.35 : -0.35;
        const next = p + delta;
        if (next > 90 || next < 5) { setPetState("idle"); return p; }
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [petState]);

  // State machine
  useEffect(() => {
    const delay = petState === "idle"
      ? 1500 + Math.random() * 3000
      : 2500 + Math.random() * 5000;
    const t = setTimeout(() => {
      if (stateRef.current === "idle") {
        let d: Direction;
        if (posRef.current < 15) d = "right";
        else if (posRef.current > 85) d = "left";
        else d = Math.random() > 0.5 ? "right" : "left";
        setDirection(d);
        setEyeDir(d);
        setPetState("walking");
      } else {
        setPetState("idle");
        setEyeDir("center");
      }
    }, delay);
    return () => clearTimeout(t);
  }, [petState]);

  // Idle eye wandering
  useEffect(() => {
    if (petState !== "idle") return;
    const dirs: EyeDirection[] = ["left", "center", "right", "center", "center"];
    const id = setInterval(() => {
      setEyeDir(dirs[Math.floor(Math.random() * dirs.length)]);
    }, 1800 + Math.random() * 2200);
    return () => clearInterval(id);
  }, [petState]);

  // Blinking
  useEffect(() => {
    const id = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 130);
    }, 2500 + Math.random() * 3500);
    return () => clearInterval(id);
  }, []);

  const pup = PUPIL_OFFSETS[eyeDir];
  const lDy = petState === "walking" ? (walkFrame === 0 ? -1 : 0.5) : 0;
  const rDy = petState === "walking" ? (walkFrame === 0 ? 0.5 : -1) : 0;

  if (!isLocal) return null;

  return (
    <div
      className="fixed z-30 pointer-events-none select-none"
      style={{
        left: `${position}%`,
        bottom: 4,
        transform: `translateX(-50%) translateY(${bounce}px)`,
      }}
      aria-hidden="true"
    >
      <svg
        width={SVG_W}
        height={SVG_H}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="drop-shadow-[0_0_1px_rgba(255,255,255,0.6)] dark:drop-shadow-[0_0_3px_rgba(200,210,230,0.5)]"
        style={{
          transform: direction === "left" ? "scaleX(-1)" : "none",
          display: "block",
        }}
      >
        {/* Main body */}
        {BODY_PIXELS.flatMap((row, y) =>
          row.map((v, x) =>
            v === 0 ? null : (
              <Px key={`b${x},${y}`} x={x} y={y} color={v === 1 ? "#1a1a1a" : "#ffffff"} />
            )
          )
        )}

        {/* Body bottom between legs (static) */}
        {BODY_BOTTOM.map((p) => (
          <Px key={`bb${p.x},${p.y}`} x={p.x} y={p.y} color="#1a1a1a" />
        ))}

        {/* Left leg */}
        <g style={{ transform: `translateY(${lDy * S}px)`, transition: "transform 0.16s ease" }}>
          {LEFT_LEG.map((p) => (
            <Px key={`ll${p.x},${p.y}`} x={p.x} y={p.y} color="#1a1a1a" />
          ))}
        </g>

        {/* Right leg */}
        <g style={{ transform: `translateY(${rDy * S}px)`, transition: "transform 0.16s ease" }}>
          {RIGHT_LEG.map((p) => (
            <Px key={`rl${p.x},${p.y}`} x={p.x} y={p.y} color="#1a1a1a" />
          ))}
        </g>

        {/* Eyes */}
        {!isBlinking ? (
          <>
            {/* Left eye sclera */}
            {LEFT_EYE.map((p) => (
              <Px key={`le${p.x},${p.y}`} x={p.x} y={p.y} color="#ffffff" />
            ))}
            {/* Left pupil */}
            <g style={{ transition: "transform 0.2s ease" }}>
              <rect
                x={(3 + pup.dx) * S}
                y={(5 + pup.dy) * S}
                width={S}
                height={S}
                fill="#1a1a1a"
              />
            </g>

            {/* Right eye sclera */}
            {RIGHT_EYE.map((p) => (
              <Px key={`re${p.x},${p.y}`} x={p.x} y={p.y} color="#ffffff" />
            ))}
            {/* Right pupil */}
            <g style={{ transition: "transform 0.2s ease" }}>
              <rect
                x={(8 + pup.dx) * S}
                y={(5 + pup.dy) * S}
                width={S}
                height={S}
                fill="#1a1a1a"
              />
            </g>
          </>
        ) : (
          <>
            {/* Blink: thin line for closed eyes */}
            <rect x={3 * S} y={5.5 * S} width={2 * S} height={S * 0.4} fill="#1a1a1a" />
            <rect x={8 * S} y={5.5 * S} width={2 * S} height={S * 0.4} fill="#1a1a1a" />
          </>
        )}
      </svg>
    </div>
  );
}
