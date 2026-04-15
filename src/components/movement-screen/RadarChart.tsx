"use client";

import { useEffect, useState } from "react";
import { AXES, type AxisScore } from "@/lib/movement-screen";

interface Props {
  scores: AxisScore[];
  size?: number;
  /** When true, animate the radar drawing itself */
  animate?: boolean;
}

export default function RadarChart({ scores, size = 320, animate = true }: Props) {
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return;
    let raf: number;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 52;
  const axisCount = AXES.length;

  const axisAngle = (i: number) => (Math.PI * 2 * i) / axisCount - Math.PI / 2;

  const point = (i: number, value: number) => {
    const angle = axisAngle(i);
    const r = (value / 100) * maxRadius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const gridLevels = [25, 50, 75, 100];

  const polygonPoints = AXES.map((axis, i) => {
    const score = scores.find((s) => s.axis === axis.key);
    const value = (score?.normalized ?? 0) * progress;
    const [x, y] = point(i, value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-auto"
      role="img"
      aria-label="Movement score radar chart"
    >
      <defs>
        <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD140" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFD140" stopOpacity="0.12" />
        </radialGradient>
      </defs>

      {/* Grid polygons */}
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
            stroke="rgba(255,255,255,0.08)"
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
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        );
      })}

      {/* Filled polygon with glow */}
      <g filter="url(#radar-glow)">
        <polygon
          points={polygonPoints}
          fill="url(#radar-fill)"
          stroke="#FFD140"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeOpacity={0.9}
        />
      </g>

      {/* Score dots */}
      {AXES.map((axis, i) => {
        const score = scores.find((s) => s.axis === axis.key);
        const value = (score?.normalized ?? 0) * progress;
        const [x, y] = point(i, value);
        return (
          <g key={axis.key}>
            <circle
              cx={x}
              cy={y}
              r={5}
              fill="#1a1a1a"
              stroke="#FFD140"
              strokeWidth={2}
            />
          </g>
        );
      })}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const angle = axisAngle(i);
        const labelRadius = maxRadius + 28;
        const lx = cx + labelRadius * Math.cos(angle);
        const ly = cy + labelRadius * Math.sin(angle);
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
            className="fill-white/70 text-[10px] font-semibold uppercase tracking-[0.2em]"
          >
            {axis.shortLabel}
          </text>
        );
      })}
    </svg>
  );
}
