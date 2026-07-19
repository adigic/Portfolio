'use client'

import {motion, type Variants} from 'framer-motion'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react';

import type {Project} from '@/lib/sanity/types'
import { itemVariants } from '@/lib/motionVariants';
import FoundationImage from './components/FoundationImage';
import UxGallery from './components/UxGallery';

type ProjectDetailSummary = {
  overview: string
  process: string
  challenge: string
  solution: string
  outcome: string
  role: string
  client: string
  year: string
  toolsUsed: string[]
  uiSummary: string
}

type ProjectDetailContentProps = {
  project: Project
  summary: ProjectDetailSummary
  hasExternalUrl: boolean
}
const sectionVariants: Variants = {
  hidden: {opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      staggerChildren: 0.12,
    },
  },
}

export default function ProjectDetailContent({
  project,
  summary,
  hasExternalUrl,
}: ProjectDetailContentProps) {
  const hasUxImages = Boolean(project.uxImages?.some((ux) => ux.image))

  return (
    <main>
      <section data-nav-theme="dark" className="bg-brand px-4 pb-16 pt-24 text-white md:px-12 md:pb-20 md:pt-28">
        <motion.div
          className="mx-auto w-full max-w-[1500px]"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div className="mb-8 flex items-center justify-between gap-4" variants={itemVariants}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 border border-white/14 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 transition-[background-color,opacity] duration-200 ease-out hover:bg-white/10 hover:opacity-100"
            >
              <span aria-hidden>&larr;</span>
              Back To Projects
            </Link>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-14">
            <motion.div variants={itemVariants}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {project.type === 'Professional' ? 'Client Work' : 'Learning Project'}
              </p>
              <h1 className="text-4xl font-alexandria uppercase tracking-tight sm:text-5xl lg:text-6xl">{project.title}.</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">{project.description}</p>

              <motion.div className="mt-6 flex flex-wrap gap-2" variants={itemVariants}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-white/7 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/72"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {hasExternalUrl ? (
                <motion.div className="mt-8" variants={itemVariants}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-white/14 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand transition-[background-color,opacity] duration-200 ease-out hover:bg-white/92 hover:opacity-100"
                  >
                    <span>Open Live Site</span>
                    <SquareArrowOutUpRight className="h-3.5 w-3.5" strokeWidth={1.9} />
                  </a>
                </motion.div>
              ) : null}
            </motion.div>

            <motion.aside className="grid gap-3 self-start sm:grid-cols-3 lg:grid-cols-1" variants={itemVariants}>
              {[
                {label: 'Role', value: summary.role},
                {label: 'Context', value: summary.client},
                {label: 'Year', value: summary.year},
              ].map((entry) => (
                <motion.div
                  key={entry.label}
                  className="border border-white/10 bg-white px-4 py-4 text-brand shadow-[0_14px_34px_rgba(0,0,0,0.14)]"
                  variants={itemVariants}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">{entry.label}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-brand/86">{entry.value}</p>
                </motion.div>
              ))}
            </motion.aside>
          </div>
        </motion.div>
      </section>

      <section data-nav-theme="light" className="bg-brand-light px-4 py-16 text-brand md:px-12 md:py-20">
        <motion.div
          className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          variants={sectionVariants}
        >
          <motion.div className="overflow-hidden border border-brand/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]" variants={itemVariants}>
            <FoundationImage image={project.foundationImage} alt={project.title} />
          </motion.div>

          <motion.div className="self-center" variants={itemVariants}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">Overview</p>
            <h2 className="mt-3 text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">Project Foundation.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand/74 sm:text-base">{summary.overview}</p>
          </motion.div>
        </motion.div>
      </section>

      <section data-nav-theme="dark" className="bg-brand px-4 py-16 text-white md:px-12 md:py-20">
        <motion.div
          className="mx-auto w-full max-w-[1500px]"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          variants={sectionVariants}
        >
          <motion.div className="mb-8 max-w-3xl" variants={itemVariants}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Process</p>
            <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">From Challenge To Outcome.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">{summary.process}</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {label: 'Challenge', value: summary.challenge},
              {label: 'Solution', value: summary.solution},
              {label: 'Outcome', value: summary.outcome},
            ].map((entry) => (
              <motion.article
                key={entry.label}
                className="border border-white/10 bg-white px-5 py-5 text-brand shadow-[0_16px_38px_rgba(0,0,0,0.14)]"
                variants={itemVariants}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand/45">{entry.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand/76 sm:text-base">{entry.value}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {summary.toolsUsed.length > 0 ? (
        <section data-nav-theme="light" className="bg-brand-light px-4 py-16 text-brand md:px-12 md:py-20">
          <motion.div
            className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.2}}
            variants={sectionVariants}
          >
            <motion.div variants={itemVariants}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">What Was Used</p>
              <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">Tools & Execution.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand/72 sm:text-base">
                The project was shaped through a mix of product thinking, interface design and frontend implementation. The tools below reflect the main workflow and technologies used to bring it together.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-3" variants={itemVariants}>
              {summary.toolsUsed.map((tool) => (
                <motion.div
                  key={tool}
                  className="flex min-h-16 items-center justify-center border border-brand/10 bg-white px-3 py-4 text-center text-sm font-medium text-brand shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
                  variants={itemVariants}
                >
                  {tool}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {hasUxImages ? (
        <section data-nav-theme="dark" className="bg-brand px-4 py-16 text-white md:px-12 md:py-20">
          <motion.div
            className="mx-auto w-full max-w-[1500px]"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.2}}
            variants={sectionVariants}
          >
            <motion.div className="mb-10 max-w-2xl lg:ml-auto lg:text-right" variants={itemVariants}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">UX / UI</p>
              <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">Design Direction.</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/72 sm:text-base">{summary.uiSummary}</p>
            </motion.div>

            <UxGallery
              images={project.uxImages ?? []}
              fallbackAlt={project.title}
              itemVariants={itemVariants}
            />
          </motion.div>
        </section>
      ) : null}
    </main>
  )
}