import type { Metadata } from 'next'

import { fetchProjects } from '@/lib/sanity/fetchProjects'
import AllProjectsSection from '@/components/projects/AllProjectsSection'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Projects',
  description:
    'Browse the full collection of projects — personal experiments and professional client work.',
}

export default async function AllProjectsPage() {
  const projects = await fetchProjects()

  return <AllProjectsSection projects={projects} />
}
