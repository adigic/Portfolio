"use client";

import { motion } from 'framer-motion';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Project } from '@/lib/sanity/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasExternalUrl = Boolean(project.url && project.url !== '#');

  return (
    <motion.article
      className="group relative grid h-full w-full overflow-hidden border border-black/6 bg-white/95 text-brand shadow-[0_20px_50px_rgba(0,0,0,0.14)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white grid-cols-[148px_minmax(0,1fr)] min-[480px]:grid-cols-[180px_minmax(0,1fr)] sm:grid-cols-[240px_minmax(0,1fr)] min-[1180px]:flex min-[1180px]:min-h-[35rem] min-[1180px]:grid-cols-none min-[1180px]:flex-col"
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        },
      }}
    >
      <Link
        href={`/project/${project._id}`}
        aria-label={`Open ${project.title} project details`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-6px]"
      />

      <div className="relative h-full min-h-[12.5rem] overflow-hidden min-[1180px]:h-[23rem] min-[1180px]:min-h-0">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 479px) 148px, (max-width: 639px) 180px, (max-width: 1179px) 240px, 33vw"
        />
      </div>

      <div className="grid flex-1 gap-3 p-4 min-[480px]:p-4 sm:gap-4 sm:p-5 min-[1180px]:gap-1 min-[1180px]:p-4">
        <div className="min-[1180px]:flex min-[1180px]:h-full min-[1180px]:flex-col">
          <h3 className="mb-1.5 text-lg font-bold leading-tight min-[1180px]:text-base xl:text-lg">
            {project.title}
          </h3>
          <p className="mb-3 text-[12px] leading-relaxed text-brand/72 min-[1180px]:flex-1 min-[1180px]:text-[11px] xl:text-[12px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 min-[1180px]:mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand/6 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-brand/70 lg:px-2.5 lg:text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {hasExternalUrl ? (
          <div className="relative z-20 flex items-center justify-end gap-2.5 self-start pt-0.5 text-brand/78 min-[1180px]:mt-auto min-[1180px]:justify-end min-[1180px]:self-auto">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live preview`}
              className="inline-flex items-center gap-1.5 border border-brand/10 bg-brand/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-[background-color,opacity] duration-150 ease-out hover:bg-brand/8 hover:opacity-100"
            >
              <span>Live</span>
              <SquareArrowOutUpRight className="h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
