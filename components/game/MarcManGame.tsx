"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  MAZE_TEMPLATE, COLS, ROWS,
  PLAYER_START, GHOST_STARTS, GHOST_HOUSE_EXIT,
  countPellets, cloneMaze,
} from "./mazeConfig";
import { Direction, GamePhase, GameState, Ghost, CELL } from "./types";

/* ─── Constants ──────────────────────────────────────────── */
const CS   = 28;                  // cell size px
const CW   = COLS * CS;
const CH   = ROWS * CS;
const SPEED        = 2.5;
const GHOST_SPEED  = 2.0;
const FRIGHTEN_MS  = 7000;
const LIVES_START  = 3;

// Gummy bear color palette — cycles by grid position
const BEAR_COLORS = [
  "#e74c3c", "#3498db", "#2ecc71",
  "#f39c12", "#9b59b6", "#e91e63",
  "#1abc9c", "#e67e22",
];

/* ─── Grid helpers ───────────────────────────────────────── */
function cellCenter(col: number, row: number) {
  return { x: col * CS + CS / 2, y: row * CS + CS / 2 };
}
// nearest cell index from pixel centre
function toCol(px: number) { return Math.round((px - CS / 2) / CS); }
function toRow(py: number) { return Math.round((py - CS / 2) / CS); }

function isWall(maze: number[][], col: number, row: number): boolean {
  if (row < 0 || row >= ROWS) return true;
  if (col < 0 || col >= COLS) return false; // tunnel
  return maze[row][col] === CELL.WALL;
}

function dirVec(dir: Direction) {
  switch (dir) {
    case "UP":    return { dx:  0, dy: -1 };
    case "DOWN":  return { dx:  0, dy:  1 };
    case "LEFT":  return { dx: -1, dy:  0 };
    case "RIGHT": return { dx:  1, dy:  0 };
    default:      return { dx:  0, dy:  0 };
  }
}

function opposite(dir: Direction): Direction {
  switch (dir) {
    case "UP":    return "DOWN";
    case "DOWN":  return "UP";
    case "LEFT":  return "RIGHT";
    case "RIGHT": return "LEFT";
    default:      return "NONE";
  }
}

function wrapCol(c: number) {
  if (c < 0) return COLS - 1;
  if (c >= COLS) return 0;
  return c;
}

/* ─── Initial state ──────────────────────────────────────── */
function makeInitialState(): GameState {
  const maze = cloneMaze(MAZE_TEMPLATE);
  const pc = cellCenter(PLAYER_START.col, PLAYER_START.row);
  const initDirs: Direction[] = ["LEFT", "LEFT", "RIGHT", "RIGHT"];

  const ghosts: Ghost[] = GHOST_STARTS.map((gs, i) => {
    const gc = cellCenter(gs.col, gs.row);
    return {
      id: i,
      x: gc.x, y: gc.y,
      dir: initDirs[i],
      mode: i === 0 ? "CHASE" : "SCATTER",
      frightenedTimer: 0,
      color: gs.color,
      scatterTarget: gs.scatter,
    };
  });

  return {
    phase: "PLAYING",
    score: 0,
    lives: LIVES_START,
    pelletsLeft: countPellets(maze),
    frightenedTimer: 0,
    player: {
      x: pc.x, y: pc.y,
      dir: "NONE", nextDir: "LEFT",
      mouthAngle: 0, mouthOpen: false, mouthTimer: 0,
    },
    ghosts,
    maze,
  };
}

/* ─── Ghost AI ───────────────────────────────────────────── */
function chooseGhostDir(
  g: Ghost,
  maze: number[][],
  px: number, py: number,
  inHouse: boolean,
): Direction {
  const col = toCol(g.x);
  const row = toRow(g.y);

  // While inside ghost house: always move UP toward the exit
  if (inHouse) {
    // Try UP first; fall back to lateral bounce
    if (!isWall(maze, col, row - 1) && maze[row - 1]?.[col] !== CELL.WALL) return "UP";
    return g.dir === "RIGHT" ? "LEFT" : "RIGHT";
  }

  const opp = opposite(g.dir);
  const dirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];

  const valid = dirs.filter(d => {
    if (d === opp) return false;
    const { dx, dy } = dirVec(d);
    const nc = wrapCol(col + dx);
    const nr = row + dy;
    if (nr < 0 || nr >= ROWS) return false;
    if (isWall(maze, nc, nr)) return false;
    if (maze[nr][nc] === CELL.GHOST_HOUSE) return false;
    return true;
  });

  if (valid.length === 0) return opp === "NONE" ? "LEFT" : opp;

  if (g.mode === "FRIGHTENED") {
    return valid[Math.floor(Math.random() * valid.length)];
  }

  const tx = g.mode === "CHASE" ? px : g.scatterTarget.x * CS;
  const ty = g.mode === "CHASE" ? py : g.scatterTarget.y * CS;

  let best = valid[0];
  let bestDist = Infinity;
  for (const d of valid) {
    const { dx, dy } = dirVec(d);
    const dist = (g.x + dx * CS - tx) ** 2 + (g.y + dy * CS - ty) ** 2;
    if (dist < bestDist) { bestDist = dist; best = d; }
  }
  return best;
}

