import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export const metadata = {
  title: "Blog | Andrew Kim",
  description: "Mock writing archive for the portfolio starter template.",
};

export default function BlogPage() {
  return (
    <section className="px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-fg-muted">Writing</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">The Burger Blog 🍔</h1>
        <p className="mt-4 max-w-2xl text-fg-muted">
          The space where my thoughts take form, including but not limited to burger reviews.
        </p>

        <div className="mt-12 space-y-5">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:border-accent/60">
              <p className="text-xs uppercase tracking-[0.2em] text-fg-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} <span className="mx-2 text-fg-muted/70">•</span> {"  "}
                {post.readTime}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-3 text-fg-muted">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-fg-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent"
              >
                Read post <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
