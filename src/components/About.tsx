// src/components/About.tsx
"use client";

import { useMessages } from "next-intl";
import { MapPin } from "lucide-react";

type AboutContent = {
  title: string;     // used as the small section label at the top
  bio: string[];     // paragraphs
  skills: string[];  // pill list
  location: string;  // e.g. "Stockholm, Sweden"
};

export default function About() {
  // Safely read the messages (avoid TS error by casting to a generic record)
  const messages = useMessages() as Record<string, unknown>;
  const m = (messages?.about ?? {}) as Partial<AboutContent>;

  const content: AboutContent = {
    title: m.title ?? "About",
    bio:
      m.bio ?? [
        "Hi, I’m Adis Hegic, a junior frontend developer from Sweden who loves crafting clean, pixel-perfect interfaces where design and performance go hand in hand.",
        "I’m solutions-oriented, collaborative, and curious — always pushing to learn more and ship better UX.",
        "Day-to-day I work with React/Next.js, TypeScript and Tailwind, and I use Figma to move smoothly from idea to polished UI."
      ],
    skills:
      m.skills ?? ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Figma", "Git", "AWS", "Vue.js"],
    location: m.location ?? "Stockholm, Sweden"
  };

  return (
    // Fills the section; top label + centered content below
    <div className="w-full h-full flex flex-col">
      {/* Content-title (section label) — stays at the top */}
      <div className="shrink-0 my-5">
        <p className="text-lg md:text-sm uppercase tracking-[0.2em] font-medium opacity-70 text-current ">
          {content.title}
        </p>
      </div>

      {/* Main content centered in the remaining vertical space */}
      <div className="flex-1 w-full flex items-center my-10">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* LEFT: bio */}
          <div className="min-w-0">
            <div className="md:pl-5 md:border-l border-current/15 text-current/80 leading-7 space-y-5 max-w-2xl">
              {content.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="pt-3 flex items-center gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4" aria-hidden />
                <span>{content.location}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: skills */}
          <div className="lg:pl-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {content.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center justify-center rounded-lg bg-brand-light/10 border  py-3 text-md"
                  style={{ borderColor: "currentColor", color: "currentColor", opacity: 0.85 }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
