"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const applySection = document.querySelector("#apply");
      if (applySection) {
        const rect = applySection.getBoundingClientRect();
        const inApplySection = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(window.scrollY > 600 && !inApplySection);
      } else {
        setIsVisible(window.scrollY > 600);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        setInputFocused(true);
      }
    };
    const handleFocusOut = () => setInputFocused(false);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible || inputFocused) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFD140] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transform transition-transform duration-300 md:hidden">
      <div className="px-4 py-3">
        <a
          href="#apply"
          onClick={(e) => {
            scrollToApply(e);
            trackEvent("cta_click", { button_text: "Book Free Consultation", section: "sticky_cta" });
          }}
          className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold py-3 px-6 rounded-full"
        >
          Book Free Consultation
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
  );
}
