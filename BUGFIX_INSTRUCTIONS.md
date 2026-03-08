# Ghost Freeze Bug Fix — Targeted Instructions for Claude Code

## IMPORTANT: Read this file only. Do NOT explore the codebase beyond the specific lines listed below.

---

## The Problem (Already Diagnosed — Do Not Re-Investigate)

On level 1→2 transition, ghosts freeze. Root cause is two compounding issues:

1. **`checkCollisions` has no early-exit guard** — after setting `s.phase = "DYING"`, it continues iterating ghosts, allowing multiple ghosts to overwrite `s.phase` and decrement `s.lives` repeatedly.

2. **Level reset doesn't reinitialize collision/phase state** — on the first tick of level 2, stale phase state can cause immediate incorrect collision resolution.

---

## Exact Fixes Required

### Fix 1 — Add early-exit guard in `checkCollisions`

**File:** (your game file — the one containing `checkCollisions`)  
**Find this pattern** (inside the ghost iteration loop in `checkCollisions`):

```js
// somewhere inside the loop that iterates over ghosts:
s.lives--;
s.phase = "DYING";
```

**Replace with:**

```js
s.lives--;
s.phase = "DYING";
break; // ADD THIS LINE — prevents subsequent ghosts from overwriting phase/lives
```

---

### Fix 2 — Reset `s.phase` on level transition

**Find the block that runs on level completion / level reset** (where `s.modeTimer` is set):

```js
s.modeTimer = MODE_PHASES[0].ms;
```

**Immediately after that line, add:**

```js
s.phase = "PLAYING"; // Ensure clean phase state on level start
```

---

### Fix 3 — Add spawn-grace period to prevent tick-1 collisions

**Find the level reset block** (same area as Fix 2). Add a grace timer:

```js
s.spawnGrace = 180; // ~3 seconds at 60fps — no collision checks during this window
```

**Then in `checkCollisions`, wrap the entire function body:**

```js
function checkCollisions(s) {
  if (s.spawnGrace > 0) return; // ADD THIS GUARD at the very top
  // ... rest of existing function unchanged
}
```

**And in the main game tick/update function, add the grace timer countdown** (near where `s.modeTimer -= dt` happens):

```js
if (s.spawnGrace > 0) s.spawnGrace--;
```

---

## What NOT to Do

- Do NOT refactor `chooseGhostDir` — the UP-return logic for in-house ghosts is correct.
- Do NOT change `GHOST_SPEED` or `getLevelConfig` — the snap threshold behavior is intentional.
- Do NOT rewrite the level reset logic — only add the three targeted insertions above.
- Do NOT read files other than the single game logic file containing these functions.

---

## Verification

After making changes, confirm:
1. `checkCollisions` has a `break` statement after `s.phase = "DYING"`
2. The level reset block sets `s.phase = "PLAYING"` and `s.spawnGrace = 180`
3. `checkCollisions` returns early if `s.spawnGrace > 0`
4. The main tick decrements `s.spawnGrace` each frame

That's the complete fix. No other changes are needed.
