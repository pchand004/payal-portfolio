/**
 * Selection sound: a tiny "pencil tick", synthesised with the Web Audio API.
 * Plays only when playTick() is called from a user selection (click/tap/key),
 * never on hover, load or scroll. One AudioContext, created lazily on the first
 * user gesture and resumed if the browser suspended it (iOS Safari).
 * The on/off preference lives in localStorage under "sound" (default on).
 */
const KEY = 'sound';
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let failed = false;

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* private mode or storage blocked: the choice just lasts this page */
  }
  document.dispatchEvent(new CustomEvent('sound:change', { detail: { on } }));
}

function getContext(): AudioContext | null {
  if (ctx || failed) return ctx;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) throw new Error('no AudioContext');
    ctx = new AC();
    // 100ms of white noise, reused for every tick
    const len = Math.round(ctx.sampleRate * 0.1);
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  } catch {
    failed = true;
    ctx = null;
  }
  return ctx;
}

/** Warm the context up on the first gesture, so the first tick isn't late. */
export function primeSound() {
  const c = getContext();
  if (c && c.state === 'suspended') c.resume().catch(() => {});
}

/** Play one pencil tick: a 40–70ms band-passed noise burst, peak about −24 dB. */
export function playTick() {
  if (!soundEnabled()) return;
  const c = getContext();
  if (!c || !noise) return;
  const go = () => {
    try {
      const vary = () => 1 + (Math.random() * 2 - 1) * 0.15; // ±15%
      const dur = 0.04 + Math.random() * 0.03;
      const t0 = c.currentTime;
      const src = c.createBufferSource();
      src.buffer = noise;
      src.playbackRate.value = vary();
      const bp = c.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2600 * vary();
      bp.Q.value = 1.4;
      const gain = c.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.063, t0 + 0.004); // −24 dB
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(bp).connect(gain).connect(c.destination);
      src.start(t0);
      src.stop(t0 + dur + 0.01);
    } catch {
      /* never let a sound break an interaction */
    }
  };
  if (c.state === 'suspended') c.resume().then(go).catch(() => {});
  else go();
}
