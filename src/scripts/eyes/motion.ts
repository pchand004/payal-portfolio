/**
 * Eyes: every timing, easing and distance in the prototype lives here.
 * Slow and subtle: nothing animates in under MIN_MS. Ease-out on appear,
 * ease-in on leave. Only transform, opacity and clip-path are animated.
 */

// ── Rules ──────────────────────────────────────────────────────────────
export const MIN_MS = 500; // the floor for any transition
export const WAKE_MS = 700; // an eye appearing / opening
export const FADE_MS = 1000; // an eye dimming to black when you leave

export const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'; // appear
export const EASE_IN = 'cubic-bezier(0.55, 0, 0.75, 0.2)'; // leave
export const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)'; // moves within a loop

// ── Stage ──────────────────────────────────────────────────────────────
export const FOCAL_RADIUS_PX = 160; // click within this of a point to wake it
export const TOUCH_HOLD_MS = 4000; // on touch, an eye stays awake this long
export const DIM_OPACITY = 0.35; // the "dims" beat before the fade to black
export const DIM_SHARE = 0.3; // how far into FADE_MS the dim beat lands

// ── Greeting ───────────────────────────────────────────────────────────
export const GREETING_EVERY_MS = 2500;
export const GREETING_CROSSFADE_MS = 600;

// ── Eye 1 · narrow ─────────────────────────────────────────────────────
export const NARROW_CLOSED_SCALE = 0.04; // the lid as a single line
export const NARROW_BLINK_EVERY_MS: [number, number] = [3000, 5000];
export const NARROW_BLINK_CLOSE_MS = 500;
export const NARROW_BLINK_HOLD_MS = 120; // a pause, not a transition
export const NARROW_BLINK_OPEN_MS = 700;

// ── Eye 2 · looks around ───────────────────────────────────────────────
export const LOOK_REACH = 0.62; // pupil travel, as a share of the iris room
export const LOOK_DRIFT_MS = 1400; // centre → left, left → right
export const LOOK_HOLD_MS = 600; // pause at each side
export const LOOK_CIRCLE_MS = 3200; // one lap of the rim
export const LOOK_TURN_MS = 2400; // the whole eye rolling upside down

// ── Eye 5 · psychedelic ────────────────────────────────────────────────
export const PSY_HUE_STEP = 40; // degrees between successive palettes
export const PSY_HUE_FADE_MS = 3200; // one palette dissolving into the next
export const PSY_BREATHE_SCALE = 1.04; // a few percent
export const PSY_BREATHE_MS = 4200; // one half-breath
