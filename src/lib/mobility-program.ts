import {
  AXES,
  DRILLS,
  type AxisKey,
  type ScreenResult,
  type DrillRecommendation,
} from "./movement-screen";

export interface ProgramExercise {
  name: string;
  description: string;
  sets: string;
  rest: string;
  videoUrl?: string;
}

// Curated video links for each exercise (YouTube search for the specific movement)
const VIDEO_URLS: Record<string, string> = {
  "Wall slides": "https://www.youtube.com/results?search_query=wall+slides+shoulder+mobility+drill",
  "Band pull-aparts": "https://www.youtube.com/results?search_query=band+pull+aparts+form",
  "Doorway pec stretch": "https://www.youtube.com/results?search_query=doorway+pec+stretch+mobility",
  "Prone I-Y-T raises": "https://www.youtube.com/results?search_query=prone+IYT+raises+shoulder",
  "Quadruped thoracic rotation": "https://www.youtube.com/results?search_query=quadruped+thoracic+rotation+drill",
  "Open books": "https://www.youtube.com/results?search_query=open+book+thoracic+stretch",
  "Foam roll thoracic extension": "https://www.youtube.com/results?search_query=foam+roll+thoracic+extension",
  "Cat-cow": "https://www.youtube.com/results?search_query=cat+cow+stretch+mobility",
  "Couch stretch": "https://www.youtube.com/results?search_query=couch+stretch+hip+flexor",
  "90/90 hip switches": "https://www.youtube.com/results?search_query=90+90+hip+switches+mobility",
  "Pigeon stretch": "https://www.youtube.com/results?search_query=pigeon+stretch+hip+mobility",
  "Frog stretch": "https://www.youtube.com/results?search_query=frog+stretch+hip+mobility",
  "Wall hamstring stretch": "https://www.youtube.com/results?search_query=wall+hamstring+stretch+doorway",
  "Romanian deadlift pattern": "https://www.youtube.com/results?search_query=romanian+deadlift+bodyweight+form",
  "Seated forward fold": "https://www.youtube.com/results?search_query=seated+forward+fold+hamstring+stretch",
  "Single-leg good morning": "https://www.youtube.com/results?search_query=single+leg+good+morning+exercise",
  "Knee-to-wall progressions": "https://www.youtube.com/results?search_query=knee+to+wall+ankle+mobility+drill",
  "Elevated-heel squat": "https://www.youtube.com/results?search_query=elevated+heel+squat+ankle+mobility",
  "Calf raises with eccentric hold": "https://www.youtube.com/results?search_query=eccentric+calf+raises+step",
  "Banded ankle dorsiflexion": "https://www.youtube.com/results?search_query=banded+ankle+dorsiflexion+mobility",
  "Dead bugs": "https://www.youtube.com/results?search_query=dead+bug+exercise+core+form",
  "90/90 breathing": "https://www.youtube.com/results?search_query=90+90+breathing+drill+core",
  "Bird dogs": "https://www.youtube.com/results?search_query=bird+dog+exercise+core+form",
  "Side plank": "https://www.youtube.com/results?search_query=side+plank+form+core",
};

export interface ProgramDay {
  label: string;
  focus: string;
  duration: string;
  exercises: ProgramExercise[];
}

export interface AxisBreakdown {
  key: AxisKey;
  label: string;
  normalized: number; // 0-100
}

export interface MobilityProgram {
  overallScore: number;
  verdict: string;
  axisScores: AxisBreakdown[];
  weakAreas: { key: AxisKey; label: string; score: number }[];
  days: ProgramDay[];
}

