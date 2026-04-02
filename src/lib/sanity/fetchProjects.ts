import { sanityClient } from './client';
import { fallbackProjects } from './fallbackProjects';
import { Project } from './types';

export async function fetchProjects(): Promise<Project[]> {
  if (!sanityClient) {
    return fallbackProjects;
  }

  const query = `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    description,
    "imageUrl": coalesce(mainImage.asset->url, image.asset->url),
    "tags": coalesce(tags, []),
    type,
    url
  }`;

  try {
    const projects = await sanityClient.fetch<Project[]>(query);

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}
