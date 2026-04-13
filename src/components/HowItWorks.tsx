"use client";

import { trackEvent } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";

export default function HowItWorks() {
  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const revealRef = useReveal<HTMLDivElement>();

  const steps = [
    {
      title: "Free Consultation",
      description:
        "Book a free 1-hour consultation where we discuss your goals, assess your current fitness level, and identify any pain points or limitations. This includes a short workout focusing on breathwork, abs, and mobility.",
    },
    {
      title: "Custom Program Design",
      description:
        "Based on your consultation, I create a personalized training program tailored to your goals, schedule, and body. We'll set up progress tracking through my app and schedule a DEXA scan for baseline measurements.",
    },
    {
      title: "Training Sessions",
      description:
        "Work with me through in-person sessions in the South Bay area or online. Each session is focused on proper form, progressive overload, and building sustainable habits. Most clients train 2-3x per week.",
    },
    {
      title: "Track & Optimize",
      description:
        "Monitor your progress through the training app, regular check-ins, and periodic DEXA scans. We adjust your program as you improve, ensuring continuous progress toward your longevity goals.",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto" ref={revealRef}>
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 reveal">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Process</p>
            <h2 className="text-display text-[#1a1a1a]">
              How It Works
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              A simple, proven process to help you move better, feel stronger, and
              build a body that lasts.
            </p>
          </div>
        </div>

        {/* Steps - alternating offset grid */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`py-10 md:py-14 border-t border-black/10 reveal reveal-delay-${Math.min(index + 1, 5)} ${index % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl md:text-8xl font-display text-gray-200 leading-none select-none">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl md:text-3xl font-display text-[#1a1a1a] mb-4 -mt-4 md:-mt-8 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center md:text-left reveal reveal-delay-3">
          <a
            href="#apply"
            onClick={(e) => {
              scrollToApply(e);
              trackEvent("cta_click", { button_text: "Start With Your Free Consultation", section: "how_it_works" });
            }}
            className="btn-primary text-lg"
          >
            Start With Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
