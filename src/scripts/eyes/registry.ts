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
