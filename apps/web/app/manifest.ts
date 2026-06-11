import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Visionary FIFA — World Cup 2026",
    short_name: "Visionary FIFA",
    description: "Live scores, standings, fixtures and player stats for FIFA World Cup 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#05060f",
    theme_color: "#05060f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["sports", "news"],
    lang: "en",
    orientation: "portrait",
  };
}
