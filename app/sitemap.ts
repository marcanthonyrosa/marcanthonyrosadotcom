import type { MetadataRoute } from "next";

const BASE_URL = "https://marcrosa.com";
const SITE_LAST_MODIFIED = "2026-08-19";

const WRITING_ROUTES = [
  { slug: "after-9-months-of-development", lastModified: "2026-03-06" },
  { slug: "fixed-a-bug-at-the-car-wash", lastModified: "2026-03-02" },
  { slug: "stop-shipping-fast", lastModified: "2026-02-12" },
  { slug: "your-market-will-show-you", lastModified: "2026-02-10" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const writingRoutes: MetadataRoute.Sitemap = WRITING_ROUTES.map(({ slug, lastModified }) => ({
    url: `${BASE_URL}/writing/${slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...writingRoutes];
}
