import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {fetchProjectById, fetchProjects} from '@/lib/sanity/fetchProjects'
import ProjectDetailContent from './ProjectDetailContent'

type ProjectPageProps = {
  params: Promise<{id: string}>
}

function getProjectSummary(project: Awaited<ReturnType<typeof fetchProjectById>>) {
  if (!project) {
    return null
  }

  return {
    overview: project.overview ?? project.description,
    process:
      project.process ??
      'The work moved from concept and structure into interface refinement and frontend implementation, with each iteration focused on clarity, usability and stronger presentation.',
    challenge:
      project.challenge ??
      'The project needed a clear structure, a polished interface and a frontend solution that supported both usability and consistency across the experience.',
    solution:
      project.solution ??
      'I approached it through strong visual hierarchy, responsive implementation and a frontend structure designed to keep the experience intuitive and maintainable.',
    outcome:
      project.outcome ??
      'The outcome is a more refined project presentation that shows how I translate product thinking into practical frontend execution.',
    role: project.role ?? 'Software Engineer / Frontend Development',
    client:
      project.client ??
      (project.type === 'Professional'
        ? 'Project delivered through my company'
        : 'Independent learning project'),
    year: project.year ?? 'Recent work',
    toolsUsed: project.toolsUsed?.length ? project.toolsUsed : project.tags,
    uiSummary:
      project.uiSummary ??
      'The UX/UI direction focused on hierarchy, spacing, clarity and a visual language that supports the product without adding unnecessary noise.',
    // figmaImageUrls och imageUrl används ej längre
  }
}

export async function generateStaticParams() {
  const projects = await fetchProjects()

  return projects.map((project) => ({id: project._id}))
}

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {id} = await params
  const project = await fetchProjectById(id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const {id} = await params
  const project = await fetchProjectById(id)

  if (!project) {
    notFound()
  }

  const summary = getProjectSummary(project)
  const hasExternalUrl = Boolean(project.url && project.url !== '#')
  // uxImages hanteras nu direkt i ProjectDetailContent

  if (!summary) {
    notFound()
  }

  return <ProjectDetailContent project={project} summary={summary} hasExternalUrl={hasExternalUrl} />
}