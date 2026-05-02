"use client";

import { Project } from '@/lib/sanity/types';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 w-full max-w-full">
      {projects.map((project, index) => (
        <div
          key={project._id}
          className="w-full max-w-full max-w-[42rem] min-[1180px]:w-[calc(33.333%-0.75rem)]"
        >
          <ProjectCard
            project={project}
            revealDirection="side"
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
