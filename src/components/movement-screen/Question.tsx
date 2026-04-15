"use client";

import { useEffect } from "react";
import BodyDiagram from "./BodyDiagram";
import type { Question as QuestionType } from "@/lib/movement-screen";

interface Props {
  question: QuestionType;
  index: number;
  total: number;
  selected: 0 | 1 | 2 | null;
  onAnswer: (score: 0 | 1 | 2) => void;
  onBack: () => void;
}

export default function MovementScreenQuestion({
  question,
  index,
  total,
  selected,
  onAnswer,
  onBack,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") onAnswer(2);
      else if (e.key === "2") onAnswer(1);
      else if (e.key === "3") onAnswer(0);
      else if (e.key === "Backspace" || e.key === "ArrowLeft") onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onAnswer, onBack]);

  const progress = ((index + 1) / total) * 100;
  const progressPrev = (index / total) * 100;

  return (
    <div
      key={question.id}
      className="relative z-10 max-w-6xl mx-auto animate-fade-up"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FFD140] font-semibold">
            Test {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] text-white/30">
            / {String(total).padStart(2, "0")}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
          {question.axis}
        </span>
      </div>
      <div className="relative h-[2px] bg-white/[0.08] rounded-full overflow-hidden mb-6 md:mb-8">
        <div
          className="absolute inset-y-0 left-0 bg-[#FFD140]"
          style={{
            width: `${progress}%`,
            transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "100ms",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-[#FFD140]/40 blur-sm"
          style={{
            width: `${progress}%`,
            transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "100ms",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
        {/* Left: test content */}
        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-4">
            {question.title}
          </h2>

          <div className="mb-6 space-y-2.5 max-w-xl">
            <div className="flex items-start gap-3">
              <p className="flex-shrink-0 w-14 text-[10px] uppercase tracking-[0.2em] text-[#FFD140] font-semibold font-mono mt-1">
                Setup
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {question.setup}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <p className="flex-shrink-0 w-14 text-[10px] uppercase tracking-[0.2em] text-[#FFD140] font-semibold font-mono mt-1">
                Test
              </p>
              <p className="text-sm text-white leading-relaxed">
                {question.instruction}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((option, i) => {
              const isSelected = selected === option.score;
              const shortcut = i + 1;
              return (
                <button
                  key={option.score}
                  type="button"
                  onClick={() => onAnswer(option.score)}
                  className={`group w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-[#FFD140] bg-[#FFD140]/[0.08] shadow-[0_0_32px_-8px_rgba(255,209,64,0.5)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <kbd
                      className={`flex-shrink-0 w-8 h-8 rounded-lg font-mono text-sm font-bold flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#FFD140] text-black"
                          : "bg-white/5 text-white/40 border border-white/10 group-hover:bg-white/10 group-hover:text-white/70"
                      }`}
                    >
                      {shortcut}
                    </kbd>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold leading-tight mb-0.5 ${
                          isSelected ? "text-white" : "text-white/90"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p className="text-xs text-white/50 leading-snug">
                        {option.detail}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav hints */}
          <div className="mt-5 flex items-center justify-between font-mono text-[10px] text-white/30">
            <div className="flex items-center gap-3">
              {index > 0 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <kbd className="px-1.5 py-0.5 rounded border border-white/10">
                    ←
                  </kbd>
                  <span>back</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">1</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">2</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10">3</kbd>
              <span className="ml-1">to answer</span>
            </div>
          </div>
        </div>

        {/* Right: body diagram showing which region is being scanned */}
        <div className="hidden lg:flex items-center justify-center relative pt-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#FFD140]/8 blur-3xl animate-pulse-slow" />
            <div className="relative">
              <BodyDiagram size={260} mode="active" active={question.axis} />
            </div>
          </div>

          {/* Scan indicators */}
          <div className="absolute top-0 left-0 right-0 flex justify-between font-mono text-[9px] text-white/30 tracking-wider pointer-events-none">
            <span>REGION</span>
            <span className="text-[#FFD140]">{question.axis.toUpperCase()}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between font-mono text-[9px] text-white/30 tracking-wider pointer-events-none">
            <span>SCAN</span>
            <span className="text-[#FFD140]">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