/* ─── Component ──────────────────────────────────────────── */
export default function MarcManGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<GameState>(makeInitialState());
  const rafRef    = useRef<number>(0);
  const lastRef   = useRef<number>(0);
  const imgRef    = useRef<HTMLImageElement | null>(null);
  const phaseRef  = useRef<GamePhase>("PLAYING");

  // pre-load headshot
  useEffect(() => {
    const head = new Image();
    head.src = "/headshot.jpeg";
    head.onload = () => { imgRef.current = head; };
  }, []);

  // keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onExit(); return; }
      if (e.key === "r" || e.key === "R") {
        stateRef.current = makeInitialState();
        phaseRef.current = "PLAYING";
        return;
      }
      const map: Record<string, Direction> = {
        ArrowUp: "UP", ArrowDown: "DOWN",
        ArrowLeft: "LEFT", ArrowRight: "RIGHT",
      };
      if (map[e.key]) {
        e.preventDefault();
        stateRef.current.player.nextDir = map[e.key];
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  // touch swipe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let sx = 0, sy = 0;
    const ts = (e: TouchEvent) => { e.preventDefault(); sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    const tm = (e: TouchEvent) => { e.preventDefault(); };
    const te = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      stateRef.current.player.nextDir =
        Math.abs(dx) > Math.abs(dy)
          ? (dx > 0 ? "RIGHT" : "LEFT")
          : (dy > 0 ? "DOWN"  : "UP");
    };
    canvas.addEventListener("touchstart", ts, { passive: false });
    canvas.addEventListener("touchmove", tm, { passive: false });
    canvas.addEventListener("touchend", te);
    return () => { canvas.removeEventListener("touchstart", ts); canvas.removeEventListener("touchmove", tm); canvas.removeEventListener("touchend", te); };
  }, []);

  const tick = useCallback((ts: number) => {
    const dt = Math.min(ts - lastRef.current, 50);
    lastRef.current = ts;
    const s = stateRef.current;
    if (s.phase === "PLAYING") {
      updatePlayer(s);
      updateGhosts(s, dt);
      checkCollisions(s);
      if (s.pelletsLeft === 0) s.phase = "WIN";
      phaseRef.current = s.phase;
    }
    render(canvasRef.current, s, imgRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  function restart() {
    stateRef.current = makeInitialState();
    phaseRef.current = "PLAYING";
  }

  return (
    <div className="relative w-full" style={{ maxWidth: CW }}>
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="w-full"
        style={{ display: "block", borderRadius: 16, imageRendering: "pixelated" }}
      />
      <div className="absolute top-2 right-2 flex gap-2" style={{ zIndex: 10 }}>
        <button onClick={restart}
          className="px-2 py-1 rounded text-xs font-bold"
          style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
          ↺ Restart
        </button>
        <button onClick={onExit}
          className="px-2 py-1 rounded text-xs font-bold"
          style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
          ✕ Exit
        </button>
      </div>
    </div>
  );
}

/* ─── Update: Player ─────────────────────────────────────── */
function updatePlayer(s: GameState) {
  const p = s.player;
  const col = toCol(p.x);
  const row = toRow(p.y);
  const cx  = cellCenter(col, row);

  // attempt turn when aligned to cell centre
  if (p.nextDir !== "NONE" && p.nextDir !== p.dir) {
    const { dx, dy } = dirVec(p.nextDir);
    const nc = wrapCol(col + dx);
    const nr = row + dy;
    const aligned =
      Math.abs(p.x - cx.x) < SPEED + 1 &&
      Math.abs(p.y - cx.y) < SPEED + 1;
    if (aligned && !isWall(s.maze, nc, nr)) {
      p.dir = p.nextDir;
      p.x = cx.x; p.y = cx.y;
    }
  }

  if (p.dir !== "NONE") {
    const { dx, dy } = dirVec(p.dir);
    // use integer-cell look-ahead to check wall
    const nextCol = wrapCol(col + dx);
    const nextRow = row + dy;
    if (!isWall(s.maze, nextCol, nextRow)) {
      p.x += dx * SPEED;
      p.y += dy * SPEED;
    } else {
      p.x = cx.x; p.y = cx.y;
    }
    if (p.x < 0) p.x = CW - 1;
    if (p.x >= CW) p.x = 1;

    // eat
    const cell = s.maze[row]?.[col];
    if (cell === CELL.PELLET) {
      s.maze[row][col] = CELL.EMPTY;
      s.score += 10; s.pelletsLeft--;
    } else if (cell === CELL.POWER) {
      s.maze[row][col] = CELL.EMPTY;
      s.score += 50; s.pelletsLeft--;
      s.frightenedTimer = FRIGHTEN_MS;
      s.ghosts.forEach(g => {
        g.mode = "FRIGHTENED";
        g.frightenedTimer = FRIGHTEN_MS;
        g.dir = opposite(g.dir);
      });
    }
  }
}

/* ─── Update: Ghosts ─────────────────────────────────────── */
function updateGhosts(s: GameState, dt: number) {
  s.frightenedTimer = Math.max(0, s.frightenedTimer - dt);

  for (const g of s.ghosts) {
    if (g.mode === "FRIGHTENED") {
      g.frightenedTimer = Math.max(0, g.frightenedTimer - dt);
      if (g.frightenedTimer === 0) g.mode = "CHASE";
    }

    const col = toCol(g.x);
    const row = toRow(g.y);
    const cx  = cellCenter(col, row);
    const inHouse = s.maze[row]?.[col] === CELL.GHOST_HOUSE;

    // ── Snap + re-evaluate direction only when within 1 px of a cell centre.
    // Using a tight threshold (< 1.0) prevents the old bug where a 2px/frame
    // ghost was always "within GHOST_SPEED+1" of centre and got snapped back
    // every single tick, making it oscillate in place.
    if (Math.hypot(g.x - cx.x, g.y - cx.y) < 1.0) {
      g.x = cx.x;
      g.y = cx.y;
      g.dir = chooseGhostDir(g, s.maze, s.player.x, s.player.y, inHouse);
    }

    // Move unconditionally — direction is already validated at each cell centre.
    const { dx, dy } = dirVec(g.dir);
    g.x += dx * GHOST_SPEED;
    g.y += dy * GHOST_SPEED;
    if (g.x < 0) g.x = CW - 1;
    if (g.x >= CW) g.x = 1;
  }
}

/* ─── Collision ──────────────────────────────────────────── */
function checkCollisions(s: GameState) {
  const p = s.player;
  for (const g of s.ghosts) {
    if (Math.hypot(p.x - g.x, p.y - g.y) >= CS * 0.65) continue;
    if (g.mode === "FRIGHTENED") {
      s.score += 200;
      const home = cellCenter(GHOST_HOUSE_EXIT.col, GHOST_HOUSE_EXIT.row);
      g.x = home.x; g.y = home.y;
      g.mode = "SCATTER"; g.dir = "LEFT";
    } else if (g.mode !== "EATEN") {
      s.lives--;
      if (s.lives <= 0) {
        s.phase = "LOSE";
      } else {
        const pc = cellCenter(PLAYER_START.col, PLAYER_START.row);
        p.x = pc.x; p.y = pc.y; p.dir = "NONE"; p.nextDir = "LEFT";
        GHOST_STARTS.forEach((gs, i) => {
          const gc = cellCenter(gs.col, gs.row);
          const dirs: Direction[] = ["LEFT", "LEFT", "RIGHT", "RIGHT"];
          s.ghosts[i].x = gc.x; s.ghosts[i].y = gc.y;
          s.ghosts[i].dir = dirs[i];
          s.ghosts[i].mode = i === 0 ? "CHASE" : "SCATTER";
        });
      }
    }
  }
}

/* ─── Render ─────────────────────────────────────────────── */
function render(
  canvas: HTMLCanvasElement | null,
  s: GameState,
  head: HTMLImageElement | null,
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#0d0d1a";
  ctx.fillRect(0, 0, CW, CH);

  // maze cells
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = s.maze[r][c];
      if (cell === CELL.WALL) {
        drawWall(ctx, c, r, s.maze);
      } else if (cell === CELL.PELLET) {
        const color = BEAR_COLORS[(c * 7 + r * 3) % BEAR_COLORS.length];
        drawBear(ctx, c * CS + CS * 0.13, r * CS + CS * 0.04, CS * 0.74, color);
      } else if (cell === CELL.POWER) {
        const color = BEAR_COLORS[(c + r * 5) % BEAR_COLORS.length];
        drawBear(ctx, c * CS + CS * 0.04, r * CS, CS * 0.92, color);
      }
    }
  }

  s.ghosts.forEach(g => drawGhost(ctx, g));
  drawPlayer(ctx, s.player, head);
  drawHUD(ctx, s);
  if (s.phase === "WIN" || s.phase === "LOSE") drawOverlay(ctx, s.phase, s.score);
}

