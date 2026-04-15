"use client";

import { useEffect, useRef } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the card into a good reading position on question change (esp. mobile)
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [question.id]);

  const progress = ((index + 1) / total) * 100;

  return (
    <div ref={cardRef} className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">
          Test {index + 1} of {total}
        </p>
        <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
      </div>
      <div className="h-1 bg-black/10 rounded-full overflow-hidden mb-10">
        <div
          className="h-full bg-[#CB4538] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-6 sm:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight mb-3">
          {question.title}
        </h2>
        <div className="w-10 h-1 bg-[#FFD140] mb-6" />

        <div className="prose prose-sm max-w-none mb-3">
          <p className="text-gray-600 leading-relaxed">{question.setup}</p>
        </div>
        <p className="text-base text-[#1a1a1a] font-medium mb-8">
          {question.instruction}
        </p>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selected === option.score;
            return (
              <button
                key={option.score}
                type="button"
                onClick={() => onAnswer(option.score)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? "border-[#CB4538] bg-[#CB4538]/5"
                    : "border-black/10 hover:border-[#1a1a1a]/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-[#CB4538] bg-[#CB4538]"
                        : "border-black/20"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1a1a] mb-1">
                      {option.label}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {option.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Back button */}
      {index > 0 && (
        <div className="mt-6 flex justify-start">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#CB4538] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        </div>
      )}
    </div>
  );
}
