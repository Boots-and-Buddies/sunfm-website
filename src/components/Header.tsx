"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkSections = () => {
      const darkSections = document.querySelectorAll("#testimonials, #apply");
      const headerBottom = 80; // header height
      let overDark = false;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < headerBottom && rect.bottom > 0) {
          overDark = true;
        }
      });

      setIsDark(overDark);
    };

    window.addEventListener("scroll", checkDarkSections, { passive: true });
    return () => window.removeEventListener("scroll", checkDarkSections);
  }, []);

  const navLinks = [
    { name: "Testimonials", href: "#testimonials" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-300 ${isDark ? 'bg-[#1a1a1a]/95' : 'bg-[#F5F2ED]/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer"
          >
            <Image
              src={isDark ? "/images/logo-white.png" : "/images/logo.png"}
              alt="SunFM"
              width={240}
              height={90}
              className="h-20 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              "isExternal" in link && link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nav-link text-sm font-medium transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-[#1a1a1a]'}`}
                >
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    scrollToSection(e, link.href);
                    trackEvent("nav_click", { link_text: link.name, target_section: link.href, device: "desktop" });
                  }}
                  className={`nav-link text-sm font-medium transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-[#1a1a1a]'}`}
                >
                  {link.name}
                </a>
              )
            ))}
            <a
              href="#apply"
              onClick={(e) => {
                scrollToSection(e, "#apply");
                trackEvent("cta_click", { button_text: "Book Your Free Consultation", section: "header" });
              }}
              className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${isDark ? 'bg-white text-[#1a1a1a] hover:bg-[#FFD140]' : 'btn-primary'}`}
            >
              Book Your Free Consultation
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-3"
            onClick={() => {
              const newState = !mobileMenuOpen;
              setMobileMenuOpen(newState);
              trackEvent("mobile_menu_toggle", { action: newState ? "open" : "close" });
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
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
            ) : (
              <svg
                className={`w-6 h-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 mobile-menu-enter">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                "isExternal" in link && link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium py-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium py-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
                    onClick={(e) => {
                      scrollToSection(e, link.href);
                      setMobileMenuOpen(false);
                      trackEvent("nav_click", { link_text: link.name, target_section: link.href, device: "mobile" });
                    }}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a
                href="#apply"
                className="btn-primary text-center mt-2"
                onClick={(e) => {
                  scrollToSection(e, "#apply");
                  setMobileMenuOpen(false);
                  trackEvent("cta_click", { button_text: "Book Your Free Consultation", section: "header" });
                }}
              >
                Book Your Free Consultation
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
