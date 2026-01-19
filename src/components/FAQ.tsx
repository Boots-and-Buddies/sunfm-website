"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Where are training sessions held?",
      answer:
        "I offer both in-person and online training. In-person sessions are held in Sunnyvale, with clients coming from San Jose, Cupertino, Santa Clara, Mountain View, Campbell, and throughout the South Bay Area. Online sessions are conducted via video call and are just as effective for most clients.",
    },
    {
      question: "What happens during the free consultation?",
      answer:
        "The consultation is a free 1-hour session where we discuss your goals, assess your current fitness level, and identify any pain points or limitations. It includes a talking consult at the beginning, a short workout focusing on breathwork, abs, and mobility, and a breakdown of how my training program would work for you. There's no obligation to sign up.",
    },
    {
      question: "How much does training cost?",
      answer:
        "Pricing depends on your specific needs and training frequency. I offer various packages ranging from individual sessions to comprehensive monthly programs. During the free consultation, I'll recommend the best option for your goals and budget. Most clients invest in packages that work out to 2-3 sessions per week.",
    },
    {
      question: "Do you offer online training?",
      answer:
        "Yes! I offer online training for clients who travel frequently or prefer the flexibility of training from home. Online sessions include live video coaching, custom programming through my training app, and ongoing support. Many clients do a mix of in-person and online sessions.",
    },
    {
      question: "What makes your approach different?",
      answer:
        "I focus on health longevity, not quick fixes. My background in Human Biology and experience as an EMT gives me a deeper understanding of how the body works. I specialize in movement pattern correction, helping clients eliminate pain at the source rather than just treating symptoms. Most importantly, I teach you WHY, not just what to do.",
    },
    {
      question: "How do you track progress?",
      answer:
        "I use a combination of methods: my training app tracks your workouts and progress, periodic DEXA scans give us accurate body composition data, and I check in on big compound lifts monthly. For mobility work, I use pain levels and range of motion as indicators. We'll set clear benchmarks during your consultation.",
    },
    {
      question: "I have an injury. Can I still train?",
      answer:
        "Many of my clients come to me while recovering from injuries or dealing with chronic pain. My specialty is transitioning people from therapy to training safely. I work with your healthcare providers when needed and modify exercises to accommodate your limitations while still making progress.",
    },
    {
      question: "What if my schedule is packed?",
      answer:
        "I understand busy professionals have demanding schedules. That's why I offer flexible scheduling including early morning and evening slots. We can also do a mix of in-person and online sessions to fit your availability. Even 1 session per week can lead to significant progress when done consistently.",
    },
    {
      question: "Do I need any equipment?",
      answer:
        "For in-person training, I have all the equipment we need. For online sessions, basic equipment like dumbbells, resistance bands, and a mat are helpful but not required to start. I can design effective programs with minimal equipment. During your consultation, I'll recommend what to get based on your goals and space.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#FFD140] mx-auto mt-4"></div>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-bold text-black pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#CB4538] flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:jeff@jeffsunfitness.com"
            className="text-[#CB4538] font-semibold hover:underline"
          >
            Email me directly
          </a>
        </div>
      </div>
    </section>
  );
}
