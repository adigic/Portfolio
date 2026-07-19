"use client";

import { Project } from '@/lib/sanity/types';
import ProjectCard, { ProjectPlaceholderCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

const TOTAL_SLOTS = 3;

export default function ProjectList({ projects }: ProjectListProps) {
  const placeholderCount = Math.max(0, TOTAL_SLOTS - projects.length);

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <ProjectPlaceholderCard key={`placeholder-${i}`} index={projects.length + i} />
      ))}
    </div>
  );
}
