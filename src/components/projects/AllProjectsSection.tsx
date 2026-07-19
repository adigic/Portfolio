"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SquareArrowOutUpRight } from 'lucide-react';

import { Project } from '@/lib/sanity/types';
import ProjectPosterCard from './ProjectPosterCard';

interface AllProjectsSectionProps {
  projects: Project[];
}

export default function AllProjectsSection({ projects }: AllProjectsSectionProps) {
  const stats = useMemo(() => {
    const personal = projects.filter(
      (project) => project.type === 'Personal' || project.type === 'Private'
    ).length;
    const professional = projects.filter((project) => project.type === 'Professional').length;

    return [
      { label: 'Total Projects', value: projects.length },
      { label: 'Personal', value: personal },
      { label: 'Professional', value: professional },
    ];
  }, [projects]);

  return (
    <>
      <section data-nav-theme="light" className="min-h-svh bg-brand-light px-4 pb-16 pt-24 text-brand md:px-12 md:pb-20 md:pt-28">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="mb-8 max-w-2xl lg:mb-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">
              Full Archive
            </p>
            <h1 className="mb-2 text-2xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">
              All Projects.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-brand/68 sm:text-base">
              Every project I&apos;ve built or delivered, personal and professional. Hover a tile for details.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5"
          >
            {projects.map((project, index) => (
              <ProjectPosterCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>

          {projects.length === 0 ? (
            <p className="mt-10 text-center text-sm text-brand/50">No projects yet.</p>
          ) : null}
        </div>
      </section>

      <section data-nav-theme="dark" className="bg-brand px-4 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            By the Numbers
          </p>
          <h2 className="mb-6 text-2xl font-alexandria uppercase tracking-tight sm:text-3xl lg:mb-8 lg:text-4xl">
            The collection so far.
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-white/5 px-4 py-4 sm:px-5 sm:py-5">
                <p className="mb-1 font-alexandria text-2xl text-accent sm:text-3xl">{stat.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-10 lg:pt-10">
            <p className="max-w-md text-sm leading-relaxed text-white/68">
              Want to see more? Visit my GitHub for the full list of public repositories and experiments.
            </p>
            <a
              href="https://github.com/adigic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border border-white/14 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 transition-[background-color,opacity] duration-200 ease-out hover:bg-white/10 hover:opacity-100"
            >
              Visit GitHub
              <SquareArrowOutUpRight className="h-3.5 w-3.5" strokeWidth={1.9} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
