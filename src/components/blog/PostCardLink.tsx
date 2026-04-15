"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { useBlogContext } from "@/components/BlogContext";

interface Props {
  href: string;
  source: string;
  slug: string;
  category: string;
  className?: string;
  children: ReactNode;
}

export default function PostCardLink({
  href,
  source,
  slug,
  category,
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
          target_slug: slug,
          target_category: category,
          source,
        };
        if (blog) {
          params.blog_slug = blog.slug;
          params.blog_category = blog.category;
        }
        trackEvent("blog_card_click", params);
      }}
    >
      {children}
    </Link>
  );
}
