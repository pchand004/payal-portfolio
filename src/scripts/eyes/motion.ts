/**
 * Eyes: the stage's grid and timings. Each eye keeps its own tunables at the
 * top of its component file.
 */

// ── Grid ───────────────────────────────────────────────────────────────
// The design frame is 1440 × 1024: four columns by three rows of equal
// cells, 360 × 341. Cells scale with the viewport; under 600px wide the grid
// is two columns with the same proportions per cell.
export const FRAME_W = 1440;
export const FRAME_H = 1024;
export const COLS = 4;
export const ROWS = 3;
export const CELL_W = FRAME_W / COLS; // 360
export const CELL_H = Math.round(FRAME_H / ROWS); // 341
export const NARROW_MAX_PX = 599.98; // below this, two columns

// ── Greeting ───────────────────────────────────────────────────────────
export const GREETING_W = 400; // width at the design frame, roughly
export const GREETING_EVERY_MS = 2500;
export const GREETING_ROLL_MS = 420; // one letter rolling out / in
export const GREETING_STAGGER_MS = 35; // each letter a beat behind the last
export const EASE_ROLL = 'cubic-bezier(0.76, 0, 0.24, 1)';
