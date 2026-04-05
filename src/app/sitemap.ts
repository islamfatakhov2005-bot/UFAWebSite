import type { MetadataRoute } from "next";

const siteUrl = "https://ufa.gmlb.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/membership",
    "/contact",
    "/franchise-opportunities",
    "/franchising-overview",
    "/education",
    "/events",
    "/advocacy",
    "/programs",
    "/news",
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/membership" ? 0.9 : 0.7,
  }));
}
