import type { MetadataRoute } from "next";

const BASE_URL = "https://marcrosa.com";

const WRITING_SLUGS = [
  "after-9-months-of-development",
  "fixed-a-bug-at-the-car-wash",
  "stop-shipping-fast",
  "your-market-will-show-you",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const writingRoutes: MetadataRoute.Sitemap = WRITING_SLUGS.map((slug) => ({
    url: `${BASE_URL}/writing/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...writingRoutes];
}
