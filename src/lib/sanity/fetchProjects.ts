import { sanityClient } from './client';
import { fallbackProjects } from './fallbackProjects';
import { Project } from './types';

const projectFields = `{
  _id,
  title,
  description,
  cardImage {
    asset-> {
      url
    },
    hotspot,
    crop,
    _type
  },
  foundationImage {
    asset-> {
      url
    },
    hotspot,
    crop,
    _type
  },
  uxImages[] {
    image {
      asset-> {
        url
      },
      hotspot,
      crop,
      _type
    },
    title,
    description,
    aspect
  },
  tags,
  type,
  url,
  role,
  client,
  year,
  overview,
  process,
  challenge,
  solution,
  outcome,
  toolsUsed,
  uiSummary
}`;

export async function fetchProjects(): Promise<Project[]> {
  if (!sanityClient) {
    return fallbackProjects;
  }

  const query = `*[_type == "project"] | order(_createdAt desc)${projectFields}`;

  try {
    const projects = await sanityClient.fetch<Project[]>(query);

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const fallbackProject = fallbackProjects.find((project) => project._id === id) ?? null;

  if (!sanityClient) {
    return fallbackProject;
  }

  const query = `*[_type == "project" && _id == $id][0]${projectFields}`;

  try {
    const project = await sanityClient.fetch<Project | null>(query, { id });
    return project ?? fallbackProject;
  } catch {
    return fallbackProject;
  }
}