/* ─── Wall ───────────────────────────────────────────────── */
function drawWall(ctx: CanvasRenderingContext2D, c: number, r: number, maze: number[][]) {
  const px = c * CS, py = r * CS;
  ctx.fillStyle = "#1a1aff";
  ctx.fillRect(px, py, CS, CS);

  const pad = 3;
  ctx.strokeStyle = "#5566ff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const N = maze[r-1]?.[c] === CELL.WALL;
  const S = maze[r+1]?.[c] === CELL.WALL;
  const W = maze[r]?.[c-1] === CELL.WALL;
  const E = maze[r]?.[c+1] === CELL.WALL;
  if (!N) { ctx.moveTo(px + pad, py + pad);       ctx.lineTo(px + CS - pad, py + pad); }
  if (!S) { ctx.moveTo(px + pad, py + CS - pad);  ctx.lineTo(px + CS - pad, py + CS - pad); }
  if (!W) { ctx.moveTo(px + pad, py + pad);       ctx.lineTo(px + pad, py + CS - pad); }
  if (!E) { ctx.moveTo(px + CS - pad, py + pad);  ctx.lineTo(px + CS - pad, py + CS - pad); }
  ctx.stroke();
}

/* ─── Gummy Bear (canvas-drawn, coloured) ────────────────── */
function drawBear(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, size: number, color: string,
) {
  const w  = size * 0.62;
  const h  = size;
  const cx = x + w / 2;
  const cy = y + h * 0.5;

  // body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.05, w * 0.42, h * 0.33, 0, 0, Math.PI * 2);
  ctx.fill();
  // head
  ctx.beginPath();
  ctx.arc(cx, cy - h * 0.22, w * 0.34, 0, Math.PI * 2);
  ctx.fill();
  // ears
  ctx.beginPath();
  ctx.arc(cx - w * 0.2, cy - h * 0.44, w * 0.12, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.2, cy - h * 0.44, w * 0.12, 0, Math.PI * 2);
  ctx.fill();
  // arms
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.5, cy, w * 0.1, h * 0.16, -0.4, 0, Math.PI * 2);
  ctx.ellipse(cx + w * 0.5, cy, w * 0.1, h * 0.16,  0.4, 0, Math.PI * 2);
  ctx.fill();
  // legs
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.2, cy + h * 0.37, w * 0.14, h * 0.11, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + w * 0.2, cy + h * 0.37, w * 0.14, h * 0.11, 0, 0, Math.PI * 2);
  ctx.fill();
  // belly highlight
  ctx.fillStyle = color + "66";
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.07, w * 0.18, h * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();
  // eyes
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.arc(cx - w * 0.11, cy - h * 0.25, w * 0.06, 0, Math.PI * 2);
  ctx.arc(cx + w * 0.11, cy - h * 0.25, w * 0.06, 0, Math.PI * 2);
  ctx.fill();
}

