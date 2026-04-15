export type AxisKey =
  | "shoulders"
  | "thoracic"
  | "hips"
  | "hamstrings"
  | "ankles"
  | "core";

export interface Axis {
  key: AxisKey;
  label: string;
  shortLabel: string;
}

export const AXES: Axis[] = [
  { key: "shoulders", label: "Shoulder mobility", shortLabel: "Shoulders" },
  { key: "thoracic", label: "Thoracic spine", shortLabel: "T-Spine" },
  { key: "hips", label: "Hip flexors", shortLabel: "Hips" },
  { key: "hamstrings", label: "Posterior chain", shortLabel: "Posterior" },
  { key: "ankles", label: "Ankle mobility", shortLabel: "Ankles" },
  { key: "core", label: "Core & breathing", shortLabel: "Core" },
];

export interface QuestionOption {
  label: string;
  detail: string;
  score: 0 | 1 | 2;
}

export interface Question {
  id: string;
  axis: AxisKey;
  title: string;
  setup: string;
  instruction: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  // ── SHOULDERS ─────────────────────────────────────────────────
  {
    id: "shoulder-reach",
    axis: "shoulders",
    title: "Shoulder reach behind the back",
    setup:
      "Stand up. Reach one arm over your shoulder from above (hand going down your spine). Reach the other arm from below, behind your back (hand going up your spine).",
    instruction: "Try it on your tighter side. Where do your hands meet?",
    options: [
      { label: "Hands overlap", detail: "Your fingers cross past each other. Full range.", score: 2 },
      { label: "Fingertips touch", detail: "Your fingers meet but don't cross.", score: 1 },
      { label: "There's a gap", detail: "Your hands don't meet, sometimes by several inches.", score: 0 },
    ],
  },
  {
    id: "shoulder-overhead",
    axis: "shoulders",
    title: "Overhead reach with back flat",
    setup:
      "Lie on your back with knees bent. Press your low back flat into the floor so there's no gap under your lumbar spine. Straighten both arms and reach them overhead.",
    instruction:
      "Without letting your low back arch, how far back can your arms reach?",
    options: [
      { label: "Arms flat on floor", detail: "Hands touch the ground, back still pinned.", score: 2 },
      { label: "A few inches off the floor", detail: "Arms stop short, but your back stays flat.", score: 1 },
      { label: "Much further off, or back arches", detail: "You can't get near the floor without compensating.", score: 0 },
    ],
  },

  // ── THORACIC SPINE ────────────────────────────────────────────
  {
    id: "thoracic-rotation",
    axis: "thoracic",
    title: "Seated spinal rotation",
    setup:
      "Sit tall in a chair. Cross your arms over your chest. Keep your hips and knees pointed forward.",
    instruction:
      "Rotate your upper body to one side as far as you can without shifting your hips. About how far do you turn?",
    options: [
      { label: "Over 90 degrees", detail: "You can see well behind you.", score: 2 },
      { label: "Around 45 to 90 degrees", detail: "You can turn to the side but not fully behind.", score: 1 },
      { label: "Under 45 degrees", detail: "You feel locked up quickly, maybe some back strain.", score: 0 },
    ],
  },
  {
    id: "thoracic-sidebend",
    axis: "thoracic",
    title: "Standing side bend",
    setup:
      "Stand tall, feet hip-width. Slide one hand straight down the outside of your thigh. Keep both feet planted. Don't shift your weight to the opposite side.",
    instruction: "How far down your leg do your fingers reach?",
    options: [
      { label: "Past the knee", detail: "A long, smooth curve through your ribs.", score: 2 },
      { label: "To the knee or just above", detail: "Moderate side bend, some rib compression.", score: 1 },
      { label: "Above mid-thigh", detail: "Hips shift or your ribs feel locked up.", score: 0 },
    ],
  },

  // ── HIPS ──────────────────────────────────────────────────────
  {
    id: "hip-lunge",
    axis: "hips",
    title: "Half-kneeling hip check",
    setup:
      "Drop into a half-kneeling lunge. One knee on the floor, the other foot forward with the shin vertical. Square your hips forward. Gently squeeze the glute on the kneeling leg.",
    instruction: "What do you feel in the front of the kneeling-leg hip?",
    options: [
      { label: "Loose and easy", detail: "Almost no stretch. The position feels natural.", score: 2 },
      { label: "Some tightness", detail: "Noticeable stretch in the front of the hip. Tolerable but present.", score: 1 },
      { label: "Significant pull", detail: "Strong stretch or pinching. You can't fully square your hips.", score: 0 },
    ],
  },
  {
    id: "hip-knee-to-chest",
    axis: "hips",
    title: "Knee to chest",
    setup:
      "Lie on your back. Pull one knee toward your chest with both hands. The other leg stays straight and flat on the floor.",
    instruction: "What happens to the straight leg as you pull the knee in?",
    options: [
      { label: "Stays flat", detail: "Opposite leg stays pinned to the floor. Knee pulls cleanly to chest.", score: 2 },
      { label: "Starts to lift slightly", detail: "Opposite leg rises a bit as you pull the other knee in.", score: 1 },
      { label: "Lifts significantly", detail: "The straight leg wants to bend or lift off the floor to let you get the other knee close.", score: 0 },
    ],
  },

