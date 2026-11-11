/**
 * Eye silhouettes, one per cell. A shape is only the white: a single SVG
 * path drawn for the LEFT eye in a box of w × h design px (the 1440 × 1024
 * frame). Where a shape leans, `mirror` flips it for the right eye.
 *
 * Each shape also says how big its pupil is, where the pupil's centre may
 * travel (an ellipse inside the white, in the same box), and where it rests.
 * The pupil is clipped to the silhouette, so a travel ellipse that reaches
 * the edge gives a pupil cut by the lid, as in the reference frames.
 */
export interface EyeShape {
  w: number; // box width, design px
  h: number; // box height
  path: string; // the left eye's silhouette, in the box
  mirror?: boolean; // flip the path for the right eye
  gap: number; // between the two eyes, design px
  rightScale?: number; // the right eye's size as a share of the left's (1 if absent)
  pupil: { kind: 'disc'; d: number } | { kind: 'slit'; w: number; h: number };
  travel: { cx: number; cy: number; rx: number; ry: number }; // where the pupil's centre may go
  rest: [number, number]; // the pupil's resting offset from the travel centre
}

// A disc pupil is this share of its eye's width (the slit keeps its slit)
export const PUPIL_SHARE = 0.4;
const disc = (w: number) => ({ kind: 'disc', d: Math.round(w * PUPIL_SHARE) }) as const;

const pill = (w: number, h: number) => {
  const r = w / 2;
  return `M${r} 0 A${r} ${r} 0 0 1 ${w} ${r} V${h - r} A${r} ${r} 0 0 1 ${r} ${h} A${r} ${r} 0 0 1 0 ${h - r} V${r} A${r} ${r} 0 0 1 ${r} 0 Z`;
};

export const SHAPES = {
  // 1 · upright pills
  pills: {
    w: 67, h: 118, gap: 33,
    path: pill(67, 118),
    pupil: disc(67),
    travel: { cx: 33.5, cy: 59, rx: 16, ry: 41 },
    rest: [-15, 12],
  },

  // 2 · round circles, the pupil rests at the top, cut by the edge
  circles: {
    w: 90, h: 90, gap: 20,
    path: 'M45 0 A45 45 0 1 1 45 90 A45 45 0 1 1 45 0 Z',
    pupil: disc(90),
    travel: { cx: 45, cy: 45, rx: 30, ry: 30 },
    rest: [0, -30],
  },

  // 3 · circles cut by a slanted flat top, sloping down toward the nose
  cutCircles: {
    w: 86, h: 89, gap: 24, mirror: true,
    path: 'M14.58 13.73 L83.42 31.34 A43 43 0 1 1 14.58 13.73 Z',
    pupil: disc(86),
    travel: { cx: 43, cy: 50, rx: 24, ry: 24 },
    rest: [12, 0],
  },

  // 4 · horizontal almonds with pointed corners
  almonds: {
    w: 96, h: 48, gap: 20,
    path: 'M0 24 Q48 -10 96 24 Q48 58 0 24 Z',
    pupil: disc(96),
    travel: { cx: 48, cy: 24, rx: 26, ry: 5 },
    rest: [10, 4],
  },

  // 5 · angular faceted polygons leaning toward each other, nearly touching
  facets: {
    w: 80, h: 110, gap: 6, mirror: true,
    path: 'M10 0 L70 8 L80 60 L62 110 L14 100 L0 50 Z',
    pupil: disc(80),
    travel: { cx: 42, cy: 55, rx: 18, ry: 28 },
    rest: [12, 2],
  },

  // 6 · half-moons: flat top, round bottom; pupil rests low
  halfMoons: {
    w: 90, h: 58, gap: 20,
    path: 'M0 6 H90 V13 A45 45 0 0 1 0 13 Z',
    pupil: disc(90),
    travel: { cx: 45, cy: 26, rx: 22, ry: 16 },
    rest: [0, 14],
  },

  // 7 · teardrops slanting outward, pointed end up
  teardrops: {
    w: 60, h: 108, gap: 40, mirror: true,
    path: 'M12 0 C40 28 60 50 60 78 A28 28 0 1 1 4 78 C4 50 0 30 12 0 Z',
    pupil: disc(60),
    travel: { cx: 32, cy: 72, rx: 13, ry: 20 },
    rest: [-9, -12],
  },

  // 8 · tall thin slivers, about 1:3
  slivers: {
    w: 38, h: 114, gap: 36,
    path: pill(38, 114),
    pupil: disc(38),
    travel: { cx: 19, cy: 57, rx: 9, ry: 42 },
    rest: [0, 36],
  },

  // 9 · narrow horizontal slits; the pupil is a vertical slit
  slits: {
    w: 100, h: 26, gap: 14,
    path: 'M0 13 Q50 -6 100 13 Q50 32 0 13 Z',
    pupil: { kind: 'slit', w: 8, h: 26 },
    travel: { cx: 50, cy: 13, rx: 34, ry: 3 },
    rest: [-30, 0],
  },

  // 10 · mismatched: a large circle, and one 60% of its size
  mismatched: {
    w: 100, h: 100, gap: 18, rightScale: 0.6,
    path: 'M50 0 A50 50 0 1 1 50 100 A50 50 0 1 1 50 0 Z',
    pupil: disc(100),
    travel: { cx: 50, cy: 50, rx: 30, ry: 30 },
    rest: [20, -20],
  },
} satisfies Record<string, EyeShape>;

export type ShapeName = keyof typeof SHAPES;
