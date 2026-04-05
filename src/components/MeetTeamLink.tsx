"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function MeetTeamLink() {
  return (
    <Link
      href="/team"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[#CB4538] font-semibold hover:underline"
      onClick={() => trackEvent("meet_team_click")}
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
  );
}
