"use client";

import { AXES, type AxisScore } from "@/lib/movement-screen";

interface Props {
  scores: AxisScore[];
  size?: number;
}

export default function RadarChart({ scores, size = 320 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 48; // leave room for labels
  const axisCount = AXES.length;

  const axisAngle = (i: number) => (Math.PI * 2 * i) / axisCount - Math.PI / 2;

  const point = (i: number, value: number) => {
    const angle = axisAngle(i);
    const r = (value / 100) * maxRadius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  // Grid circles at 25, 50, 75, 100
  const gridLevels = [25, 50, 75, 100];

  // Points for the filled polygon based on scores
  const polygonPoints = AXES.map((axis, i) => {
    const score = scores.find((s) => s.axis === axis.key);
    const value = score?.normalized ?? 0;
    const [x, y] = point(i, value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-auto"
      role="img"
      aria-label="Your movement screen radar chart"
    >
      {/* Grid circles as polygons (hexagons) */}
      {gridLevels.map((level) => {
        const pts = AXES.map((_, i) => {
          const [x, y] = point(i, level);
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="#1a1a1a"
            strokeOpacity={level === 100 ? 0.2 : 0.08}
            strokeWidth={1}
          />
        );
      })}

      {/* Axis lines */}
      {AXES.map((_, i) => {
        const [x, y] = point(i, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#1a1a1a"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        );
      })}

      {/* Filled score polygon */}
      <polygon
        points={polygonPoints}
        fill="#FFD140"
        fillOpacity={0.35}
        stroke="#CB4538"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {AXES.map((axis, i) => {
        const score = scores.find((s) => s.axis === axis.key);
        const value = score?.normalized ?? 0;
        const [x, y] = point(i, value);
        return (
          <circle
            key={axis.key}
            cx={x}
            cy={y}
            r={4}
            fill="#CB4538"
            stroke="white"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const angle = axisAngle(i);
        const labelRadius = maxRadius + 24;
        const lx = cx + labelRadius * Math.cos(angle);
        const ly = cy + labelRadius * Math.sin(angle);
        // Text anchor based on horizontal position
        const anchor =
          Math.abs(Math.cos(angle)) < 0.2
            ? "middle"
            : Math.cos(angle) > 0
            ? "start"
            : "end";
        return (
          <text
            key={axis.key}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-[#1a1a1a] text-[11px] font-semibold uppercase tracking-wider"
          >
            {axis.shortLabel}
          </text>
        );
      })}
    </svg>
  );
}
