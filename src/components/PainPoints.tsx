"use client";

export default function PainPoints() {
  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const painPoints = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      ),
      title: "Constant neck and upper back tightness from desk jobs",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Low back pain from a sedentary lifestyle",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Lack of structure and routine in exercise and health",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Never learning proper form or getting formal instruction",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Wanting to feel athletic and capable in your body again",
    },
  ];

  return (
    <section className="section-padding bg-[#EEEADA]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#CB4538] font-medium mb-2">Quick question:</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Are You Tired Of...
          </h2>
        </div>

        {/* Pain points list */}
        <div className="space-y-4 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white rounded-xl"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-[#CB4538] text-white rounded-full flex items-center justify-center">
                {point.icon}
              </div>
              <p className="text-lg text-black font-medium pt-1.5">
                {point.title}
              </p>
            </div>
          ))}
        </div>

        {/* Transition text */}
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-6">
            What might sound too good to be true is{" "}
            <strong>totally achievable with the right system.</strong>
          </p>
          <p className="text-lg text-gray-600 mb-8">
            That&apos;s why I created a training approach focused on{" "}
            <span className="highlight font-semibold">health longevity</span> -
            not quick fixes that don&apos;t last.
          </p>
          <a
            href="#apply"
            onClick={scrollToApply}
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Your Transformation
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
