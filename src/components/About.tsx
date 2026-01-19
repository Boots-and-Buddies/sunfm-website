import Image from "next/image";
import Link from "next/link";

export default function About() {
  const specialties = [
    "Mobility & Flexibility",
    "Movement Pattern Correction",
    "Transition from Therapy to Training",
    "Hypertrophy",
    "Athletic Performance",
    "Functional Strength",
  ];

  const education = [
    "B.S. Human Biology - UC Santa Cruz",
    "ACE Certified Personal Trainer",
    "Division III Athletic Training Internship",
    "CPR/AED Certified",
  ];

  const experience = [
    "12,000+ training sessions delivered",
    "Former Youth Gymnastics and Soccer Coach",
    "Former Emergency Medical Technician",
  ];

  return (
    <section id="about" className="section-padding bg-[#EEEADA] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Meet Your Coach
          </h2>
          <div className="w-16 h-1 bg-[#FFD140] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Image and credentials card */}
          <div className="relative pb-8 pr-8">
            {/* Placeholder for Jeffrey's photo */}
            <div className="bg-gradient-to-br from-[#CB4538] to-[#8B2E25] rounded-2xl overflow-hidden aspect-[4/5] flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Image
                  src="/images/character.png"
                  alt="Jeffrey Sun"
                  width={200}
                  height={200}
                  className="mx-auto mb-4"
                />
                <p className="text-sm opacity-75">
                  Replace with Jeffrey&apos;s professional photo
                </p>
              </div>
            </div>

            {/* Floating credentials card */}
            <div className="absolute bottom-0 right-0 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
              <p className="text-2xl font-bold text-black">12,000+</p>
              <p className="text-gray-600 text-sm">Sessions Delivered</p>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#FFD140]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Bio and details */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Jeffrey Sun
            </h3>
            <p className="text-[#CB4538] font-semibold mb-6">
              ACE Certified Personal Trainer | B.S. Human Biology
            </p>

            <p className="text-gray-700 mb-6 text-lg">
              As a certified personal trainer with a degree in Human Biology, I
              specialize in helping busy professionals in their 20s and 30s
              build bodies that last. My approach is rooted in physiology and
              focused on <strong>health longevity</strong> - not crash diets or
              unsustainable programs.
            </p>

            <p className="text-gray-700 mb-8">
              With my background as an EMT and athletic trainer, I understand
              the body at a deeper level. I&apos;ve seen what happens when
              people neglect their health, and I&apos;m here to make sure that
              doesn&apos;t happen to you. Based in the South Bay Area, I train
              clients from San Jose, Sunnyvale, Cupertino, Santa Clara, and
              Mountain View - both in-person and online.
            </p>

            {/* Specialties */}
            <div className="mb-8">
              <h4 className="font-bold text-black mb-3">Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-[#FFD140] text-black px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h4 className="font-bold text-black mb-3">Education:</h4>
              <ul className="space-y-2">
                {education.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-[#CB4538] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h4 className="font-bold text-black mb-3">Experience:</h4>
              <ul className="space-y-2">
                {experience.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg
                      className="w-5 h-5 text-[#CB4538] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Meet the team link */}
            <Link
              href="/team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#CB4538] font-semibold hover:underline"
            >
              Meet the full team
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
