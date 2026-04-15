"use client";

import Link from "next/link";
import RadarChart from "./RadarChart";
import TrackedCTALink from "@/components/TrackedCTALink";
import {
  AXES,
  DRILLS,
  type AxisKey,
  type ScreenResult,
} from "@/lib/movement-screen";

interface Props {
  result: ScreenResult;
  onRestart: () => void;
}

function axisLabel(key: AxisKey) {
  return AXES.find((a) => a.key === key)?.label ?? key;
}

function scoreVerdict(overall: number) {
  if (overall >= 8.5) {
    return {
      tag: "Strong baseline",
      blurb:
        "Your self-reported mobility is in great shape across the board. The work ahead is about keeping it there. Strength under that mobility is usually where the next level comes from.",
    };
  }
  if (overall >= 6.5) {
    return {
      tag: "Good with specific gaps",
      blurb:
        "You're mostly in a healthy range, but there are specific areas that are starting to slip. Addressing them now is much cheaper than addressing them after they've caused pain.",
    };
  }
  if (overall >= 4.5) {
    return {
      tag: "Several red flags",
      blurb:
        "A handful of areas are in restricted territory. This is where most professionals your age sit after a decade of desk work, and it's entirely reversible. The fix is consistency with the right drills.",
    };
  }
  return {
    tag: "Worth addressing now",
    blurb:
      "Your body is asking for attention. The good news is that scores in this range tend to improve quickly once you start targeted work. The same patterns of stiffness are what I see in most new clients in their first month.",
  };
}

export default function MovementScreenResults({ result, onRestart }: Props) {
  const { overallScore, perAxis, weakAreas } = result;
  const verdict = scoreVerdict(overallScore);
  const hasWeakAreas = weakAreas.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Top card: score + radar + verdict */}
      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden mb-10">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 p-6 sm:p-10 md:p-12 items-center">
          {/* Left: score + verdict */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#CB4538] font-semibold mb-4">
              Your movement score
            </p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-7xl md:text-8xl font-bold text-[#1a1a1a] leading-none">
                {overallScore.toFixed(1)}
              </span>
              <span className="text-2xl text-gray-400">/ 10</span>
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFD140] text-black text-xs font-bold uppercase tracking-wider mb-4">
              {verdict.tag}
            </div>
            <p className="text-gray-600 leading-relaxed">{verdict.blurb}</p>
          </div>

          {/* Right: radar */}
          <div className="flex justify-center">
            <RadarChart scores={perAxis} size={360} />
          </div>
        </div>

        {/* Per-axis score strip */}
        <div className="border-t border-black/5 px-6 sm:px-10 md:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {perAxis.map((axis) => (
              <div key={axis.axis}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-1">
                  {AXES.find((a) => a.key === axis.axis)?.shortLabel}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#1a1a1a]">
                    {(axis.rawScore / 2 * 10).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority areas / drills */}
      {hasWeakAreas ? (
        <div className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-medium mb-3">
            Where to focus first
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 leading-tight">
            Your top {weakAreas.length === 1 ? "priority" : "priorities"}
          </h2>
          <div className="w-12 h-1 bg-[#FFD140] mb-10" />

          <div className="space-y-10">
            {weakAreas.map((axisKey, i) => {
              const drills = DRILLS[axisKey];
              return (
                <div
                  key={axisKey}
                  className="bg-white rounded-3xl shadow-sm border border-black/5 p-6 sm:p-10"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#CB4538] text-white flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-snug">
                        {axisLabel(axisKey)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Start with these two drills. Do them four or five days
                        a week. You should feel a difference in two to three
                        weeks.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {drills.map((drill) => (
                      <div
                        key={drill.name}
                        className="p-5 rounded-2xl border border-black/5 bg-[#EEEADA]/40"
                      >
                        <h4 className="font-bold text-[#1a1a1a] mb-2">
                          {drill.name}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {drill.description}
                        </p>
                        {drill.link && (
                          <Link
                            href={drill.link.href}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#CB4538] hover:underline"
                          >
                            {drill.link.label}
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-6 sm:p-10 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
            Nothing obvious to fix
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
            Your self-scored mobility is in a strong place across the board.
            The next work for someone at your baseline is usually strength
            under that mobility, which is where most of my long-term clients
            end up focusing.
          </p>
        </div>
      )}

      {/* Conversion CTA */}
      <div className="bg-[#1a1a1a] text-white rounded-3xl p-8 sm:p-12 md:p-14 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#FFD140]/10 blur-3xl"
        />
        <div className="relative">
          <p className="text-xs tracking-[0.25em] uppercase text-[#FFD140] font-semibold mb-4">
            The 1-on-1 version
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5 max-w-2xl mx-auto">
            {hasWeakAreas
              ? "Ready to actually fix these?"
              : "Ready to build strength under the mobility?"}
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            A self-screen shows where you are today. A real program makes the
            change stick. In a free 30-minute consultation, I'll assess you in
            person and map out a training plan built around these specific
            restrictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
            <TrackedCTALink
              href="/#apply"
              section="movement_screen_results_cta"
              buttonText="Book Your Free Consultation"
              className="btn-secondary text-center"
            >
              Book Your Free Consultation
            </TrackedCTALink>
            <button
              type="button"
              onClick={onRestart}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Retake the screen
            </button>
          </div>
          <p className="text-xs text-white/40 max-w-sm mx-auto">
            12,000+ sessions. ACE-certified. No hard sell. If we aren't the
            right fit, I'll tell you.
          </p>
        </div>
      </div>
    </div>
  );
}
