export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NONE";
export type GhostMode = "CHASE" | "SCATTER" | "FRIGHTENED" | "EATEN";
export type GamePhase = "IDLE" | "PLAYING" | "PAUSED" | "WIN" | "LOSE";

export interface Vec2 {
  x: number;
  y: number;
}

export interface Player {
  // pixel position (centre of cell)
  x: number;
  y: number;
  dir: Direction;
  nextDir: Direction;
  mouthAngle: number;   // 0–0.25 (fraction of full circle eaten away)
  mouthOpen: boolean;   // chomping toggle
  mouthTimer: number;
}

export interface Ghost {
  id: number;
  x: number;
  y: number;
  dir: Direction;
  mode: GhostMode;
  frightenedTimer: number;
  color: string;
  scatterTarget: Vec2; // fixed corner to scatter to
}

export interface GameState {
  phase: GamePhase;
  score: number;
  lives: number;
  pelletsLeft: number;
  frightenedTimer: number; // global countdown
  ghostEatChain: number;   // ghosts eaten during current power pellet (resets each power pellet)
  modePhase: number;       // index into the scatter/chase cycle
  modeTimer: number;       // ms remaining in current cycle phase
  fruit: { x: number; y: number; timer: number; points: number; color: string } | null;
  fruitSpawned: number;    // how many times fruit has spawned this level (0–2)
  player: Player;
  ghosts: Ghost[];
  maze: number[][];        // mutable copy consumed as game progresses
}

// Cell type constants
export const CELL = {
  WALL: 1,
  PELLET: 2,
  POWER: 3,
  EMPTY: 0,
  GHOST_HOUSE: 4,
} as const;
