// src/components/About.tsx
"use client";

import { useMessages } from "next-intl";
import { MapPin } from "lucide-react";
import { FullSection } from "@/components/FullSection";

type AboutContent = {
  title: string;
  bio: string[];
  skills: string[];
  location: string;
};

export default function About() {
  // Cast the messages object to a shape we expect
  const messages = useMessages() as { about?: Partial<AboutContent> } | undefined;
  const m = messages?.about ?? {};

  const content: AboutContent = {
    title:
      m.title ??
      "About me",
    bio:
      m.bio ?? [
        "Hi, I’m Adis Hegic, a junior frontend developer from Sweden passionate about crafting clean, pixel-perfect user interfaces. With a strong eye for detail and a love for performance-driven design, I aim to create seamless and intuitive user experiences.",
        "Fluent in Swedish, English, and Bosnian, I thrive in collaborative environments and bring both technical precision and creativity to every project.",
        "I mainly work with modern frontend technologies and design tools that help me turn ideas into polished, production-ready solutions."
      ],
    skills:
      m.skills ?? [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "AWS",
        "Vue.js",
        "Figma",
        "Git"
      ],
    location: m.location ?? "Sweden"
  };

  return (
    <FullSection id="about" variant="dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* LEFT: heading + bio */}
        <div className="min-w-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
            {content.title}.
          </h2>

          <div className="mt-8 pl-5 border-l border-white/15 text-zinc-300 leading-7 space-y-5 max-w-2xl">
            {content.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="pt-3 flex items-center gap-2 text-sm text-zinc-400">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>{content.location}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: skill pills */}
        <div className="lg:pl-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {content.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/[0.15] px-4 py-3 text-sm text-zinc-200 shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FullSection>
  );
}