/* ─── Ghost ──────────────────────────────────────────────── */
function drawGhost(ctx: CanvasRenderingContext2D, g: Ghost) {
  const x = g.x, y = g.y;
  // r controls width; total height = 2r (dome) + bR (bumps), centred at (x,y)
  const r  = CS * 0.41;
  const bR = r / 3;   // 3 equal bumps filling width 2r
  // Shift up by half the extra bump height so ghost is vertically centred in cell
  const oy = -bR / 2;

  const frightened = g.mode === "FRIGHTENED";
  const flash = frightened && g.frightenedTimer < 2000 && Math.floor(g.frightenedTimer / 250) % 2 === 0;
  ctx.fillStyle = flash ? "#ffffff" : frightened ? "#2121de" : g.color;

  // dome centre sits at (x, y + oy); dome top at (x, y + oy - r)
  const domeY    = y + oy;        // centre of the dome circle
  const bodyBot  = domeY + r;     // where the straight sides end / bumps begin

  ctx.beginPath();
  // ① top dome: clockwise arc from left=(x-r,domeY) over the top to right=(x+r,domeY)
  ctx.arc(x, domeY, r, Math.PI, 0, false);
  // ② right side straight down to bump baseline
  ctx.lineTo(x + r, bodyBot);
  // ③ three scalloped bumps along the bottom, each a clockwise downward arc
  //    bR = r/3 so the three arcs tile perfectly: total width = 6bR = 2r ✓
  ctx.arc(x + r - bR,   bodyBot, bR, 0, Math.PI, false); // right bump
  ctx.arc(x,            bodyBot, bR, 0, Math.PI, false); // centre bump
  ctx.arc(x - r + bR,   bodyBot, bR, 0, Math.PI, false); // left bump
  // ④ left side back up (arc start was at x-r, domeY)
  ctx.lineTo(x - r, domeY);
  ctx.closePath();
  ctx.fill();

  if (!frightened) {
    // white eye whites
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(x - r * 0.32, domeY - r * 0.08, r * 0.2, r * 0.27, 0, 0, Math.PI * 2);
    ctx.ellipse(x + r * 0.32, domeY - r * 0.08, r * 0.2, r * 0.27, 0, 0, Math.PI * 2);
    ctx.fill();
    // blue pupils
    ctx.fillStyle = "#0044ff";
    ctx.beginPath();
    ctx.arc(x - r * 0.28, domeY - r * 0.06, r * 0.11, 0, Math.PI * 2);
    ctx.arc(x + r * 0.36, domeY - r * 0.06, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // frightened: dot eyes + wavy mouth
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x - r * 0.3, domeY - r * 0.05, r * 0.09, 0, Math.PI * 2);
    ctx.arc(x + r * 0.3, domeY - r * 0.05, r * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - r * 0.38, domeY + r * 0.3);
    ctx.quadraticCurveTo(x - r * 0.18, domeY + r * 0.45, x,            domeY + r * 0.3);
    ctx.quadraticCurveTo(x + r * 0.18, domeY + r * 0.15, x + r * 0.38, domeY + r * 0.3);
    ctx.stroke();
  }
}

