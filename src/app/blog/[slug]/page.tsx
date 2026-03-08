import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32">
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-accent">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-fg-muted">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} {"  "}
          {post.readTime}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-pretty text-lg text-fg-muted">{post.excerpt}</p>

        <div className="mt-10 space-y-6 text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
