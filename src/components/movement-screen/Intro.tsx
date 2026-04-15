"use client";

import { QUESTIONS } from "@/lib/movement-screen";

interface Props {
  onStart: () => void;
}

export default function MovementScreenIntro({ onStart }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-xs tracking-[0.25em] uppercase text-[#CB4538] font-semibold mb-4">
        Movement Screen
      </p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6">
        Where does your body need the most work?
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">
        A {QUESTIONS.length}-question self-assessment used by a San Jose
        personal trainer with 12,000+ sessions. You'll do each movement
        yourself, self-score it honestly, and get back a ranked picture of
        where your mobility is strong, where it's slipping, and what to do
        about it.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
        <button
          type="button"
          onClick={onStart}
          className="btn-primary text-base"
        >
          Start the screen
        </button>
        <p className="text-sm text-gray-500">
          Takes about {Math.max(2, Math.round(QUESTIONS.length * 0.4))}{" "}
          minutes. No email required.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto pt-8 border-t border-black/10">
        <div>
          <div className="w-10 h-10 rounded-xl bg-[#FFD140] flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a] mb-1">
            Honest self-score
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Each test has clear pass / partial / fail criteria.
          </p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-xl bg-[#FFD140] flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a] mb-1">
            Ranked by priority
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Radar chart shows exactly where to focus first.
          </p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-xl bg-[#FFD140] flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a1a1a] mb-1">
            Real drills, not theory
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Specific movements you can start doing today.
          </p>
        </div>
      </div>
    </div>
  );
}
