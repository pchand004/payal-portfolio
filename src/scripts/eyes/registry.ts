/**
 * Eyes register their behaviour here; the stage looks them up by name.
 * The stage owns appearing and fading (opacity on the slot). An eye owns
 * what happens inside it: opening, its loop, and going back to rest.
 */
export interface EyeBehaviour {
  /** Open and start the loop. `still`: reduced motion, show it open and hold. */
  wake(el: HTMLElement, still: boolean): void;
  /** Stop every animation and put the eye back in its closed rest state. */
  reset(el: HTMLElement): void;
}

const eyes = new Map<string, EyeBehaviour>();

export function registerEye(name: string, behaviour: EyeBehaviour) {
  eyes.set(name, behaviour);
}

export function getEye(name: string): EyeBehaviour | undefined {
  return eyes.get(name);
}

/** Cancel every Web Animation on the element and its descendants. */
export function cancelAll(el: Element) {
  for (const a of el.getAnimations({ subtree: true })) a.cancel();
}

export const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(signal.reason);
    }, { once: true });
  });

/** Resolve when the animation finishes; reject if the eye is reset first. */
export function done(a: Animation, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    a.finished.then(() => resolve(), () => reject(signal.reason));
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
}