/* ─── Player (circular headshot, no mouth) ───────────────── */
function drawPlayer(
  ctx: CanvasRenderingContext2D,
  p: GameState["player"],
  head: HTMLImageElement | null,
) {
  const r = CS * 0.44;
  ctx.save();
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.clip();
  if (head) {
    ctx.drawImage(head, p.x - r, p.y - r, r * 2, r * 2);
  } else {
    ctx.fillStyle = "#f1c40f";
    ctx.fill();
  }
  ctx.restore();
}

/* ─── HUD ────────────────────────────────────────────────── */
function drawHUD(ctx: CanvasRenderingContext2D, s: GameState) {
  const y = CS * 0.68;
  ctx.font = "bold 13px 'Courier New', monospace";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${s.score}`, 6, y);
  ctx.textAlign = "right";
  ctx.fillText("♥".repeat(s.lives), CW - 6, y);
}

/* ─── Overlay ────────────────────────────────────────────── */
function drawOverlay(ctx: CanvasRenderingContext2D, phase: GamePhase, score: number) {
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, CW, CH);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = phase === "WIN" ? "#f1c40f" : "#e74c3c";
  ctx.font = "bold 36px 'Courier New', monospace";
  ctx.fillText(phase === "WIN" ? "YOU WIN! 🎉" : "GAME OVER", CW / 2, CH / 2 - 28);
  ctx.fillStyle = "#ffffff";
  ctx.font = "18px 'Courier New', monospace";
  ctx.fillText(`Score: ${score}`, CW / 2, CH / 2 + 12);
  ctx.fillStyle = "#aaaaaa";
  ctx.font = "14px 'Courier New', monospace";
  ctx.fillText("R to restart · ESC to exit", CW / 2, CH / 2 + 44);
}
