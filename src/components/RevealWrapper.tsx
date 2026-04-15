"use client";

import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Client-side wrapper that applies the site's scroll-triggered reveal system
 * to its children. Any descendant with the `reveal` or `reveal-scale` class
 * animates in when the wrapper enters the viewport. Use per-section so each
 * section reveals independently as the user scrolls.
 */
export default function RevealWrapper({
  children,
  className,
  threshold = 0.15,
}: Props) {
  const ref = useReveal<HTMLDivElement>(threshold);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
