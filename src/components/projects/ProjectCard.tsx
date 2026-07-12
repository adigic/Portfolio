"use client";

import { motion } from 'framer-motion';
import { SquareArrowOutUpRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



import { Project } from '@/lib/sanity/types';
import { urlFor } from '@/lib/sanity/imageUrl';

interface ProjectCardProps {
  project: Project;
  revealDirection?: 'side' | 'down';
  index?: number;
}

export default function ProjectCard({ project, revealDirection = 'side', index = 0 }: ProjectCardProps) {
  const hasExternalUrl = Boolean(project.url && project.url !== '#');
  const isPlaceholder = (project as Project & { isPlaceholder?: boolean }).isPlaceholder;
  const revealEase = [0.22, 1, 0.36, 1] as const;
  const hiddenVariant =
    revealDirection === 'side'
      ? { opacity: 0, x: index % 2 === 0 ? -42 : 42 }
      : { opacity: 0, y: -28 };

  if (isPlaceholder) {
    return (
      <motion.article
        className="group relative flex flex-col h-full w-full overflow-hidden border border-black/6 bg-white/95 text-brand shadow-[0_20px_50px_rgba(0,0,0,0.14)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white min-[640px]:grid min-[640px]:grid-cols-[240px_minmax(0,1fr)] min-[1180px]:flex min-[1180px]:min-h-[38rem] min-[1180px]:grid-cols-none min-[1180px]:flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
        custom={index}
        variants={{
          hidden: hiddenVariant,
          visible: (cardIndex) => ({
            opacity: 1,
            x: revealDirection === 'side' ? 0 : undefined,
            y: revealDirection === 'down' ? 0 : undefined,
            transition: {
              duration: 0.55,
              ease: revealEase,
              delay: cardIndex * 0.1,
            },
          }),
        }}
      >
        {/* Bildyta med Coming soon-ikon */}
        <div className="relative h-72 min-h-[16rem] overflow-hidden min-[640px]:h-full min-[1180px]:h-[26rem] min-[1180px]:min-h-0 flex items-center justify-center bg-brand/10">
          <Clock className="w-12 h-12 text-brand/30" strokeWidth={2.2} />
        </div>

        <div className="grid flex-1 gap-3 p-4 min-[480px]:p-4 min-[640px]:gap-4 min-[640px]:p-5 min-[1180px]:gap-1 min-[1180px]:p-4">
          <div className="min-[1180px]:flex min-[1180px]:h-full min-[1180px]:flex-col">
            <h3 className="mb-1.5 text-lg font-bold leading-tight min-[1180px]:text-base xl:text-lg">
              Project coming soon
            </h3>
            <p className="mb-3 text-[12px] leading-relaxed text-brand/72 min-[1180px]:flex-1 min-[1180px]:text-[11px] xl:text-[12px]">
              A new project will be published here soon. Stay tuned!
            </p>
            <div className="flex flex-wrap gap-1.5 min-[1180px]:mb-3">
              {/* Tomma tags eller placeholder-tag */}
              <span className="rounded-full bg-brand/6 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-brand/40 lg:px-2.5 lg:text-[10px]">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Hämta rätt bild för ProjectCard
  const cardImage = project.cardImage;
  // Use urlFor to generate the image URL from Sanity asset reference
  const cardImageUrl = cardImage ? urlFor(cardImage, 800) : undefined;
  const cardImageAlt = project.title;

  return (
    <motion.article
      className="group relative flex flex-col h-full w-full overflow-hidden border border-black/6 bg-white/95 text-brand shadow-[0_20px_50px_rgba(0,0,0,0.14)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white min-[640px]:grid min-[640px]:grid-cols-[240px_minmax(0,1fr)] min-[1180px]:flex min-[1180px]:min-h-[38rem] min-[1180px]:grid-cols-none min-[1180px]:flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      custom={index}
      variants={{
        hidden: hiddenVariant,
        visible: (cardIndex) => ({
          opacity: 1,
          x: revealDirection === 'side' ? 0 : undefined,
          y: revealDirection === 'down' ? 0 : undefined,
          transition: {
            duration: 0.55,
            ease: revealEase,
            delay: cardIndex * 0.1,
          },
        }),
      }}
    >
      <Link
        href={`/project/${project._id}`}
        aria-label={`Open ${project.title} project details`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[-6px]"
      />

      <div className="relative h-72 min-h-[16rem] overflow-hidden min-[640px]:h-full min-[1180px]:h-[26rem] min-[1180px]:min-h-0 flex items-center justify-center bg-brand/10">
        {cardImageUrl ? (
          <Image
            src={cardImageUrl}
            alt={cardImageAlt}
            fill
            className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 639px) 100vw, (max-width: 1179px) 240px, 33vw"
          />
        ) : (
          <span className="text-brand/30 text-xs">No image</span>
        )}
      </div>

      <div className="grid flex-1 gap-3 p-4 min-[480px]:p-4 min-[640px]:gap-4 min-[640px]:p-5 min-[1180px]:gap-1 min-[1180px]:p-4">
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
