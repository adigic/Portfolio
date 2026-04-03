import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {fetchProjectById, fetchProjects} from '@/lib/sanity/fetchProjects'

type ProjectPageProps = {
  params: Promise<{id: string}>
}

function getProjectSummary(project: Awaited<ReturnType<typeof fetchProjectById>>) {
  if (!project) {
    return null
  }

  return {
    overview: project.overview ?? project.description,
    process:
      project.process ??
      'The work moved from concept and structure into interface refinement and frontend implementation, with each iteration focused on clarity, usability and stronger presentation.',
    challenge:
      project.challenge ??
      'The project needed a clear structure, a polished interface and a frontend solution that supported both usability and consistency across the experience.',
    solution:
      project.solution ??
      'I approached it through strong visual hierarchy, responsive implementation and a frontend structure designed to keep the experience intuitive and maintainable.',
    outcome:
      project.outcome ??
      'The outcome is a more refined project presentation that shows how I translate product thinking into practical frontend execution.',
    role: project.role ?? 'Software Engineer / Frontend Development',
    client:
      project.client ??
      (project.type === 'Professional'
        ? 'Project delivered through my company'
        : 'Independent learning project'),
    year: project.year ?? 'Recent work',
    toolsUsed: project.toolsUsed?.length ? project.toolsUsed : project.tags,
    uiSummary:
      project.uiSummary ??
      'The UX/UI direction focused on hierarchy, spacing, clarity and a visual language that supports the product without adding unnecessary noise.',
    figmaImageUrls: project.figmaImageUrls?.length ? project.figmaImageUrls : [project.imageUrl],
  }
}

export async function generateStaticParams() {
  const projects = await fetchProjects()

  return projects.map((project) => ({id: project._id}))
}

