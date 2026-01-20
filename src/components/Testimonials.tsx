"use client";

import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Client Name",
      role: "Software Engineer",
      quote:
        "I used to have constant neck and back pain from sitting at my desk all day. After working with Jeffrey for 3 months, I'm pain-free and stronger than I've ever been.",
      result: "Pain-free after 3 months",
    },
    {
      name: "Client Name",
      role: "Product Manager",
      quote:
        "Jeffrey's approach is different. He doesn't just tell you what to do - he teaches you WHY. I finally understand how my body works and how to take care of it.",
      result: "Built sustainable habits",
    },
    {
      name: "Client Name",
      role: "Startup Founder",
      quote:
        "As someone who travels a lot, I needed a trainer who could work with my schedule. The online sessions are just as effective as in-person, and the app keeps me accountable.",
      result: "Consistent progress despite travel",
    },
    {
      name: "Client Name",
      role: "Healthcare Professional",
      quote:
        "I've worked with several trainers before, but Jeffrey is the first one who actually fixed my movement patterns. My squat has never felt better.",
      result: "Fixed movement patterns",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            What Clients Say
          </h2>
          <div className="w-16 h-1 bg-[#FFD140] mx-auto mt-4"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Real results from real people who are committed to their health.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-[#EEEADA] rounded-2xl p-8 transition-all duration-300 ${
                activeIndex === index ? "ring-2 ring-[#FFD140]" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-[#FFD140] mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 text-lg italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Result badge */}
              <div className="inline-block bg-[#FFD140] text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Placeholder avatar */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-black">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">See more reviews on</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.yelp.com/biz/jeff-sun-fitness-sunnyvale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-[#CB4538] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L12 4.414l8.293 8.293a1 1 0 001.414-1.414l-9-9z" />
              </svg>
              <span className="font-semibold">Yelp</span>
            </a>
            <a
              href="https://maps.app.goo.gl/XyrnsHXu9K1xYqXw5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-[#CB4538] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="font-semibold">Google</span>
            </a>
            <a
              href="https://www.instagram.com/jeffsunfitness/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-[#CB4538] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
