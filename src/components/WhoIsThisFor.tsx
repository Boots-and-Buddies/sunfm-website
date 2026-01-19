export default function WhoIsThisFor() {
  const idealClients = [
    {
      title: "Working professionals in their 20s and 30s",
      description: "Who want to invest in their long-term health and have the discipline to show up consistently.",
    },
    {
      title: "People recovering from injury",
      description: "Looking to transition from physical therapy back to full training safely and effectively.",
    },
    {
      title: "Those experiencing chronic pain",
      description: "Neck pain, back pain, shoulder issues - who want to address the root cause, not just mask symptoms.",
    },
    {
      title: "Athletes and active individuals",
      description: "Who want to improve performance, prevent injuries, and move more efficiently.",
    },
    {
      title: "Health-conscious individuals",
      description: "Who understand that investing in their body now pays dividends for decades to come.",
    },
  ];

  const notForList = [
    "Quick-fix seekers focused only on a number on the scale",
    "Those looking for crash diets or unsustainable programs",
    "People who can't commit to consistent training",
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* This IS for you */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFD140] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                This Is For You If...
              </h2>
            </div>

            <div className="space-y-4">
              {idealClients.map((client, index) => (
                <div
                  key={index}
                  className="bg-[#EEEADA] rounded-xl p-5 shadow-sm"
                >
                  <h3 className="font-bold text-black mb-2">{client.title}</h3>
                  <p className="text-gray-600">{client.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* This is NOT for you */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#CB4538] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                This Is NOT For You If...
              </h2>
            </div>

            <div className="bg-[#EEEADA] rounded-xl p-6 shadow-sm mb-8">
              <ul className="space-y-4">
                {notForList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#CB4538] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Philosophy box */}
            <div className="bg-[#5C6B54] rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">My Philosophy</h3>
              <p className="text-white/90 mb-4">
                I believe in training for <span className="text-[#FFD140] font-semibold">health longevity</span>.
                That means building a body that serves you well not just today, but for the next 30, 40, 50+ years.
              </p>
              <p className="text-white/90">
                If you&apos;re looking for someone to help you lose 20 pounds in a month, I&apos;m not your guy.
                But if you want to build sustainable strength, eliminate pain, and feel capable in your body
                for decades to come - let&apos;s talk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
