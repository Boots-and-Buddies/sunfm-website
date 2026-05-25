import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { getAllServiceAreas } from "@/lib/service-areas";

// Hard-coded dates for pages whose content doesn't change frequently.
// Bump these when the page actually changes — Google uses lastmod as a
// crawl-priority signal, so "modified today" on every fetch gets a page
// deprioritized as low-signal churn.
const HOMEPAGE_LAST_MODIFIED = new Date("2026-04-13");
const TEAM_LAST_MODIFIED = new Date("2026-04-13");
const MOVEMENT_SCREEN_LAST_MODIFIED = new Date("2026-04-30");
const SERVICE_AREAS_LAST_MODIFIED = new Date("2026-04-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sunfm.fitness";

  const posts = getAllPosts();
  const categories = getAllCategories();
  const serviceAreas = getAllServiceAreas();

  // For /blog and /<category>, the page's "freshness" is the freshness of
  // its newest post. getAllPosts() is sorted desc by date so [0] is newest.
  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : HOMEPAGE_LAST_MODIFIED;
  const latestPostByCategory: Record<string, Date> = {};
  for (const post of posts) {
    const d = new Date(post.date);
    if (!latestPostByCategory[post.category] || d > latestPostByCategory[post.category]) {
      latestPostByCategory[post.category] = d;
    }
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: HOMEPAGE_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: TEAM_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/movement-screen`, lastModified: MOVEMENT_SCREEN_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat}`,
    lastModified: latestPostByCategory[cat] ?? HOMEPAGE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}${area.urlPath}`,
    lastModified: SERVICE_AREAS_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...serviceAreaPages, ...categoryPages, ...postPages];
}
