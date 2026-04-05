"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  platform,
  section,
  children,
  ...props
}: {
  href: string;
  platform: string;
  section: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("external_link_click", { platform, section })}
      {...props}
    >
      {children}
    </a>
  );
}
