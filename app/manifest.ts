import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Peakware Consulting",
    short_name: "Peakware",
    description:
      "UK technology consultancy for cloud, data, AI, software and security — built to work and built to last.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d14",
    theme_color: "#0a0d14",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
