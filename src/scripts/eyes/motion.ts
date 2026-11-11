/**
 * Eyes: stage-wide timings, easings and distances. Each eye keeps its own
 * tunables at the top of its component file.
 */

// ── Wake and fade ──────────────────────────────────────────────────────
export const WAKE_MS = 500; // an eye fading and growing in
export const FADE_MS = 1000; // an eye fading out when you leave

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'; // appear
export const EASE_IN = 'cubic-bezier(0.55, 0, 0.75, 0.2)'; // leave

export const WAKE_SCALE = 0.9; // an eye grows in from this size
export const FADE_SCALE = 0.97; // and shrinks back to this as it fades

// ── Stage ──────────────────────────────────────────────────────────────
export const FOCAL_RADIUS_PX = 160; // click within this of a point to wake it
export const FOCAL_PAD_PX = 40; // a large eye's area reaches this far past its own edge
export const TOUCH_HOLD_MS = 4000; // on touch, an eye stays awake this long
export const EDGE_PX = 12; // a large eye is kept at least this far inside the viewport

// ── Greeting ───────────────────────────────────────────────────────────
// Each letter's roll is quick so the change reads as a snap, not a
// dissolve. Faces never overlap; the line is clipped.
export const GREETING_EVERY_MS = 2500;
export const GREETING_ROLL_MS = 420; // one letter rolling out / in
export const GREETING_STAGGER_MS = 35; // each letter a beat behind the last
export const EASE_ROLL = 'cubic-bezier(0.76, 0, 0.24, 1)';
