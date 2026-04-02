"use client";

import { motion, type Variants } from "framer-motion";
import { Globe, MapPin, Sparkles, Workflow, Wrench } from "lucide-react";

import { SectionChevron } from "./SectionChevron";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Vite",
  "Tailwind CSS",
  "Git",
  "Agile/Scrum",
  "Rest APIs",
  "AWS",
  "ChatGPT",
  "GitHub Copilot",
  "Claude Code",
];

const highlights = [
  {
    title: "Focus",
    description: "Frontend-focused engineering with modern web applications as the core craft.",
    icon: Sparkles,
  },
  {
    title: "Workflow",
    description: "Using AI tools to accelerate prototyping, debugging and implementation.",
    icon: Workflow,
  },
  {
    title: "Strength",
    description: "Automation and leadership background with a structured problem-solving mindset.",
    icon: Wrench,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const hoverLift = {
  y: -5,
  transition: { type: "spring", stiffness: 300, damping: 24, mass: 0.7 },
} as const;

export default function AboutSection() {
  return (
    <section
      data-nav-theme="dark"
      id="about"
      className="relative flex min-h-svh flex-col justify-center bg-brand px-4 py-18 text-white md:px-12 md:py-20"
    >
      <div className="flex flex-1 items-center">
        <motion.div
          className="mx-auto w-full max-w-[1500px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="mb-8 max-w-3xl lg:mb-10" variants={itemVariants}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Profile
            </p>
            <h2 className="text-3xl uppercase font-alexandria sm:text-4xl lg:text-5xl">
              About Me.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
              Software engineer with a frontend focus, combining modern web development with a strong eye for structure, usability and polished execution.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-start lg:gap-12"
            variants={itemVariants}
          >
            <div>
              <div className="space-y-4 text-sm leading-relaxed text-white sm:text-base lg:border-l lg:border-white/20 lg:pl-6 lg:text-[1rem]">
                <p>
                  I build modern web interfaces with React, Next.js and TypeScript, with a clear focus on creating experiences that feel intuitive, reliable and visually refined.
                </p>
                <p>
                  I actively use AI tools to accelerate development, improve code quality, and explore new solutions from prototyping to debugging and implementation.
                </p>
                <p>
                  With a background in automation engineering and team leadership, I bring a structured, problem-solving mindset and thrive in collaborative, fast-paced environments.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-white/80 sm:text-lg">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-white/70" strokeWidth={1.9} />
                  <span>Hallstahammar, Sweden</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white/58 sm:text-[0.8rem]">
                  <Globe className="h-4.5 w-4.5" strokeWidth={1.9} />
                  Swedish, English, Bosnian
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map(({ title, description, icon: Icon }) => (
                  <motion.div
                    key={title}
                    className="border border-white/10 bg-white/4 px-4 py-4 transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-white/20 hover:bg-white/6 hover:shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
                    variants={itemVariants}
                    whileHover={hoverLift}
                  >
                    <Icon className="h-4.5 w-4.5 text-white/72" strokeWidth={1.9} />
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                      {title}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/88">
                      {description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div className="w-full lg:max-w-[520px] lg:justify-self-end" variants={itemVariants}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  Core Stack
                </p>
                <p className="text-right text-xs text-white/45">
                  Core tools, workflows and platforms from the CV
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="flex min-h-12 items-center justify-center border border-brand-light/10 bg-brand-light/8 px-3 py-3 text-sm font-medium shadow-2xl transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-brand-light/40 hover:bg-brand-light/12 hover:shadow-[0_14px_26px_rgba(0,0,0,0.12)]"
                    variants={itemVariants}
                    whileHover={hoverLift}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 lg:block">
        <SectionChevron theme="dark" />
      </div>
    </section>
  );
}
