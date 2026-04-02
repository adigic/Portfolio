"use client";

import ProjectList from './ProjectList';
import { Project } from '@/lib/sanity/types';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';


const FILTERS = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Professional', value: 'Professional' },
];

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'Personal' | 'Professional'>('Personal');

  const filtered = useMemo(
    () =>
      projects.filter((project) =>
        filter === 'Personal'
          ? project.type === 'Personal' || project.type === 'Private'
          : project.type === 'Professional'
      ),
    [filter, projects]
  );

  const featuredProjects = filtered.slice(0, 3);
  const activeIndex = FILTERS.findIndex((item) => item.value === filter);

  return (
    <section id="projects" data-nav-theme="dark" className="flex min-h-svh items-center bg-brand px-4 py-16 text-white md:px-12 md:py-18">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-8 max-w-3xl lg:mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Selected Work
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base">
            A curated set of projects that reflect how I approach interface design, frontend implementation and product presentation.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4 lg:mb-10">
          <div className="min-w-0 flex-1">
            <div className="relative isolate w-full max-w-[26rem] overflow-hidden rounded-full bg-white/88 p-1 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
              <motion.span
                className="absolute bottom-1 top-1 rounded-full bg-[#202020]"
                initial={false}
                animate={{
                  width: 'calc(50% - 0.25rem)',
                  left: activeIndex === 0 ? '0.25rem' : 'calc(50% + 0rem)',
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
              <div className="relative grid grid-cols-2 gap-1">
                {FILTERS.map((item) => {
                  const isActive = filter === item.value;

                  return (
                    <button
                      key={item.value}
                      onClick={() => setFilter(item.value as 'Personal' | 'Professional')}
                      className={`cursor-pointer relative z-10 min-w-0 rounded-full px-3 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-[color,transform] duration-200 ease-out sm:px-5 ${isActive ? 'text-white' : 'text-[#202020] hover:scale-[0.985]'}`}
                      type="button"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <motion.h2
              className="text-2xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              Projects.
            </motion.h2>
            <p className="mt-1 text-xs text-white/52 sm:mt-2 sm:text-sm">
              {featuredProjects.length} featured cards shown
            </p>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ProjectList projects={featuredProjects} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-end lg:mt-10">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-[transform,opacity] duration-200 ease-out hover:translate-x-1 hover:opacity-85"
          >
            ALL PROJECTS <span className="text-base">&raquo;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
