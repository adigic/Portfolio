import type { MetadataRoute } from "next";
import { fetchProjects } from "@/lib/sanity/fetchProjects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adigic.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await fetchProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/project/${project._id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/integritypolicy`,
      lastModified: new Date(),
    },
    ...projectEntries,
  ];
}
