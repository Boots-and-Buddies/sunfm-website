"use client";

import type { AxisKey } from "@/lib/movement-screen";

interface Props {
  size?: number;
  /** Axis currently being tested (single-highlight mode) */
  active?: AxisKey | null;
  /** Axis map with per-region intensity 0-1 for results mode */
  heatmap?: Partial<Record<AxisKey, number>>;
  /** Use red (weak areas) or yellow (active/accent) */
  mode?: "active" | "heatmap";
}

// Region path definitions keyed by axis. Each is a list of <path d="..."> strings.
// Coordinates target a 240 x 480 viewBox (narrow, tall).
const REGION_PATHS: Record<AxisKey, string[]> = {
  shoulders: [
    // Both shoulder caps
    "M 70 118 C 58 120, 52 132, 56 148 L 80 150 L 84 124 Z",
    "M 170 118 C 182 120, 188 132, 184 148 L 160 150 L 156 124 Z",
  ],
  thoracic: [
    // Upper-mid back
    "M 84 125 L 156 125 L 154 185 L 86 185 Z",
  ],
  core: [
    // Midsection (abs area)
    "M 90 185 L 150 185 L 148 235 L 92 235 Z",
  ],
  hips: [
    // Hip girdle
    "M 82 230 C 82 240, 90 252, 120 252 C 150 252, 158 240, 158 230 L 155 255 L 85 255 Z",
  ],
  hamstrings: [
    // Back of upper legs
    "M 88 260 L 116 260 L 115 340 L 90 340 Z",
    "M 124 260 L 152 260 L 150 340 L 125 340 Z",
  ],
  ankles: [
    // Ankles just above feet
    "M 92 395 L 112 395 L 112 418 L 94 418 Z",
    "M 128 395 L 148 395 L 146 418 L 130 418 Z",
  ],
};

export default function BodyDiagram({
  size = 240,
  active = null,
  heatmap,
  mode = "active",
}: Props) {
  const highlightColor = "#FFD140";
  const warningColor = "#CB4538";

  const regionIntensity = (axis: AxisKey): number => {
    if (mode === "active") {
      return active === axis ? 1 : 0;
    }
    return heatmap?.[axis] ?? 0;
  };

  return (
    <svg
      viewBox="0 0 240 480"
      className="w-full h-auto"
      style={{ maxHeight: size * 2, width: size }}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <filter id="body-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="body-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
      </defs>

      {/* Base wireframe body */}
      <g
        fill="none"
        stroke="url(#body-stroke)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Head */}
        <circle cx="120" cy="45" r="24" />
        {/* Neck */}
        <path d="M 112 67 L 112 82 M 128 67 L 128 82" />
        {/* Torso outline */}
        <path d="M 84 90 L 156 90 L 158 235 C 158 248, 152 258, 120 258 C 88 258, 82 248, 82 235 Z" />
        {/* Arms */}
        <path d="M 70 115 C 58 125, 52 150, 58 195 L 52 255" />
        <path d="M 170 115 C 182 125, 188 150, 182 195 L 188 255" />
        {/* Elbow/forearm joints (visual detail) */}
        <circle cx="55" cy="195" r="2.5" fill="rgba(255,255,255,0.18)" stroke="none" />
        <circle cx="185" cy="195" r="2.5" fill="rgba(255,255,255,0.18)" stroke="none" />
        {/* Legs */}
        <path d="M 90 258 L 104 340 L 100 420 L 96 420 L 100 440" />
        <path d="M 150 258 L 136 340 L 140 420 L 144 420 L 140 440" />
        {/* Knees */}
        <circle cx="104" cy="340" r="3" fill="rgba(255,255,255,0.18)" stroke="none" />
        <circle cx="136" cy="340" r="3" fill="rgba(255,255,255,0.18)" stroke="none" />
        {/* Shoulders landmarks */}
        <circle cx="78" cy="108" r="3" fill="rgba(255,255,255,0.18)" stroke="none" />
        <circle cx="162" cy="108" r="3" fill="rgba(255,255,255,0.18)" stroke="none" />
      </g>

      {/* Region highlights */}
      {(Object.keys(REGION_PATHS) as AxisKey[]).map((axis) => {
        const intensity = regionIntensity(axis);
        if (intensity <= 0) return null;
        const color = mode === "heatmap" ? warningColor : highlightColor;
        return (
          <g key={axis} filter="url(#body-glow)">
            {REGION_PATHS[axis].map((d, i) => (
              <path
                key={i}
                d={d}
                fill={color}
                fillOpacity={0.25 * intensity}
                stroke={color}
                strokeWidth={1.25}
                strokeOpacity={0.7 * intensity}
                style={{
                  transition: "fill-opacity 400ms ease, stroke-opacity 400ms ease",
                }}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
