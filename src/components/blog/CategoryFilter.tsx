"use client";

import Link from "next/link";
import { categoryLabels } from "@/lib/blog-constants";

export default function CategoryFilter({
  categories,
  activeCategory,
}: {
  categories: string[];
  activeCategory?: string;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      <Link
        href="/blog"
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
          !activeCategory
            ? "bg-[#FFD140] text-black"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/${cat}`}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
            activeCategory === cat
              ? "bg-[#FFD140] text-black"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {categoryLabels[cat] || cat}
        </Link>
      ))}
    </div>
  );
}
