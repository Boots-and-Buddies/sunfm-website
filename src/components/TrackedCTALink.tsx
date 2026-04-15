"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  section: string;
  buttonText: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedCTALink({
  href,
  section,
  buttonText,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackEvent("cta_click", { button_text: buttonText, section })
      }
    >
      {children}
    </Link>
  );
}
