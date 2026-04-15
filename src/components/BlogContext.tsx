"use client";

import { createContext, useContext, ReactNode } from "react";

interface BlogContextValue {
  slug: string;
  category: string;
}

const BlogContext = createContext<BlogContextValue | null>(null);

export function BlogProvider({
  slug,
  category,
  children,
}: {
  slug: string;
  category: string;
  children: ReactNode;
}) {
  return (
    <BlogContext.Provider value={{ slug, category }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
