# Ghost Freeze Bug Fix — Targeted Instructions for Claude Code

## IMPORTANT: Read this file only. Do NOT explore the codebase beyond the specific lines listed below.

---

## The Problem (Already Diagnosed — Do Not Re-Investigate)

On level 1→2 transition, ghosts freeze. Root cause is two compounding issues:

1. **`checkCollisions` has no early-exit guard** — after setting `s.phase = "DYING"`, it continues iterating ghosts, allowing multiple ghosts to overwrite `s.phase` and decrement `s.lives` repeatedly.

2. **Level reset doesn't reinitialize collision/phase state** — on the first tick of level 2, stale phase state can cause immediate incorrect collision resolution.

---

## Changes Already Applied (DO NOT RE-APPLY)

The following fixes have already been implemented. Do not add them again.

### Fix 1 — Early-exit guard in `checkCollisions` ✅ DONE

In `components/game/MarcManGame.tsx`, inside the ghost loop in `checkCollisions`:

```js
} else if (g.mode !== "EATEN") {
  s.lives--;
  s.fruit = null;
  s.phase = "DYING";
  s.dyingTimer = DYING_MS;
  break; // prevents subsequent ghosts from overwriting phase/lives
}
```

### Fix 2 — Reset `s.phase` on level transition ✅ DONE

In the LEVEL_COMPLETE reset block (after `s.modeTimer = MODE_PHASES[0].ms`):

```js
s.phase = "PLAYING"; // Ensure clean phase state on level start
```

### Fix 3 — Spawn-grace period ✅ DONE

Three parts, all applied:

1. In the LEVEL_COMPLETE reset block:
```js
s.spawnGrace = 180; // ~3 seconds at 60fps — no collision checks during this window
```

2. At the top of `checkCollisions`:
```js
if (s.spawnGrace > 0) return; // no collision checks during spawn grace window
```

3. In `updateGhosts`, near `s.modeTimer -= dt`:
```js
if (s.spawnGrace > 0) s.spawnGrace--;
```

### Fix 4 — `spawnGrace` added to `GameState` type ✅ DONE

In `components/game/types.ts`, `spawnGrace: number` was added to the `GameState` interface.

In `makeInitialState()` in `MarcManGame.tsx`, `spawnGrace: 0` was added to the initial state object.

---

## Outstanding Problem — Ghosts Still Freeze on Level 2

All four fixes above are confirmed in the code and the build compiles cleanly. However, **ghosts still visually freeze when the game transitions to level 2**. The root cause has not been fully resolved.

### What is known:
- Ghost movement is driven by `updateGhosts(s, dt)`, called only when `s.phase === "PLAYING"`
- Ghost snap/direction logic is in `chooseGhostDir`; the snap threshold is `speed` (px)
- Level 2 ghost speed is `2.2` (up from `2.0` at level 1) per `getLevelConfig`
- Ghosts start at `GHOST_STARTS` positions (from `mazeConfig.ts`):
  - Ghost 0 (Blinky): col 10, row 9 — **outside** the ghost house
  - Ghosts 1–3 (Pinky, Inky, Clyde): col 9–11, row 11 — **inside** the ghost house (CELL.GHOST_HOUSE)
- Ghost house exit is at col 10, row 8

### What to investigate next:
The freeze occurs despite phase and grace being reset. Likely candidates:
- Ghost direction or mode state left over from level 1 end (e.g., a ghost that was `EATEN` mid-transit)
- The `inHouse` logic in `chooseGhostDir` not correctly routing ghosts out
- A snap threshold or position parity issue at the new `ghostSpeed = 2.2`

---

## What NOT to Do

- Do NOT refactor `chooseGhostDir` — the UP-return logic for in-house ghosts is correct.
- Do NOT change `GHOST_SPEED` or `getLevelConfig` — the snap threshold behavior is intentional.
- Do NOT rewrite the level reset logic — only add targeted insertions.

---

## Verified State of the Code

1. ✅ `checkCollisions` has a `break` statement after `s.phase = "DYING"`
2. ✅ The level reset block sets `s.phase = "PLAYING"` and `s.spawnGrace = 180`
3. ✅ `checkCollisions` returns early if `s.spawnGrace > 0`
4. ✅ `updateGhosts` decrements `s.spawnGrace` each frame
5. ✅ `spawnGrace: number` is in the `GameState` type and initialized to `0` in `makeInitialState()`
6. ✅ Build compiles cleanly — no TypeScript errors
7. ❌ Ghosts still freeze on level 1→2 transition (bug not resolved)
