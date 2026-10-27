import type { MetadataRoute } from "next";
import { committees } from "@/content/committees";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");
  const pages = [
    "",
    "/about",
    "/committees",
    "/senators",
    "/events",
    "/get-involved",
    "/funding",
    "/resources",
    "/faq",
    "/contact",
    "/constitution",
  ];
  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: (p === "/events" || p === "" ? "weekly" : "monthly") as
        "weekly" | "monthly",
      priority: p === "" ? 1 : 0.7,
    })),
    ...committees.map((c) => ({
      url: `${base}/committees/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
