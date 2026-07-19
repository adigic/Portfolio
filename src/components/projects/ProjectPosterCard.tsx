"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/imageUrl';

interface ProjectPosterCardProps {
  project: Project;
  index?: number;
}

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectPosterCard({ project, index = 0 }: ProjectPosterCardProps) {
  const cardImage = project.archiveImage ?? project.cardImage;
  const cardImageUrl = cardImage ? urlFor(cardImage, 700) : undefined;
  const hotspotX = cardImage?.hotspot?.x ?? 0.5;
  const hotspotY = cardImage?.hotspot?.y ?? 0.5;
  const badgeLabel = project.type === 'Professional' ? 'Professional' : 'Personal';
  const hasGithubUrl = Boolean(project.githubUrl);

  return (
    <motion.div
      className="group relative aspect-square w-full overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 ease-out hover:border-white/75"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: REVEAL_EASE, delay: (index % 10) * 0.04 }}
    >
      <Link
        href={`/project/${project._id}`}
        aria-label={`Open ${project.title} project details`}
        className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-4px]"
      >
        {cardImageUrl ? (
          <Image
            src={cardImageUrl}
            alt={project.title}
            fill
            style={{ objectPosition: `${hotspotX * 100}% ${hotspotY * 100}%` }}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <span className="text-[10px] text-white/30">No image</span>
          </div>
        )}

        <span className="absolute left-2 top-2 z-10 rounded-sm bg-white/80 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-brand/65 backdrop-blur-md sm:text-[9px]">
          {badgeLabel}
        </span>

        <div className="absolute inset-0 z-10 flex flex-col justify-between bg-white/88 p-2.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-3">
          <div>
            <p className="line-clamp-3 text-[10px] leading-snug text-brand/72 sm:text-[11px]">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-brand/12 px-1.5 py-0.5 text-[7px] font-medium uppercase tracking-[0.1em] text-brand/85 sm:text-[8px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between gap-2">
            <p className="text-[10px] font-bold uppercase leading-tight tracking-tight text-brand sm:text-[11px]">
              {project.title}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              {hasGithubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  className="relative z-30 flex items-center text-brand/70 transition-colors duration-200 hover:text-brand"
                >
                  <Icon icon="simple-icons:github" width={13} height={13} />
                </a>
              ) : null}
              <span className="flex items-center gap-0.5 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.1em] text-brand/85 sm:text-[9px]">
                View
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
