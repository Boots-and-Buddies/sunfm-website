import type { Metadata } from "next";
import Link from "next/link";
import AmbientBackground from "@/components/movement-screen/AmbientBackground";
import MovementScreen from "@/components/movement-screen/MovementScreen";

const canonical = "https://www.sunfm.fitness/tools/movement-screen";

export const metadata: Metadata = {
  title: "The Movement Screen · Sun Functional Movement",
  description:
    "A 6-test mobility self-assessment from a San Jose personal trainer. Find your tightest areas, get specific drill recommendations, and see where training would help most.",
  alternates: { canonical },
  openGraph: {
    title: "The Movement Screen — 2-minute mobility diagnostic",
    description:
      "Score your shoulder, thoracic, hip, hamstring, ankle, and core mobility on six axes. Personalized drill recommendations included.",
    type: "website",
    url: canonical,
    images: [
      {
        url: "https://www.sunfm.fitness/images/jeffrey-headshot-final.jpg",
        width: 1200,
        height: 1600,
        alt: "The Movement Screen by Jeffrey Sun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Movement Screen — 2-minute mobility diagnostic",
    description:
      "Score your mobility on six axes. Personalized drill recommendations included.",
  },
};

export default function MovementScreenPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      <AmbientBackground />

      {/* Minimal top bar */}
      <div className="relative z-20 flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
          aria-label="Back to SunFM"
        >
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          sunfm
        </Link>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">
          <span className="hidden sm:inline">Diagnostic</span>
          <span className="h-px w-6 bg-white/20" />
          <span>v2.0</span>
        </div>
      </div>

      {/* Content fills remaining viewport; short screens (intro, question)
          are vertically centered. Long screens (results) grow naturally
          and are effectively top-aligned because the container grows to
          match them. */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-6 md:py-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovementScreen />
        </div>
      </div>
    </main>
  );
}
