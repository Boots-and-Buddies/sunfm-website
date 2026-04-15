import { Post } from "@/lib/blog";
import PostCard from "./PostCard";

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-2">Related Articles</h2>
      <div className="w-12 h-1 bg-[#FFD140] mb-8" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} source="related_posts" />
        ))}
      </div>
    </section>
  );
}
