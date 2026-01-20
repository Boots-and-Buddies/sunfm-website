"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ComingSoonPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Set a cookie to remember admin access
        document.cookie = "admin_access=true; path=/; max-age=86400"; // 24 hours
        router.push("/home");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      // In the future, this could send to a backend/email service
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-[#EEEADA] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <Image
          src="/images/full-logo-transparent.png"
          alt="SunFM - Sun Functional Movement"
          width={400}
          height={150}
          className="mx-auto mb-4 h-auto w-auto max-w-[200px] md:max-w-[280px]"
          priority
        />

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFD140] text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Coming May 2026
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3">
          New Private Gym
          <br />
          <span className="text-[#CB4538]">Opening in San Jose</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-700 mb-5 max-w-xl mx-auto">
          A personal training studio focused on functional movement, mobility,
          and health longevity. Serving the South Bay Area.
        </p>

        {/* Email Signup */}
        <div className="mb-5 max-w-md mx-auto">
          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit}>
              <p className="text-gray-600 text-sm mb-2">
                Be the first to know when we open
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FFD140] text-black font-bold hover:bg-[#e6bc39] transition-colors text-sm"
                >
                  Notify Me
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-medium">
                  Thanks! We&apos;ll notify you when we open.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Location Card */}
        <a
          href="https://maps.app.goo.gl/19dXxEMB8WddyoyJ6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-shadow mb-5"
        >
          <div className="w-10 h-10 bg-[#FFD140] rounded-full flex items-center justify-center text-black flex-shrink-0">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-black text-sm">1401 Parkmoor Ave, Suite 100</p>
            <p className="text-gray-600 text-xs">San Jose, CA 95126</p>
          </div>
          <svg
            className="w-4 h-4 text-gray-400 ml-1"
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
        </a>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <a
            href="https://www.instagram.com/jeffsunfitness/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FFD140] hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.yelp.com/biz/jeff-sun-fitness-sunnyvale"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FFD140] hover:text-black transition-colors"
            aria-label="Yelp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.94-.8-1.665-1.76l1.433-4.995c.276-.96 1.665-1.093 2.206-.211l2.82 4.612c.54.88-.14 1.796-1.8.921zM12.594 3.84l1.433 4.995c.276.96-.8 1.94-1.76 1.665l-4.995-1.433c-.96-.276-1.093-1.665-.211-2.206l4.612-2.82c.88-.54 1.796.14.921 1.8zM3.84 11.406l4.995-1.433c.96-.276 1.94.8 1.665 1.76l-1.433 4.995c-.276.96-1.665 1.093-2.206.211l-2.82-4.612c-.54-.88.14-1.796 1.8-.921zM11.406 20.16l-1.433-4.995c-.276-.96.8-1.94 1.76-1.665l4.995 1.433c.96.276 1.093 1.665.211 2.206l-4.612 2.82c-.88.54-1.796-.14-.921-1.8z" />
            </svg>
          </a>
          <a
            href="https://maps.app.goo.gl/19dXxEMB8WddyoyJ6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FFD140] hover:text-black transition-colors"
            aria-label="Google Maps"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </a>
        </div>

        {/* Admin Login Toggle */}
        {!showLogin ? (
          <button
            onClick={() => setShowLogin(true)}
            className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
          >
            Admin Access
          </button>
        ) : (
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD140] focus:border-transparent text-sm"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLogin(false);
                    setPassword("");
                    setError("");
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
                >
                  {isLoading ? "..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Sun Functional Movement
        </p>
      </footer>
    </main>
  );
}
