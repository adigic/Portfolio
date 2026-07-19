"use client";

import ProjectList from './ProjectList';
import { Project } from '@/lib/sanity/types';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/app/components/ModalContext';

type ProjectsSectionProps = {
  projects: Project[];
};

function GetInTouchLink() {
  const { setOpen } = useModal();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="cursor-pointer underline underline-offset-2 decoration-white/40 text-white/85 transition-colors hover:text-white hover:decoration-white"
    >
      Get in touch
    </button>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 3),
    [projects]
  );

  return (
    <section id="projects" data-nav-theme="dark" className="flex min-h-svh items-center bg-brand px-4 py-16 text-white md:px-12 md:py-18 overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="mb-8 max-w-3xl lg:mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Selected Work
          </p>
          <motion.h2
            className="text-2xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl mb-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <span className="text-white">Projects</span>
            <span className="text-white">.</span>
          </motion.h2>

          <p className="max-w-2xl text-sm leading-relaxed text-white/68 sm:text-base">
            Take a look at a few things I&apos;ve delivered. Questions, or curious how I work? <GetInTouchLink />
          </p>
        </div>

        <ProjectList projects={featuredProjects} />

        <div className="mt-8 flex justify-end lg:mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/14 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 transition-[background-color,opacity] duration-200 ease-out hover:bg-white/10 hover:opacity-100"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
