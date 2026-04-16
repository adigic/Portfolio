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

const FILTER_DESCRIPTIONS = {
  Personal:
    'A curated set of learning-focused test projects that I built to explore ideas, practice new techniques and deepen my frontend skills.',
  Professional:
    'A curated set of projects delivered through my company, reflecting how I approach client work, production-ready interfaces and real-world delivery.',
} as const;

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
  const description = FILTER_DESCRIPTIONS[filter];

  return (
    <section id="projects" data-nav-theme="dark" className="flex min-h-svh items-center bg-brand px-4 py-16 text-white md:px-12 md:py-18">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end lg:gap-10">
          <div className="min-w-0 max-w-3xl">
            <motion.h2
              className="text-2xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              Projects.
            </motion.h2>
            <p className="mt-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Selected Work
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base">
              {description}
            </p>
          </div>

          <div className="shrink-0 lg:flex lg:flex-col lg:items-end lg:text-right">
            <div className="relative isolate w-[20rem] overflow-hidden rounded-full bg-white/88 p-1 shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:w-[17rem] lg:ml-auto lg:w-fit">
              <div className="relative grid grid-cols-2 gap-1">
                {FILTERS.map((item) => {
                  const isActive = filter === item.value;

                  return (
                    <button
                      key={item.value}
                      onClick={() => setFilter(item.value as 'Personal' | 'Professional')}
                      className={`cursor-pointer relative z-10 min-w-0 rounded-full px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ease-out sm:px-4 md:px-5  ${isActive ? 'text-white' : 'text-[#202020]'}`}
                      type="button"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="projects-filter-pill"
                          className="absolute inset-0 rounded-full bg-[#202020]"
                          transition={{ type: 'spring', stiffness: 360, damping: 30, mass: 0.85 }}
                        />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>


          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
          >
            <ProjectList projects={featuredProjects} />
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-end lg:mt-10">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-white transition-opacity duration-200 ease-out hover:opacity-85"
          >
            ALL PROJECTS <span className="text-base">&raquo;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
