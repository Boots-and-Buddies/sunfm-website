import type { Metadata } from "next";
import Header from "@/components/Header";
import MovementScreen from "@/components/movement-screen/MovementScreen";

const canonical = "https://www.sunfm.fitness/tools/movement-screen";

export const metadata: Metadata = {
  title: "The Movement Screen: Free Mobility Assessment | Sun Functional Movement",
  description:
    "A 6-test mobility self-assessment from a San Jose personal trainer with 12,000+ sessions. Find your tightest areas, get specific drill recommendations, and see where training would help most.",
  alternates: { canonical },
  openGraph: {
    title: "The Movement Screen — 2-minute mobility self-assessment",
    description:
      "Score your shoulder, thoracic, hip, hamstring, ankle, and core mobility. Personalized drill recommendations included.",
    type: "website",
    url: canonical,
    images: [
      {
        url: "https://www.sunfm.fitness/images/jeffrey-headshot-final.jpg",
        width: 1200,
        height: 900,
        alt: "The Movement Screen by Jeffrey Sun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Movement Screen — 2-minute mobility self-assessment",
    description:
      "Score your mobility on six axes. Get personalized drill recommendations.",
  },
};

export default function MovementScreenPage() {
  return (
    <>
      <Header />
      <main className="bg-[#EEEADA] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-16 md:pb-28">
          <MovementScreen />
        </div>
      </main>
    </>
  );
}
