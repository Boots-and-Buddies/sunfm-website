"use client";

import { useEffect } from "react";

export function useScrollSkew() {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const headings = document.querySelectorAll<HTMLElement>(".scroll-skew");
    if (headings.length === 0) return;

    let lastScroll = window.scrollY;
    let rafId: number;
    let velocity = 0;

    const update = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // Smooth velocity with damping
      velocity += (delta - velocity) * 0.15;

      // Clamp
      const skew = Math.max(-2.5, Math.min(2.5, velocity * 0.08));
      const scaleY = 1 + Math.min(0.015, Math.abs(velocity) * 0.0004);

      headings.forEach((h) => {
        h.style.transform = `skewX(${skew}deg) scaleY(${scaleY})`;
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);
}
