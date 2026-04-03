"use client";

import { Project } from '@/lib/sanity/types';
import ProjectCard from './ProjectCard';
import { useEffect, useState } from 'react';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [isDesktopCards, setIsDesktopCards] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 1180px)');

    const updateLayout = (event?: MediaQueryListEvent) => {
      setIsDesktopCards(event ? event.matches : mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 min-[1180px]:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          revealDirection={isDesktopCards ? 'down' : 'side'}
          index={index}
        />
      ))}
    </div>
  );
}
