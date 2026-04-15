"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  section: string;
  linkText: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedNavLink({
  href,
  section,
  linkText,
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackEvent("nav_click", {
          section,
          link_text: linkText,
        })
      }
    >
      {children}
    </Link>
  );
}
