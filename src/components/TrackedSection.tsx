"use client";

import { useTrackSection } from "@/hooks/useTrackSection";

export default function TrackedSection({
  sectionName,
  children,
}: {
  sectionName: string;
  children: React.ReactNode;
}) {
  const ref = useTrackSection(sectionName);
  return <div ref={ref}>{children}</div>;
}