// Supplemental exercises for areas that need more volume than the 2 drills cover
const SUPPLEMENTAL: Record<AxisKey, ProgramExercise[]> = {
  shoulders: [
    {
      name: "Doorway pec stretch",
      description:
        "Stand in a doorway, forearm on the frame at shoulder height. Step through until you feel a stretch across the chest. Hold 45 seconds each side.",
      sets: "2 × 45s per side",
      rest: "None",
      videoUrl: VIDEO_URLS["Doorway pec stretch"],
    },
    {
      name: "Prone I-Y-T raises",
      description:
        "Lie face down, arms overhead. Lift arms into an I shape (straight ahead), then Y, then T. Slow 3-second holds at the top. 6 reps each letter.",
      sets: "2 × 6 per shape",
      rest: "30s between sets",
      videoUrl: VIDEO_URLS["Prone I-Y-T raises"],
    },
  ],
  thoracic: [
    {
      name: "Foam roll thoracic extension",
      description:
        "Place a foam roller across your mid-back. Support your head with your hands. Gently extend over the roller, pause 2 seconds, return. Move the roller up one segment and repeat.",
      sets: "2 × 8 reps per segment",
      rest: "None",
      videoUrl: VIDEO_URLS["Foam roll thoracic extension"],
    },
    {
      name: "Cat-cow",
      description:
        "On all fours, alternate between rounding your back toward the ceiling (cat) and dropping your belly toward the floor (cow). Slow, 3 seconds each way.",
      sets: "2 × 10 reps",
      rest: "None",
      videoUrl: VIDEO_URLS["Cat-cow"],
    },
  ],
  hips: [
    {
      name: "Pigeon stretch",
      description:
        "From a plank, bring one knee forward behind your wrist. Lower your hips toward the floor. Hold and breathe. Keep the back leg straight.",
      sets: "2 × 60s per side",
      rest: "None",
      videoUrl: VIDEO_URLS["Pigeon stretch"],
    },
    {
      name: "Frog stretch",
      description:
        "On your knees, spread them as wide as comfortable. Rock your hips back toward your heels, then forward. Keep your back flat.",
      sets: "2 × 10 slow rocks",
      rest: "None",
      videoUrl: VIDEO_URLS["Frog stretch"],
    },
  ],
  hamstrings: [
    {
      name: "Seated forward fold",
      description:
        "Sit with legs straight in front. Hinge from the hips and reach toward your toes. Hold at end range. Don't round the upper back to cheat depth.",
      sets: "2 × 45s",
      rest: "None",
      videoUrl: VIDEO_URLS["Seated forward fold"],
    },
    {
      name: "Single-leg good morning",
      description:
        "Stand on one leg, slight knee bend. Hinge forward at the hips, free leg goes back. Feel the stretch in the standing-leg hamstring. 8 reps per side.",
      sets: "2 × 8 per side",
      rest: "30s between sets",
      videoUrl: VIDEO_URLS["Single-leg good morning"],
    },
  ],
  ankles: [
    {
      name: "Calf raises with eccentric hold",
      description:
        "Stand on a step, heels hanging off. Rise up on both feet, then lower slowly on one foot over 4 seconds. 10 reps per side.",
      sets: "2 × 10 per side",
      rest: "30s between sets",
      videoUrl: VIDEO_URLS["Calf raises with eccentric hold"],
    },
    {
      name: "Banded ankle dorsiflexion",
      description:
        "Loop a band around the front of your ankle, anchored behind you. Step forward into the knee-to-wall position. The band pulls the ankle joint into better range. 10 reps per side.",
      sets: "2 × 10 per side",
      rest: "None",
      videoUrl: VIDEO_URLS["Banded ankle dorsiflexion"],
    },
  ],
  core: [
    {
      name: "Bird dogs",
      description:
        "On all fours, extend opposite arm and leg. Hold 3 seconds, return. Keep your back flat and hips square the entire time.",
      sets: "2 × 8 per side",
      rest: "30s between sets",
      videoUrl: VIDEO_URLS["Bird dogs"],
    },
    {
      name: "Side plank",
      description:
        "Forearm on the ground, body in a straight line. Hold. If too hard, drop the bottom knee. Focus on not letting the hips sag.",
      sets: "2 × 20-30s per side",
      rest: "30s between sides",
      videoUrl: VIDEO_URLS["Side plank"],
    },
  ],
};

function drillToExercise(drill: DrillRecommendation): ProgramExercise {
  return {
    name: drill.name,
    description: drill.description,
    sets: "2 × 8-10 reps (or 2 × 45s holds)",
    rest: "30s between sets",
    videoUrl: VIDEO_URLS[drill.name],
  };
}

