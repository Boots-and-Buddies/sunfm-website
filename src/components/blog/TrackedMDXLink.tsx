"use client";

import { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";
import { useBlogContext } from "@/components/BlogContext";

export default function TrackedMDXLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const blog = useBlogContext();
  const { href = "", onClick, children, ...rest } = props;
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const eventName = isInternal ? "internal_link_click" : "external_link_click";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const params: Record<string, string | number> = {
      href,
      location: "blog_article_body",
    };
    if (blog) {
      params.blog_slug = blog.slug;
      params.blog_category = blog.category;
    }
    trackEvent(eventName, params);
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
