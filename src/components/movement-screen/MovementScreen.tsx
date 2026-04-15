"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { QUESTIONS, scoreResult } from "@/lib/movement-screen";
import MovementScreenIntro from "./Intro";
import MovementScreenQuestion from "./Question";
import MovementScreenResults from "./Results";

type Step = "intro" | "questions" | "results";

export default function MovementScreen() {
  const [step, setStep] = useState<Step>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<0 | 1 | 2 | null>>(
    QUESTIONS.map(() => null)
  );

  const handleStart = () => {
    trackEvent("movement_screen_start", {});
    setStep("questions");
    setCurrentIndex(0);
  };

  const handleAnswer = (score: 0 | 1 | 2) => {
    const next = [...answers];
    next[currentIndex] = score;
    setAnswers(next);

    trackEvent("movement_screen_question_answered", {
      question_id: QUESTIONS[currentIndex].id,
      answer_score: score,
    });

    if (currentIndex < QUESTIONS.length - 1) {
      // small delay so user sees the tick before advancing
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 250);
    } else {
      const result = scoreResult(next);
      trackEvent("movement_screen_completed", {
        overall_score: result.overallScore,
        weak_areas: result.weakAreas.join(",") || "none",
      });
      setTimeout(() => {
        setStep("results");
      }, 250);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleRestart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setCurrentIndex(0);
    setStep("intro");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (step === "intro") {
    return <MovementScreenIntro onStart={handleStart} />;
  }

  if (step === "questions") {
    const question = QUESTIONS[currentIndex];
    return (
      <MovementScreenQuestion
        question={question}
        index={currentIndex}
        total={QUESTIONS.length}
        selected={answers[currentIndex]}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  const result = scoreResult(answers);
  return <MovementScreenResults result={result} onRestart={handleRestart} />;
}
