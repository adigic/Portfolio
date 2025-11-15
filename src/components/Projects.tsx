// src/components/Projects.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMessages } from "next-intl";

type Kind = "personal" | "client";
type Project = {
  id?: string;
  title: string;
  kind: Kind;
  desc: string;
  image: string;
  tech: string[];
  links?: { github?: string; live?: string };
};

type ProjectsMessages = {
  title?: string;
  filters?: { all?: string; personal?: string; client?: string };
  items?: Project[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Projects() {
  const messages = useMessages() as Record<string, unknown>;
  const m = (messages?.projects ?? {}) as ProjectsMessages;

  const title = m.title ?? "Projects";
  const labels = {
    all: m.filters?.all ?? "All",
    personal: m.filters?.personal ?? "Personal",
    client: m.filters?.client ?? "Client",
  };

  // Normalize + dedupe by id (and warn in dev if dupes are found)
  const items = useMemo(() => {
    const raw = Array.isArray(m.items) ? m.items : [];
    const seen = new Map<string, Project>();
    for (const r of raw) {
      if (!r || typeof r !== "object") continue;
      const id = (r.id && String(r.id)) || slugify(r.title ?? "");
      if (!id) continue;
      if (seen.has(id)) {
        if (process.env.NODE_ENV !== "production") {

          console.warn(
            `[Projects] Duplicate id '${id}' – keeping the first, skipping the rest`
          );
        }
        continue;
      }
      // minimal shape guard
      if (!r.title || !r.image || !r.kind) continue;
      seen.set(id, { ...r, id });
    }
    const arr = Array.from(seen.values());
    if (!arr.length) {
      // safe fallback so the grid doesn't break if JSON is empty
      return [
        {
          id: "placeholder",
          title: "Add your projects in messages/*/common.json",
          kind: "personal" as const,
          desc: "This placeholder disappears as soon as you add real items.",
          image: "/projects/placeholder.jpg",
          tech: ["React", "Next.js", "TypeScript"],
        },
      ];
    }
    return arr;
  }, [m.items]);

  const [filter, setFilter] = useState<"all" | Kind>("all");

  const list = useMemo(
    () => items.filter((p) => filter === "all" || p.kind === filter),
    [items, filter]
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* Title + filter */}
      <div className="shrink-0 mt-20 flex items-center justify-between gap-4">
      <div className="shrink-0 my-5">
        <p className="text-lg md:text-sm uppercase tracking-[0.2em] font-medium opacity-70 text-current ">
          {title}
        </p>
      </div>
        <div className="inline-flex rounded-xl p-1">
          {(["all", "personal", "client"] as const).map((k) => {
            const active = filter === k;
            return (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer",
                  active
                    ? "bg-brand-light text-brand-dark"
                    : "text-brand-light hover:text-white"
                )}
                aria-pressed={active}>
                {labels[k]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex-1 w-full flex items-center">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((p) => (
            <article
              key={p.id}
              className="bg-white text-brand-dark overflow-hidden">
              <div className="relative aspect-[2.5/3] w-full">
                <Image
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold leading-6">{p.title}</h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-700">{p.desc}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand text-brand-light px-3 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

<div className="flex justify-between items-center">
{/*                 <div className="mt-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      p.kind === "client"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-indigo-100 text-indigo-800"
                    )}>
                    {p.kind === "client" ? "Kundprojekt" : "Personligt"}
                  </span>
                </div> */}
                <div className="flex items-center gap-2 shrink-0 mt-3">
                  {p.links?.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="text-zinc-700 hover:text-zinc-900">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {p.links?.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open live"
                      className="text-zinc-700 hover:text-zinc-900">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
