"use client";

import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion";

const experiences = [
  {
    company: "Novalo Technologies",
    period: "November 2024 - May 2025",
    role: "Frontend Developer | AI-integrated applications",
    bullets: [
      "Contributed to the development of a car validation platform with AI-powered features.",
      "Built and improved UI components using React, Next.js, TypeScript, and Tailwind CSS.",
      "Collaborated closely with backend developers in a cross-functional team.",
      "Worked in an Agile/Scrum environment with daily stand-ups, sprint planning, and used AI tools to assist development, debugging, and implementation of features.",
      "Helped integrate frontend with backend services and APIs.",
    ],
  },
  {
    company: "GKN Automotive",
    period: "June 2015 - Present",
    role: "Automation Electrician | Team Leader",
    bullets: [
      "Led maintenance work and coordinated team priorities in a high-demand production environment.",
      "Troubleshot and programmed PLCs (Siemens, Fancuc) and industrial robots (ABB).",
      "Ensured operational stability and fast issue resolution.",
      "Developed strong skills in problem-solving, leadership, and working under pressure.",
    ],
  },
];

const education = [
  {
    school: "Frontend Developer",
    subtitle: "EC Utbildning",
    period: "August 2023 - June 2025",
    bullets: [
      "Higher vocational studies focused on modern frontend development.",
      "Built practical skills in React, Next.js, TypeScript, UI implementation and responsive design.",
      "Worked with project-based assignments and collaborative development workflows.",
    ],
  },
  {
    school: "Electrical & Automation",
    subtitle: "Wijkmanska Gymnasiet",
    period: "August 2012 - June 2015",
    bullets: [
      "Studied electrical systems, automation and industrial technology.",
      "Built a strong technical foundation in troubleshooting and structured problem solving.",
    ],
  },
];

const sectionVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const introVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const introItemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ExperienceEducationSection() {
  return (
    <section
      id="background"
      data-nav-theme="light"
      className="relative flex min-h-svh items-center bg-brand-light px-4 py-16 text-brand md:px-12 md:py-18"
    >
      <motion.div
        className="mx-auto w-full max-w-[1500px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div
          className="mb-10 max-w-3xl lg:mb-12 lg:ml-auto lg:max-w-5xl lg:border-r lg:border-brand/12 lg:pr-8 lg:text-right"
          variants={introVariants}
        >
          <motion.p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand/45" variants={introItemVariants}>
            Background
          </motion.p>
          <motion.h2 className="text-3xl font-alexandria uppercase tracking-tight sm:text-4xl lg:text-5xl" variants={introItemVariants}>
            Experience & Education.
          </motion.h2>
          <motion.p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand/70 sm:text-base lg:ml-auto" variants={introItemVariants}>
            Experience in modern frontend development combined with years of technical leadership, maintenance responsibility and structured problem solving.
          </motion.p>
        </motion.div>

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-14">
          <motion.div id="experience" className="min-w-0" variants={cardVariants}>
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center border border-brand/10 bg-white/60 shadow-[0_12px_24px_rgba(0,0,0,0.05)]">
                <Icon icon="solar:case-round-minimalistic-bold-duotone" className="h-6 w-6 text-brand" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
                Experience
              </h2>
            </div>

            <div className="space-y-6 border-l border-brand/18 pl-5 sm:pl-6">
              {experiences.map((item) => (
                <motion.article
                  key={item.company}
                  className="space-y-2 border border-brand/8 bg-white/45 px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-brand/14 hover:bg-white/55 hover:shadow-[0_22px_42px_rgba(0,0,0,0.08)]"
                  variants={cardVariants}
                >
                  <div>
                    <h3 className="text-[1.45rem] font-semibold leading-none tracking-tight sm:text-[1.6rem] lg:text-[1.8rem]">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand/85">
                      {item.period}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-brand/90 sm:text-[0.95rem]">
                    {item.role}
                  </p>

                  <ul className="list-disc space-y-1.5 pl-5 pt-1 text-sm leading-relaxed text-brand/78 marker:text-brand/60 sm:text-[0.95rem]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div id="education" className="min-w-0 lg:pt-1" variants={cardVariants}>
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center border border-brand/10 bg-white/60 shadow-[0_12px_24px_rgba(0,0,0,0.05)]">
                <Icon icon="solar:diploma-verified-bold-duotone" className="h-6 w-6 text-brand" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-[2rem]">
                Education
              </h2>
            </div>

            <div className="space-y-5 border-l border-brand/18 pl-5 sm:pl-6">
              {education.map((item) => (
                <motion.article
                  key={item.school}
                  className="space-y-2 border border-brand/8 bg-white/45 px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-brand/14 hover:bg-white/55 hover:shadow-[0_22px_42px_rgba(0,0,0,0.08)]"
                  variants={cardVariants}
                >
                  <h3 className="text-[1.35rem] font-semibold leading-none tracking-tight sm:text-[1.55rem]">
                    {item.school}
                  </h3>
                  <p className="text-sm font-semibold text-brand/82 sm:text-[0.95rem]">
                    {item.subtitle}
                  </p>
                  <p className="text-sm font-semibold text-brand/72 sm:text-[0.95rem]">
                    {item.period}
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5 pt-1 text-sm leading-relaxed text-brand/78 marker:text-brand/60 sm:text-[0.95rem]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}