import TrackedCTALink from "@/components/TrackedCTALink";
import type { ServiceArea } from "@/lib/service-areas";

export default function ServiceAreaHero({ area }: { area: ServiceArea }) {
  const words = area.heroHeadline.split(" ");
  const cityWord = area.city;
  const headlineWithoutCity = area.heroHeadline.replace(cityWord, "").trim();

  return (
    <section className="relative bg-[#1a1a1a] text-white overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Subtle grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-48 h-[500px] w-[500px] rounded-full bg-[#FFD140]/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#FFD140] font-medium mb-6">
          {area.heroTag}
        </p>

        <h1 className="text-display-lg mb-8 max-w-4xl">
          {headlineWithoutCity}{" "}
          <span className="highlight">{cityWord}</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
          {area.heroSubheadline}
        </p>

        {/* Quick facts row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 max-w-4xl">
          {area.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="border-l-2 border-[#FFD140] pl-4"
            >
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                {fact.label}
              </p>
              <p className="text-sm md:text-base text-white font-semibold">
                {fact.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <TrackedCTALink
            href="/#apply"
            section={`service_area_${area.slug}_hero`}
            buttonText="Book Your Free Consultation"
            className="btn-secondary text-center w-full sm:w-auto"
          >
            Book Your Free Consultation
          </TrackedCTALink>
          <TrackedCTALink
            href="#how-training-works"
            section={`service_area_${area.slug}_hero_secondary`}
            buttonText="See how it works"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors w-full sm:w-auto"
          >
            See how it works
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </TrackedCTALink>
        </div>
      </div>
    </section>
  );
}