  // ── POSTERIOR CHAIN ───────────────────────────────────────────
  {
    id: "toe-touch",
    axis: "hamstrings",
    title: "Standing toe touch",
    setup:
      "Stand with feet together, knees straight but not locked. Slowly hinge forward from the hips and reach toward the floor.",
    instruction: "No bouncing. Where do your fingertips land?",
    options: [
      { label: "Palms flat on floor", detail: "Full range. Comfortable at the bottom.", score: 2 },
      { label: "Fingertips to toes or floor", detail: "You can touch your toes or just graze the floor.", score: 1 },
      { label: "Mid-shin or higher", detail: "You can't reach past your shins without bending the knees.", score: 0 },
    ],
  },
  {
    id: "straight-leg-raise",
    axis: "hamstrings",
    title: "Straight-leg raise",
    setup:
      "Lie on your back. Keep one leg straight and flat on the ground. Raise the other leg as high as you can while keeping the knee locked out.",
    instruction: "How high does the raised leg go before you feel hard restriction?",
    options: [
      { label: "Past 80 degrees (nearly vertical)", detail: "Your raised leg is almost perpendicular to the floor.", score: 2 },
      { label: "60 to 80 degrees", detail: "Well off the ground, but not vertical.", score: 1 },
      { label: "Under 60 degrees", detail: "Your hamstring or back locks up early.", score: 0 },
    ],
  },

  // ── ANKLES ────────────────────────────────────────────────────
  {
    id: "ankle-knee-wall",
    axis: "ankles",
    title: "Knee-to-wall ankle test",
    setup:
      "Kneel in front of a wall. Put one foot forward, four inches from the wall. Keep your heel planted flat.",
    instruction:
      "Try to drive your knee forward to touch the wall without lifting the heel. How close does it get?",
    options: [
      { label: "Knee touches the wall easily", detail: "Plenty of ankle range. Heel stays planted.", score: 2 },
      { label: "Knee gets close but heel wants to lift", detail: "You can reach the wall only if the heel cheats off the floor.", score: 1 },
      { label: "Knee doesn't reach the wall", detail: "Even with the heel lifting, the knee can't make contact from four inches.", score: 0 },
    ],
  },
  {
    id: "deep-squat",
    axis: "ankles",
    title: "Deep squat hold",
    setup:
      "Stand feet hip-width. Lower into your deepest squat with heels flat on the floor and hands in front for balance.",
    instruction:
      "Can you hold a full-depth squat with heels down for 30 seconds without tipping backward?",
    options: [
      { label: "Comfortably", detail: "Heels stay planted. You could hold it indefinitely.", score: 2 },
      { label: "Possible but tense", detail: "You hold it, but feel pulling in the ankles or want to fall back.", score: 1 },
      { label: "Can't get there", detail: "Heels lift, or you fall backward before reaching depth.", score: 0 },
    ],
  },

  // ── CORE / BREATHING ──────────────────────────────────────────
  {
    id: "dead-bug",
    axis: "core",
    title: "Core stability and breathing",
    setup:
      "Lie on your back. Knees bent, feet flat on the floor. Press your low back gently into the floor so there's no gap under your lumbar spine.",
    instruction:
      "Take a full breath in through your nose, out through your mouth. Do you stay connected to the floor, and does your breathing feel natural?",
    options: [
      { label: "Easy", detail: "Low back stays pinned. Breathing is smooth through the nose and belly.", score: 2 },
      { label: "Requires concentration", detail: "You can hold the position but breathing feels shallow or chest-dominant.", score: 1 },
      { label: "Hard to maintain", detail: "Your low back lifts as you breathe, or your breathing stays locked in the chest.", score: 0 },
    ],
  },
  {
    id: "plank-hold",
    axis: "core",
    title: "Forearm plank hold",
    setup:
      "Set up in a forearm plank: elbows directly under shoulders, body in one straight line from shoulders to heels. No sagging hips, no piking up.",
    instruction:
      "How long can you hold that line before form breaks (hips sag, butt lifts, or you're shaking out)?",
    options: [
      { label: "60+ seconds, no breakdown", detail: "Solid control, no shaking, no form drift.", score: 2 },
      { label: "30 to 60 seconds", detail: "You hold the line but start to sag or shake.", score: 1 },
      { label: "Under 30 seconds", detail: "Form breaks fast, or you can't set up the position cleanly.", score: 0 },
    ],
  },
];

export interface DrillRecommendation {
  name: string;
  description: string;
  link?: { href: string; label: string };
}

