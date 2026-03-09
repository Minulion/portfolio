export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string[];
  reviewSummary?: {
    score: string;
    verdict: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mcdonalds-big-arch-a-delicious-product",
    title: "McDonald's Big Arch: A Delicious Product?",
    excerpt:
      "I try the latest release from the golden arches to put their CEO's controversial claims to the test.",
    publishedAt: "2026-03-08",
    readTime: "3 min read",
    tags: ["Burger", "Review", "McDonald's"],
    reviewSummary: {
      score: "7.5/10",
      verdict: "Very Solid",
    },
    content: [
      "I'm extremely excited to write this post, as it's not only the first addition to my new website, but also the first step in a project I've been wanting to work on for a very long time. "+
      "Anyone who knows me in person can testify that when it comes to burgers, not many people have the same fervor that I do. It's my number one food in the world, and I've received my fair " +
      "share of flack for foregoing other cuisines in favor of measly American food. When it comes to McD's in particular, I've gone on record numerous times that I firmly believe the franchise "+
      "to reside in the 10% of restaurants worldwide. Of course, when it comes to raw quality this may be a questionable claim to make. But I have full confidence that if we're talking flavor, " +
      "it's not easy to compete with a crispy McNugget or a juicy Big Mac.",
      "To say the least, I was excited to see that one of my favorite chains were releasing a brand new 'product' this Spring, the acclaimed Big Arch. Marketed as Ronald McDonald's most premium "+
      "option, the burger comes with two quarter pound patties, slices of white cheddar cheese, crispy onion bits, and a special sesame+poppyseed bun. It's then topped off with the brand new Arch "+
      "sauce, a more tangy alternative to the classic Big Mac sauce. One might ask, does a premium pricetag also follow these premium ingredients? The answer is a bit mixed. At around 12 dollars for "+
      "a combo meal, the Arch is still less expensive than most other options for dining out. Compared directly with other fast food options though (even McDonald's itself!), some consider this new mark "+
      "to be outrageous. Of course, hearing all this discourse, I had to give it a shot.",
      "Before we get into the review, I do want to address the famous clip of the CEO, Chris Kempczinski, trying the new burger. He went viral for his apparent discomfort when taking a bite, and his "+
      "unusual reaction where he referred to the burger as a 'product' instead of food. These points make me laugh because of how people have taken them out of context. Online forums seem to believe "+
      "that the burger was so unappetizing that he couldn't bring himself to call it a food. I did some searching online and found that on his official Instagram page, he actually reacts to EVERY new "+
      "addition to the menu, not just the Big Arch (as it was framed in discussions). In each of these reviews, the one thing that remains constant is his verbage. People forget that he's the CEO of "+
      "a massive corporation! It's not surprising that he thinks of everything his company produces as a product. Robotic and slightly inhuman, sure, but it by no means provides any indication of how "+
      "how the food tastes. I think people have jumped to conclusions based on their own prejudices, and have been unfortunately blinded to what's really going on.",
      "Now, what you've all been waiting for. I had the pleasure to taste the Big Arch for myself just yesterday, and I got about what I expected: a dang solid burger. Immediately out the box it was "+
      "significantly heavier than a Big Mac, each bite gave me a great ratio of meat to bun (compared to the Mac which is quite bun heavy). The quarter pounder patties were hefty and juicy, and were "+
      "nicely complemented by a sharper tang from the white cheddar and sauce. I will say though that the seeds on the bun (one of the selling points) were nigh undetectable, and simply served as visual "+
      "garnish. The crispy onion bits were also quite sparse, but tasted nice every so often. ",
      "Overall, I was honestly impressed. For me, burgers have never been McDonald's core strength. The fries, nuggets, "+
      "and frozen treats are truly elite, and the burger was just a nice add-on (~6.5/10). The Arch was genuinely a big step up, with bolder flavors and a much more satisfying bite. A 12 dollar price point "+
      "may surprise those used to McD's classic items, but a Burger King Whopper combo costs 15 bucks nowadays. For what you get, I'd pick the Arch 100 times over. Absolutely recommend.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
