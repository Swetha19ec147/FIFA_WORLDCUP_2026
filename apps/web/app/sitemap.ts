import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { allMatches, teams } from "@/lib/data";
import { players } from "@/lib/players";
import { predictions } from "@/lib/predictions";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/teams", priority: 0.9, freq: "daily" },
    { path: "/players", priority: 0.9, freq: "daily" },
    { path: "/standings", priority: 0.85, freq: "daily" },
    { path: "/schedule", priority: 0.85, freq: "daily" },
    { path: "/live-scores", priority: 0.85, freq: "hourly" },
    { path: "/bracket", priority: 0.9, freq: "daily" },
    { path: "/predictions", priority: 0.8, freq: "daily" },
    { path: "/news", priority: 0.8, freq: "daily" },
  ].map(({ path, priority, freq }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: freq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority,
  }));

  const teamRoutes = teams.map((t) => ({
    url: `${SITE.url}/team/${slugify(t.name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const matchRoutes = allMatches.map((m) => ({
    url: `${SITE.url}/match/${m.slug}`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: m.status === "LIVE" ? 1.0 : 0.7,
  }));

  const playerRoutes = players.map((p) => ({
    url: `${SITE.url}/player/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.trending ? 0.9 : p.star ? 0.75 : 0.6,
  }));

  const predictionRoutes = predictions.map((p) => ({
    url: `${SITE.url}/predictions/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...teamRoutes, ...matchRoutes, ...playerRoutes, ...predictionRoutes];
}