export const DRILLS: Record<AxisKey, DrillRecommendation[]> = {
  shoulders: [
    {
      name: "Wall slides",
      description:
        "Back flat on a wall, arms in a goal-post shape, slowly slide them overhead. Keep wrists, elbows, and low back in contact with the wall the whole time.",
      link: {
        href: "/training/functional-movement-exercises-for-desk-workers",
        label: "See the full shoulder sequence",
      },
    },
    {
      name: "Band pull-aparts",
      description:
        "Hold a light band at shoulder height. Pull the band apart by squeezing your shoulder blades. 3 sets of 15, slow and controlled.",
    },
  ],
  thoracic: [
    {
      name: "Quadruped thoracic rotation",
      description:
        "On all fours, place one hand behind your head. Rotate that elbow down toward the opposite hand, then up toward the ceiling. Follow the elbow with your eyes. 8 reps each side.",
      link: {
        href: "/training/functional-movement-exercises-for-desk-workers",
        label: "Full t-spine routine",
      },
    },
    {
      name: "Open books",
      description:
        "Lie on your side, knees stacked and bent. Top arm reaches across your body, opening toward the ceiling. Let your chest rotate with the arm. Slow. 6 reps each side.",
    },
  ],
  hips: [
    {
      name: "Couch stretch",
      description:
        "Front knee on the ground near a wall or couch, back shin going up the wall. Step the other foot forward into a lunge. Gently tuck the pelvis. 60 seconds per side.",
      link: {
        href: "/training/functional-movement-exercises-for-desk-workers",
        label: "How to do it safely",
      },
    },
    {
      name: "90/90 hip switches",
      description:
        "Seated with both legs bent at 90 degrees, one in front, one to the side. Rotate to switch which leg is in front. 8 reps per side, slow.",
    },
  ],
  hamstrings: [
    {
      name: "Wall hamstring stretch",
      description:
        "Lie on your back in a doorway. Put one leg up the wall, straight. Let the stretch work over two or three minutes. Switch sides.",
    },
    {
      name: "Romanian deadlift pattern",
      description:
        "Light weight or bodyweight. Hinge at the hips, keep the back flat, feel the stretch in the hamstrings, stand back up by squeezing the glutes.",
      link: {
        href: "/training/strength-training-for-longevity-beginners-guide-over-30",
        label: "The posterior chain in detail",
      },
    },
  ],
  ankles: [
    {
      name: "Knee-to-wall progressions",
      description:
        "From the knee-to-wall position, gently push the knee forward to the wall, back off, repeat. 10 reps each side. Progress by moving the foot further from the wall as mobility improves.",
    },
    {
      name: "Elevated-heel squat",
      description:
        "Stand with heels on a 2-inch elevation (a book or plate). Squat as deep as you can, keeping the chest tall. 3 sets of 8 slow reps.",
    },
  ],
  core: [
    {
      name: "Dead bugs",
      description:
        "On your back, arms overhead, knees at 90 degrees. Extend opposite arm and leg toward the floor without letting your low back arch. 8 reps each side.",
      link: {
        href: "/training/functional-movement-exercises-for-desk-workers",
        label: "The full core activation sequence",
      },
    },
    {
      name: "90/90 breathing",
      description:
        "On your back, calves on a chair, hips and knees at 90 degrees. Breathe in slowly through the nose for 4 counts, out through the mouth for 6. 8 breaths. Low back stays flat.",
    },
  ],
};

export interface AxisScore {
  axis: AxisKey;
  rawScore: number; // 0.0 to 2.0, averaged across the axis's questions
  normalized: number; // 0-100 (percent)
}

export interface ScreenResult {
  perAxis: AxisScore[];
  overallScore: number; // 0-10
  weakAreas: AxisKey[]; // sorted by score, worst first; capped at 2 unless all similar
  strongestArea: AxisKey | null;
}

export function scoreResult(answers: Array<0 | 1 | 2 | null>): ScreenResult {
  // Group raw scores by axis
  const byAxis = new Map<AxisKey, number[]>();
  QUESTIONS.forEach((q, i) => {
    const raw = answers[i] ?? 0;
    const existing = byAxis.get(q.axis) ?? [];
    existing.push(raw);
    byAxis.set(q.axis, existing);
  });

  const perAxis: AxisScore[] = AXES.map((axis) => {
    const values = byAxis.get(axis.key) ?? [0];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return {
      axis: axis.key,
      rawScore: avg,
      normalized: Math.round((avg / 2) * 100),
    };
  });

  // Overall: sum of all raw answers / max possible, scaled to 10
  const totalRaw = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
  const totalMax = QUESTIONS.length * 2;
  const overallScore = Math.round((totalRaw / totalMax) * 10 * 10) / 10;

  // Weak areas: axes where the average raw score is below 1.5.
  // Sort ascending and take up to 2.
  const sorted = [...perAxis].sort((a, b) => a.rawScore - b.rawScore);
  const weakAreas = sorted
    .filter((a) => a.rawScore < 1.5)
    .slice(0, 2)
    .map((a) => a.axis);

  const strongest = [...perAxis].sort((a, b) => b.rawScore - a.rawScore)[0];
  const strongestArea =
    strongest && strongest.rawScore >= 1.75 ? strongest.axis : null;

  return { perAxis, overallScore, weakAreas, strongestArea };
}
