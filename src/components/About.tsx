"use client";

import { useMessages } from "next-intl";
import { MapPin } from "lucide-react";

type AboutContent = {
  title: string;
  bio: string[];
  skills: string[];
  location: string;
};

export default function About() {
  const messages = useMessages() as { about?: Partial<AboutContent> } | undefined;
  const m = messages?.about ?? {};

  const content: AboutContent = {
    title: m.title ?? "About me",
    bio:
      m.bio ?? [
        "Hi, I’m Adis Hegic, a junior frontend developer from Sweden passionate about crafting clean, pixel-perfect user interfaces.",
        "Fluent in Swedish, English, and Bosnian, I thrive in collaborative environments and bring both technical precision and creativity to every project.",
        "I mainly work with modern frontend technologies and design tools that help me turn ideas into polished, production-ready solutions."
      ],
    skills:
      m.skills ?? ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "AWS", "Vue.js", "Figma", "Git"],
    location: m.location ?? "Sweden"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
      {/* LEFT */}
      <div className="min-w-0">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
          {content.title}.
        </h2>

        <div className="mt-8 pl-5 border-l border-current/15 text-current/80 leading-7 space-y-5 max-w-2xl">
          {content.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="pt-3 flex items-center gap-2 text-sm opacity-80">
            <MapPin className="h-4 w-4" aria-hidden />
            <span>{content.location}</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:pl-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {content.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: "currentColor", opacity: 0.85 }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
