"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/imageUrl';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardImage = project.cardImage;
  const cardImageUrl = cardImage ? urlFor(cardImage, 900) : undefined;
  const hotspotX = cardImage?.hotspot?.x ?? 0.5;
  const hotspotY = cardImage?.hotspot?.y ?? 0.5;
  const badgeLabel = project.type === 'Professional' ? 'Professional' : 'Personal';
  const hasGithubUrl = Boolean(project.githubUrl);

  return (
    <motion.article
      className="group relative aspect-square h-full w-full overflow-hidden border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/75"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: REVEAL_EASE, delay: index * 0.1 }}
    >
      <Link
        href={`/project/${project._id}`}
        aria-label={`Open ${project.title} project details`}
        className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-6px]"
      />

      {cardImageUrl ? (
        <Image
          src={cardImageUrl}
          alt={project.title}
          fill
          style={{ objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%` }}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-xs text-white/30">No image</span>
        </div>
      )}

      <span className="absolute left-3 top-3 z-10 rounded-sm bg-white/80 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand/65 backdrop-blur-md transition-colors duration-300 ease-out group-hover:bg-white sm:left-4 sm:top-4 sm:text-[10px]">
        {badgeLabel}
      </span>

      {/* Always-visible bottom info */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/88 via-black/40 to-transparent transition-opacity duration-300 ease-out group-hover:opacity-0" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 transition-opacity duration-300 ease-out group-hover:opacity-0 sm:p-5">
        <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-white sm:text-lg lg:text-xl">
          {project.title}
        </h3>
        <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-[11px]">
          View project
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
      </div>

      {/* Full-card hover overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between bg-white/88 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-5">
        <div>
          <p className="text-xs leading-relaxed text-brand/72 sm:text-sm">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-brand/12 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-brand/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-brand sm:text-lg lg:text-xl">
            {project.title}
          </h3>
          <div className="flex shrink-0 items-center gap-3">
            {hasGithubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                className="relative z-30 flex items-center text-brand/70 transition-colors duration-200 hover:text-brand"
              >
                <Icon icon="simple-icons:github" width={16} height={16} />
              </a>
            ) : null}
            <span className="flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-brand/85 sm:text-[11px]">
              View project
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectPlaceholderCard({ index = 0 }: { index?: number }) {
  return (
    <motion.article
      className="relative flex aspect-square h-full w-full flex-col items-center justify-center gap-2 overflow-hidden border border-dashed border-white/15 bg-white/[0.03]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: REVEAL_EASE, delay: index * 0.1 }}
    >
      <Clock className="h-8 w-8 text-white/30" strokeWidth={1.8} />
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        Project coming soon
      </p>
    </motion.article>
  );
}
