export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mcdonalds-big-arch-a-delicious-product",
    title: "McDonald's Big Arch: A Delicious Product?",
    excerpt:
      "I try the latest release from the golden arches to put their CEO's controversial claims to the test.",
    publishedAt: "2026-03-08",
    readTime: "5 min read",
    tags: ["Burger", "Review", "McDonald's"],
    content: [
      "Most modern products solve function first, then layer on polish later. That order creates interfaces that work but rarely feel memorable.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
