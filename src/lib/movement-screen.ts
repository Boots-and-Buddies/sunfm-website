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
  {
    id: "shoulder-reach",
    axis: "shoulders",
    title: "Shoulder reach behind the back",
    setup:
      "Stand up. Reach one arm over your shoulder from above (hand going down your spine). Reach the other arm from below, behind your back (hand going up your spine).",
    instruction: "Try it on your tighter side. Where do your hands meet?",
    options: [
      {
        label: "Hands overlap",
        detail: "Your fingers cross past each other. Full range.",
        score: 2,
      },
      {
        label: "Fingertips touch",
        detail: "Your fingers meet but don't cross.",
        score: 1,
      },
      {
        label: "There's a gap",
        detail: "Your hands don't meet, sometimes by several inches.",
        score: 0,
      },
    ],
  },
  {
    id: "thoracic-rotation",
    axis: "thoracic",
    title: "Seated spinal rotation",
    setup:
      "Sit tall in a chair. Cross your arms over your chest. Keep your hips and knees pointed forward.",
    instruction:
      "Rotate your upper body to one side as far as you can without shifting your hips. About how far do you turn?",
    options: [
      {
        label: "Over 90 degrees",
        detail: "You can see well behind you.",
        score: 2,
      },
      {
        label: "Around 45 to 90 degrees",
        detail: "You can turn to the side but not fully behind.",
        score: 1,
      },
      {
        label: "Under 45 degrees",
        detail: "You feel locked up quickly, maybe some back strain.",
        score: 0,
      },
    ],
  },
  {
    id: "hip-lunge",
    axis: "hips",
    title: "Half-kneeling hip check",
    setup:
      "Drop into a half-kneeling lunge. One knee on the floor, the other foot forward with the shin vertical. Square your hips forward. Gently squeeze the glute on the kneeling leg.",
    instruction: "What do you feel in the front of the kneeling-leg hip?",
    options: [
      {
        label: "Loose and easy",
        detail: "Almost no stretch. The position feels natural.",
        score: 2,
      },
      {
        label: "Some tightness",
        detail:
          "A noticeable stretch in the front of the hip. Tolerable but present.",
        score: 1,
      },
      {
        label: "Significant pull",
        detail:
          "Strong stretch or pinching. You can't fully square your hips or tuck your pelvis.",
        score: 0,
      },
    ],
  },
  {
    id: "toe-touch",
    axis: "hamstrings",
    title: "Standing toe touch",
    setup:
      "Stand with feet together, knees straight but not locked. Slowly hinge forward from the hips and reach toward the floor.",
    instruction: "No bouncing. Where do your fingertips land?",
    options: [
      {
        label: "Palms flat on floor",
        detail: "Full range. Comfortable at the bottom.",
        score: 2,
      },
      {
        label: "Fingertips to toes or floor",
        detail: "You can touch your toes or just graze the floor.",
        score: 1,
      },
      {
        label: "Mid-shin or higher",
        detail: "You can't reach past your shins without bending the knees.",
        score: 0,
      },
    ],
  },
  {
    id: "ankle-knee-wall",
    axis: "ankles",
    title: "Knee-to-wall ankle test",
    setup:
      "Kneel in front of a wall. Put one foot forward, four inches from the wall. Keep your heel planted flat.",
    instruction:
      "Try to drive your knee forward to touch the wall without lifting the heel. How close does it get?",
    options: [
      {
        label: "Knee touches the wall easily",
        detail: "Plenty of ankle range. Heel stays planted.",
        score: 2,
      },
      {
        label: "Knee gets close but heel wants to lift",
        detail:
          "You can reach the wall only if you cheat the heel off the floor.",
        score: 1,
      },
      {
        label: "Knee doesn't reach the wall",
        detail:
          "Even with the heel lifting, your knee can't make contact from four inches.",
        score: 0,
      },
    ],
  },
  {
    id: "dead-bug",
    axis: "core",
    title: "Core stability and breathing",
    setup:
      "Lie on your back. Knees bent, feet flat on the floor. Press your low back gently into the floor so there's no gap under your lumbar spine.",
    instruction:
      "Take a full breath in through your nose, out through your mouth. Do you stay connected to the floor, and does your breathing feel natural?",
    options: [
      {
        label: "Easy",
        detail:
          "Low back stays pinned. Breathing is smooth through the nose and belly.",
        score: 2,
      },
      {
        label: "Requires concentration",
        detail:
          "You can hold the position but breathing feels shallow or chest-dominant.",
        score: 1,
      },
      {
        label: "Hard to maintain",
        detail:
          "Your low back lifts as you breathe, or your breathing stays locked in the chest.",
        score: 0,
      },
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
  rawScore: number; // 0, 1, or 2
  normalized: number; // 0-100 (percent)
}

export interface ScreenResult {
  perAxis: AxisScore[];
  overallScore: number; // 0-10
  weakAreas: AxisKey[]; // sorted by score, worst first; capped at 2 unless all similar
  strongestArea: AxisKey | null;
}

export function scoreResult(answers: Array<0 | 1 | 2 | null>): ScreenResult {
  const perAxis: AxisScore[] = QUESTIONS.map((q, i) => {
    const raw = answers[i] ?? 0;
    return {
      axis: q.axis,
      rawScore: raw,
      normalized: Math.round((raw / 2) * 100),
    };
  });

  const averageRaw =
    perAxis.reduce((sum, a) => sum + a.rawScore, 0) / perAxis.length;
  const overallScore = Math.round(((averageRaw / 2) * 10) * 10) / 10;

  // Sort by score ascending (weakest first). Take up to 2 weakest where
  // score < 2 (so strong scores don't become "weak areas").
  const sorted = [...perAxis].sort((a, b) => a.rawScore - b.rawScore);
  const weakAreas = sorted
    .filter((a) => a.rawScore < 2)
    .slice(0, 2)
    .map((a) => a.axis);

  const strongest = [...perAxis].sort((a, b) => b.rawScore - a.rawScore)[0];
  const strongestArea = strongest && strongest.rawScore === 2 ? strongest.axis : null;

  return { perAxis, overallScore, weakAreas, strongestArea };
}
