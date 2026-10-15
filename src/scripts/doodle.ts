/**
 * Doodle helpers shared by the <Doodle> component (server) and page scripts (client).
 *
 * Drawing model: every path gets pathLength="1", so its dash runs 0 → 1. A path is
 * hidden at stroke-dashoffset 1.02 and fully drawn at 0. Paths draw one after another
 * in document (pen) order. Their start/end times follow one ease-out curve over the
 * whole doodle, so the pen starts quick and settles, with no stall between strokes.
 * The CSS lives in src/styles/global.css under "Doodles".
 */
import type { Doodle } from '../data/doodles';

export const DRAW_MIN = 600;
export const DRAW_MAX = 900;
export const clampDuration = (ms: number) => Math.min(DRAW_MAX, Math.max(DRAW_MIN, ms));

/** Inverse of an ease-out cubic: the time fraction at which a given share of ink is down. */
const easeOutInv = (f: number) => 1 - Math.cbrt(1 - Math.min(1, Math.max(0, f)));

/** Delay and duration (ms) for each path so the whole doodle draws in `total` ms. */
export function pathTimings(doodle: Doodle, total = 750) {
  const T = clampDuration(total);
  const sum = doodle.paths.reduce((s, p) => s + p.len, 0) || 1;
  let acc = 0;
  return doodle.paths.map((p) => {
    const t0 = T * easeOutInv(acc / sum);
    acc += p.len;
    const t1 = T * easeOutInv(acc / sum);
    return { delay: Math.round(t0), dur: Math.max(16, Math.round(t1 - t0)) };
  });
}

const SVG_NS = 'http://www.w3.org/2000/svg';

export type DoodleOptions = {
  className?: string;
  duration?: number;
  strokeWidth?: number;
  /** Stretch to the box it is given (ignores aspect ratio); keeps the pen width constant. */
  stretch?: boolean;
};

/** Build an inline SVG for a doodle (client side). Not drawn until drawDoodle() is called. */
export function createDoodle(doodle: Doodle, opts: DoodleOptions = {}): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${doodle.w} ${doodle.h}`);
  svg.setAttribute('class', ['doodle', opts.className].filter(Boolean).join(' '));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('stroke-width', String(opts.strokeWidth ?? doodle.stroke));
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.dataset.doodle = doodle.name;
  if (opts.stretch) svg.setAttribute('preserveAspectRatio', 'none');
  const timings = pathTimings(doodle, opts.duration);
  doodle.paths.forEach((p, i) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', p.d);
    path.setAttribute('pathLength', '1');
    if (opts.stretch) path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.style.setProperty('--dd-delay', `${timings[i].delay}ms`);
    path.style.setProperty('--dd-dur', `${timings[i].dur}ms`);
    svg.appendChild(path);
  });
  return svg;
}

/** Start the hand-drawn animation (restarts it if already drawn). */
export function drawDoodle(svg: Element, delayMs = 0) {
  svg.classList.remove('is-drawing', 'is-drawn');
  (svg as SVGElement).style.setProperty('--doodle-delay', `${delayMs}ms`);
  void (svg as SVGElement).getBoundingClientRect(); // restart the animation
  svg.classList.add('is-drawing');
}

/** Total time (ms) a doodle takes to finish drawing, including its start delay. */
export const drawTime = (duration = 750, delayMs = 0) => clampDuration(duration) + delayMs;

/** Pick a random doodle from a pool, avoiding the one used last time. */
export function pickRandom<T extends { name: string }>(pool: T[], avoid?: string): T {
  const options = pool.length > 1 ? pool.filter((d) => d.name !== avoid) : pool;
  return options[Math.floor(Math.random() * options.length)];
}

export const rand = (min: number, max: number) => min + Math.random() * (max - min);
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