export function generateProgram(result: ScreenResult): MobilityProgram {
  const { overallScore, perAxis, weakAreas } = result;

  // Sort all axes by score ascending so we prioritize the weakest
  const ranked = [...perAxis].sort((a, b) => a.rawScore - b.rawScore);

  // Primary areas (weakest 2) get 3 sessions/week, secondary areas get 2
  const primary = ranked.slice(0, 2).map((a) => a.axis);
  const secondary = ranked.slice(2, 4).map((a) => a.axis);
  const maintenance = ranked.slice(4).map((a) => a.axis);

  function exercisesForAxis(
    axis: AxisKey,
    depth: "full" | "light"
  ): ProgramExercise[] {
    const coreDrills = DRILLS[axis].map(drillToExercise);
    if (depth === "light") return coreDrills;
    // Full: add one supplemental
    const extra = SUPPLEMENTAL[axis];
    return [...coreDrills, extra[0]];
  }

  function axisLabel(key: AxisKey): string {
    return AXES.find((a) => a.key === key)?.label ?? key;
  }

  // Build 7-day structure
  // Day 1: Primary A (full) + maintenance flow
  // Day 2: Primary B (full) + secondary A (light)
  // Day 3: Active recovery — full body light flow
  // Day 4: Primary A (full) + secondary B (light)
  // Day 5: Primary B (full) + maintenance flow
  // Day 6: Full body mobility flow
  // Day 7: Rest / walk

  const pA = primary[0] || ranked[0].axis;
  const pB = primary[1] || ranked[1]?.axis || pA;
  const sA = secondary[0] || ranked[2]?.axis || pA;
  const sB = secondary[1] || ranked[3]?.axis || pB;

  const fullBodyFlow: ProgramExercise[] = [
    ...DRILLS[pA].slice(0, 1).map(drillToExercise),
    ...DRILLS[pB].slice(0, 1).map(drillToExercise),
    ...DRILLS[sA].slice(0, 1).map(drillToExercise),
    ...DRILLS[sB].slice(0, 1).map(drillToExercise),
    ...maintenance
      .slice(0, 2)
      .flatMap((m) => DRILLS[m].slice(0, 1).map(drillToExercise)),
  ];

  const days: ProgramDay[] = [
    {
      label: "Day 1",
      focus: axisLabel(pA),
      duration: "15-20 min",
      exercises: [
        ...exercisesForAxis(pA, "full"),
        ...DRILLS[maintenance[0] || sA].slice(0, 1).map(drillToExercise),
      ],
    },
    {
      label: "Day 2",
      focus: `${axisLabel(pB)} + ${axisLabel(sA)}`,
      duration: "20 min",
      exercises: [
        ...exercisesForAxis(pB, "full"),
        ...exercisesForAxis(sA, "light"),
      ],
    },
    {
      label: "Day 3",
      focus: "Active recovery",
      duration: "10-15 min",
      exercises: [
        {
          name: "5-minute walk",
          description: "Easy pace. Get blood moving before you stretch.",
          sets: "5 min",
          rest: "—",
        },
        ...DRILLS[pA].slice(0, 1).map(drillToExercise),
        ...DRILLS[pB].slice(0, 1).map(drillToExercise),
        {
          name: "90/90 breathing",
          description:
            "On your back, calves on a chair, hips and knees at 90 degrees. Breathe in through the nose for 4 counts, out through the mouth for 6. 8 breaths.",
          sets: "8 breaths",
          rest: "—",
        },
      ],
    },
    {
      label: "Day 4",
      focus: `${axisLabel(pA)} + ${axisLabel(sB)}`,
      duration: "20 min",
      exercises: [
        ...exercisesForAxis(pA, "full"),
        ...exercisesForAxis(sB, "light"),
      ],
    },
    {
      label: "Day 5",
      focus: axisLabel(pB),
      duration: "15-20 min",
      exercises: [
        ...exercisesForAxis(pB, "full"),
        ...DRILLS[maintenance[0] || sB].slice(0, 1).map(drillToExercise),
      ],
    },
    {
      label: "Day 6",
      focus: "Full body flow",
      duration: "20-25 min",
      exercises: fullBodyFlow,
    },
    {
      label: "Day 7",
      focus: "Rest",
      duration: "—",
      exercises: [
        {
          name: "Rest day",
          description:
            "Take a walk. Let the work from the week settle. Repeat the program next week, aiming for slightly more range or control each session.",
          sets: "—",
          rest: "—",
        },
      ],
    },
  ];

  const verdict =
    overallScore >= 8.5
      ? "Strong baseline"
      : overallScore >= 6.5
      ? "Good, with specific gaps"
      : overallScore >= 4.5
      ? "Several areas to address"
      : "Worth addressing now";

  const weakAreaDetails = weakAreas.map((key) => {
    const axisScore = perAxis.find((a) => a.axis === key);
    return {
      key,
      label: axisLabel(key),
      score: axisScore ? axisScore.normalized : 0,
    };
  });

  const axisScores: AxisBreakdown[] = perAxis.map((a) => ({
    key: a.axis,
    label: axisLabel(a.axis),
    normalized: a.normalized,
  }));

  return {
    overallScore,
    verdict,
    axisScores,
    weakAreas: weakAreaDetails,
    days,
  };
}
