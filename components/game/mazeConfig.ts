// Cell legend: 1=wall 2=pellet 3=power-pellet 0=empty 4=ghost-house
// 21 cols × 23 rows
export const MAZE_TEMPLATE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,2,1,2,2,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,2,2,1,2,2,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,2,2,1,2,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,0,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,0,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,4,4,4,4,1,0,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,4,4,4,4,1,0,1,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,4,4,4,4,1,0,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,0,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,0,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,0,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export const COLS = 21;
export const ROWS = 24;

// Player starts at col 10, row 22 (bottom centre)
export const PLAYER_START = { col: 10, row: 22 };

// Ghosts start inside the ghost house (cols 8–13, rows 10–11)
export const GHOST_STARTS = [
  { col: 10, row: 9,  color: "#FF0000", scatter: { x: 20, y: 0  } }, // Blinky – top-right (outside house)
  { col: 9,  row: 11, color: "#FFB8FF", scatter: { x: 0,  y: 0  } }, // Pinky  – top-left
  { col: 10, row: 11, color: "#00FFFF", scatter: { x: 20, y: 23 } }, // Inky   – centre
  { col: 11, row: 11, color: "#FFB852", scatter: { x: 0,  y: 23 } }, // Clyde  – right (col 12 is a wall)
];

export const GHOST_HOUSE_EXIT = { col: 10, row: 8 };

export function countPellets(maze: number[][]): number {
  let count = 0;
  for (const row of maze) {
    for (const cell of row) {
      if (cell === 2 || cell === 3) count++;
    }
  }
  return count;
}

export function cloneMaze(template: number[][]): number[][] {
  return template.map(row => [...row]);
}
