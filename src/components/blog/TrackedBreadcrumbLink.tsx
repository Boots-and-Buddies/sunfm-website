"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { useBlogContext } from "@/components/BlogContext";

interface Props {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedBreadcrumbLink({
  href,
  label,
  className,
  children,
}: Props) {
  const blog = useBlogContext();
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        const params: Record<string, string | number> = {
          label,
          target: href,
        };
        if (blog) {
          params.blog_slug = blog.slug;
          params.blog_category = blog.category;
        }
        trackEvent("breadcrumb_click", params);
      }}
    >
      {children}
    </Link>
  );
}
