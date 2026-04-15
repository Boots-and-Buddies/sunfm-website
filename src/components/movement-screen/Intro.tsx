"use client";

import { useEffect } from "react";
import BodyDiagram from "./BodyDiagram";
import { QUESTIONS } from "@/lib/movement-screen";

interface Props {
  onStart: () => void;
}

export default function MovementScreenIntro({ onStart }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onStart]);

  return (
    <div className="relative z-10 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#FFD140] font-semibold mb-8 animate-fade-up">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD140] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFD140]" />
            </span>
            Movement Screen · Live
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-8 animate-fade-up animate-delay-100">
            Find the <em className="not-italic text-[#CB4538]">weakest link</em> in your body.
          </h1>

          <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-10 animate-fade-up animate-delay-200">
            A {QUESTIONS.length}-test diagnostic used on every new client at
            my San Jose studio. You'll do each movement yourself and self-score
            it. Four to five minutes. No email. Then we look at the results
            together.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-up animate-delay-300">
            <button
              type="button"
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#FFD140] text-black font-semibold text-base hover:bg-white transition-colors shadow-[0_0_40px_-4px_rgba(255,209,64,0.5)] hover:shadow-[0_0_60px_-4px_rgba(255,209,64,0.7)]"
            >
              <span>Begin scan</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono tracking-wider">
              <kbd className="px-2 py-1 rounded border border-white/10 text-white/70">
                enter
              </kbd>
              <span>or click to start</span>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 animate-fade-up animate-delay-400">
            <Stat label="Tests" value={String(QUESTIONS.length)} />
            <Stat label="Minutes" value="~5" />
            <Stat label="Email required" value="No" />
          </div>
        </div>

        {/* Right: animated body */}
        <div className="relative hidden lg:flex items-center justify-center animate-fade-up animate-delay-300">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#FFD140]/10 blur-3xl animate-pulse-slow" />
            <div className="relative">
              <BodyDiagram size={320} mode="active" active={null} />
            </div>
            <CornerBracket position="tl" />
            <CornerBracket position="tr" />
            <CornerBracket position="bl" />
            <CornerBracket position="br" />
          </div>

          {/* Scanning ticks */}
          <div className="absolute top-4 left-0 flex flex-col gap-1 font-mono text-[10px] text-white/30 tracking-wider">
            <span>SCAN MODE</span>
            <span className="text-[#FFD140]">STANDBY</span>
          </div>
          <div className="absolute top-4 right-0 flex flex-col items-end gap-1 font-mono text-[10px] text-white/30 tracking-wider">
            <span>SUBJECT</span>
            <span className="text-white/60">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1">
        {label}
      </p>
      <p className="font-display text-3xl text-white leading-none">{value}</p>
    </div>
  );
}

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const cls = {
    tl: "top-0 left-0 border-l-2 border-t-2",
    tr: "top-0 right-0 border-r-2 border-t-2",
    bl: "bottom-0 left-0 border-l-2 border-b-2",
    br: "bottom-0 right-0 border-r-2 border-b-2",
  }[position];
  return (
    <span
      aria-hidden="true"
      className={`absolute w-6 h-6 border-[#FFD140]/40 ${cls}`}
    />
  );
}
