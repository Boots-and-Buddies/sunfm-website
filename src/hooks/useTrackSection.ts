"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function useTrackSection(sectionName: string) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          trackEvent("section_view", { section_name: sectionName });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}
