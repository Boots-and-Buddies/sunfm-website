"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  goal: string;
  goalDetails: string;
  experience: string;
  currentRoutine: string;
  motivation: string;
  injuries: string;
  referral: string;
  referralDetails: string;
  contactMethod: string;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    goal: "",
    goalDetails: "",
    experience: "",
    currentRoutine: "",
    motivation: "",
    injuries: "",
    referral: "",
    referralDetails: "",
    contactMethod: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          goal: "",
          goalDetails: "",
          experience: "",
          currentRoutine: "",
          motivation: "",
          injuries: "",
          referral: "",
          referralDetails: "",
          contactMethod: "email",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goalOptions = [
    "Eliminate pain and improve mobility",
    "Build muscle and get stronger",
    "Get comfortable in a gym setting",
    "Transition from physical therapy to training",
    "Recover from injury",
    "General health and longevity",
    "Other",
  ];

  const experienceOptions = [
    "Complete beginner - never worked out",
    "Some experience - worked out on my own",
    "Intermediate - regular gym goer",
    "Advanced - played sports or trained consistently",
  ];

  const referralOptions = [
    "Google Search",
    "Yelp",
    "Instagram",
    "Friend/Family Referral",
    "Other",
  ];

  return (
    <section id="apply" className="section-padding bg-[#3D3D3D]">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Book Your <span className="text-[#FFD140]">Free</span> Consultation
          </h2>
          <div className="w-16 h-1 bg-[#FFD140] mx-auto mt-4"></div>
          <p className="text-gray-400 mt-6 text-lg">
            Fill out the form below and I&apos;ll reach out to schedule your free
            1-hour consultation. No commitment required.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#FFD140]/20 text-[#FFD140] px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Plus: Get a free 1-week mobility plan!
          </div>
        </div>

        {/* Success message */}
        {submitStatus === "success" && (
          <div className="bg-green-500/20 border border-green-500 rounded-xl p-6 mb-8 text-center">
            <svg
              className="w-12 h-12 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">
              Application Received!
            </h3>
            <p className="text-gray-300">
              Thanks for reaching out! Check your email for your free 1-week mobility plan.
              I&apos;ll be in touch within 24 hours to schedule your free consultation.
            </p>
          </div>
        )}

        {/* Error message */}
        {submitStatus === "error" && (
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 mb-8 text-center">
            <p className="text-red-400">
              Something went wrong. Please try again or contact me directly at{" "}
              <a href="mailto:jeff@sunfm.com" className="underline">
                jeff@sunfm.com
              </a>
            </p>
          </div>
        )}

        {/* Form */}
        {submitStatus !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-white font-medium mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                placeholder="John Smith"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white font-medium mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-white font-medium mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                placeholder="30"
                min="16"
                max="100"
              />
            </div>

            {/* Primary Goal */}
            <div>
              <label
                htmlFor="goal"
                className="block text-white font-medium mb-2"
              >
                What&apos;s your primary goal? *
              </label>
              <select
                id="goal"
                name="goal"
                required
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
              >
                <option value="" className="bg-[#3D3D3D]">
                  Select your primary goal
                </option>
                {goalOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#3D3D3D]">
                    {option}
                  </option>
                ))}
              </select>
              {formData.goal === "Other" && (
                <input
                  type="text"
                  id="goalDetails"
                  name="goalDetails"
                  value={formData.goalDetails}
                  onChange={handleChange}
                  className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                  placeholder="Please describe your primary goal"
                />
              )}
            </div>

            {/* Experience level */}
            <div>
              <label
                htmlFor="experience"
                className="block text-white font-medium mb-2"
              >
                How experienced are you with exercise? *
              </label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
              >
                <option value="" className="bg-[#3D3D3D]">
                  Select your experience level
                </option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#3D3D3D]">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Routine */}
            <div>
              <label
                htmlFor="currentRoutine"
                className="block text-white font-medium mb-2"
              >
                Do you have a current exercise routine?
              </label>
              <textarea
                id="currentRoutine"
                name="currentRoutine"
                value={formData.currentRoutine}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent resize-none"
                placeholder="e.g., Go to the gym 2x/week, run occasionally, no current routine, etc."
              />
            </div>

            {/* Motivation */}
            <div>
              <label
                htmlFor="motivation"
                className="block text-white font-medium mb-2"
              >
                What made you want to start personal training?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent resize-none"
                placeholder="e.g., Want to get stronger, tired of back pain, preparing for a goal, etc."
              />
            </div>

            {/* Injuries/Pain */}
            <div>
              <label
                htmlFor="injuries"
                className="block text-white font-medium mb-2"
              >
                Any current injuries or areas of pain?
              </label>
              <textarea
                id="injuries"
                name="injuries"
                value={formData.injuries}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent resize-none"
                placeholder="e.g., Lower back pain, old shoulder injury, etc."
              />
            </div>

            {/* How did you hear about us */}
            <div>
              <label
                htmlFor="referral"
                className="block text-white font-medium mb-2"
              >
                How did you hear about SunFM? *
              </label>
              <select
                id="referral"
                name="referral"
                required
                value={formData.referral}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
              >
                <option value="" className="bg-[#3D3D3D]">
                  Select an option
                </option>
                {referralOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#3D3D3D]">
                    {option}
                  </option>
                ))}
              </select>
              {(formData.referral === "Friend/Family Referral" || formData.referral === "Other") && (
                <input
                  type="text"
                  id="referralDetails"
                  name="referralDetails"
                  value={formData.referralDetails}
                  onChange={handleChange}
                  className="w-full mt-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent"
                  placeholder={formData.referral === "Friend/Family Referral" ? "Who referred you?" : "Please specify"}
                />
              )}
            </div>

            {/* Preferred contact method */}
            <div>
              <label className="block text-white font-medium mb-2">
                Preferred contact method *
              </label>
              <div className="flex gap-4">
                {["email", "phone", "text"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#FFD140] bg-white/10 border-white/20 focus:ring-[#FFD140]"
                    />
                    <span className="text-white capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg
                    className="w-5 h-5"
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
                </>
              )}
            </button>

            <p className="text-gray-500 text-sm text-center">
              By submitting, you agree to be contacted about training services.
              Your information will never be shared.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
