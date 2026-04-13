import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/johnny"],
      },
    ],
    sitemap: "https://marcrosa.com/sitemap.xml",
    host: "https://marcrosa.com",
  };
}
