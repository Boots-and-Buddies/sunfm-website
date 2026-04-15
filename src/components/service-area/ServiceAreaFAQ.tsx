import RevealWrapper from "@/components/RevealWrapper";
import type { FAQ } from "@/lib/service-areas";

export default function ServiceAreaFAQ({
  faqs,
  city,
}: {
  faqs: FAQ[];
  city: string;
}) {
  return (
    <section className="py-20 md:py-28 bg-[#EEEADA]">
      <RevealWrapper className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-500 font-medium mb-4 reveal">
          FAQ
        </p>
        <h2 className="text-display scroll-skew text-[#1a1a1a] mb-3 reveal reveal-delay-1">
          Questions from {city} clients
        </h2>
        <div className="w-12 h-1 bg-[#FFD140] mb-12 reveal reveal-delay-2" />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className={`group bg-white rounded-2xl border border-black/5 overflow-hidden open:shadow-sm transition-shadow reveal reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-6">
                <h3 className="text-base md:text-lg font-semibold text-[#1a1a1a] leading-snug">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 w-6 h-6 mt-0.5 flex items-center justify-center rounded-full bg-[#FFD140] text-black transition-transform group-open:rotate-45">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 -mt-1 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