export async function generateMetadata({params}: ProjectPageProps): Promise<Metadata> {
  const {id} = await params
  const project = await fetchProjectById(id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const {id} = await params
  const project = await fetchProjectById(id)

  if (!project) {
    notFound()
  }

  const summary = getProjectSummary(project)
  const hasExternalUrl = Boolean(project.url && project.url !== '#')
  const uxImages = summary?.figmaImageUrls ?? []

  return (
    <main>
      <section data-nav-theme="dark" className="bg-brand px-4 pb-16 pt-24 text-white md:px-12 md:pb-20 md:pt-28">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 border border-white/14 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 transition-[background-color,opacity] duration-200 ease-out hover:bg-white/10 hover:opacity-100"
            >
              <span aria-hidden>&larr;</span>
              Back To Projects
            </Link>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {summary?.year}
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-14">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {project.type === 'Professional' ? 'Client Work' : 'Learning Project'}
              </p>
              <h1 className="text-4xl font-alexandria uppercase tracking-tight sm:text-5xl lg:text-6xl">
                {project.title}.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-white/7 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/72"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {hasExternalUrl ? (
                <div className="mt-8">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-white/14 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand transition-[background-color,opacity] duration-200 ease-out hover:bg-white/92 hover:opacity-100"
                  >
                    <span>Open Live Site</span>
                    <span aria-hidden>&nearr;</span>
                  </a>
                </div>
              ) : null}
            </div>

            <aside className="grid gap-3 self-start sm:grid-cols-3 lg:grid-cols-1">
              <div className="border border-white/10 bg-white px-4 py-4 text-brand shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">Role</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-brand/86">{summary?.role}</p>
              </div>
              <div className="border border-white/10 bg-white px-4 py-4 text-brand shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">Context</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-brand/86">{summary?.client}</p>
              </div>
              <div className="border border-white/10 bg-white px-4 py-4 text-brand shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">Year</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-brand/86">{summary?.year}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-brand-light px-4 py-16 text-brand md:px-12 md:py-20">
        <div className="mx-auto grid w-full max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-14">
          <div className="overflow-hidden border border-brand/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
            <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </div>

          <div className="self-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">Overview</p>
            <h2 className="mt-3 text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Project Foundation.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand/74 sm:text-base">
              {summary?.overview}
            </p>

            <div className="mt-8 border border-brand/10 bg-white px-5 py-5 shadow-[0_16px_38px_rgba(0,0,0,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">Project Details</p>
              <div className="mt-4 space-y-4 text-sm text-brand/78">
                <div>
                  <p className="font-semibold text-brand/90">Type</p>
                  <p>{project.type === 'Professional' ? 'Professional / Company work' : 'Personal / Learning project'}</p>
                </div>
                <div>
                  <p className="font-semibold text-brand/90">Stack</p>
                  <p>{project.tags.join(', ')}</p>
                </div>
                {hasExternalUrl ? (
                  <div>
                    <p className="font-semibold text-brand/90">Demo / Live Website</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-opacity duration-200 ease-out hover:opacity-70"
                    >
                      Open live project
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-nav-theme="dark" className="bg-brand px-4 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Process</p>
            <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">
              From Challenge To Outcome.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
              {summary?.process}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="border border-white/10 bg-white px-5 py-5 text-brand shadow-[0_16px_38px_rgba(0,0,0,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand/45">Challenge</p>
              <p className="mt-3 text-sm leading-relaxed text-brand/76 sm:text-base">{summary?.challenge}</p>
            </article>
            <article className="border border-white/10 bg-white px-5 py-5 text-brand shadow-[0_16px_38px_rgba(0,0,0,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand/45">Solution</p>
              <p className="mt-3 text-sm leading-relaxed text-brand/76 sm:text-base">{summary?.solution}</p>
            </article>
            <article className="border border-white/10 bg-white px-5 py-5 text-brand shadow-[0_16px_38px_rgba(0,0,0,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand/45">Outcome</p>
              <p className="mt-3 text-sm leading-relaxed text-brand/76 sm:text-base">{summary?.outcome}</p>
            </article>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-brand-light px-4 py-16 text-brand md:px-12 md:py-20">
        <div className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">What Was Used</p>
            <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">
              Tools & Execution.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand/72 sm:text-base">
              The project was shaped through a mix of product thinking, interface design and frontend implementation. The tools below reflect the main workflow and technologies used to bring it together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {summary?.toolsUsed.map((tool) => (
              <div
                key={tool}
                className="flex min-h-16 items-center justify-center border border-brand/10 bg-white px-3 py-4 text-center text-sm font-medium text-brand shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-nav-theme="dark" className="bg-brand px-4 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
            <div className="grid gap-4 md:grid-cols-2">
              {uxImages.map((imageUrl, index) => (
                <article
                  key={`${imageUrl}-${index}`}
                  className="overflow-hidden border border-white/10 bg-white shadow-[0_20px_48px_rgba(0,0,0,0.16)]"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={imageUrl}
                      alt={`${project.title} design direction ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="border-t border-brand/8 px-5 py-4 text-brand">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand/45">
                      {index === 0 ? 'Primary Direction' : `Design View ${index + 1}`}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand/76">
                      {index === 0
                        ? 'A closer look at the visual direction, layout hierarchy and interface decisions behind the project.'
                        : 'Additional UI context that supports how the project was shaped and presented visually.'}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="lg:pl-6 lg:text-right">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">UX / UI</p>
              <h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl">
                Design Direction.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base lg:ml-auto">
                {summary?.uiSummary}
              </p>

              <div className="mt-8 border border-white/10 bg-white px-5 py-5 text-left text-brand shadow-[0_16px_38px_rgba(0,0,0,0.14)] lg:ml-auto lg:max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45">Design Notes</p>
                <p className="mt-3 text-sm leading-relaxed text-brand/76 sm:text-base">
                  This section is intended to show visual direction, interface thinking and supporting UX/UI material such as Figma screens, flows or design explorations. Each project can reuse the same structure while still feeling relevant to its own content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}