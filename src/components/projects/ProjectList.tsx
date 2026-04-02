"use client";

import { Project } from '@/lib/sanity/types';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3 min-[1180px]:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.14,
          },
        },
      }}
    >
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </motion.div>
  );
}
