"use client";

import { SectionChevron } from "./SectionChevron";
import { Icon } from "@iconify/react";


const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "AWS",
  "Vue.js",
  "Figma",
  "Git",
];

export default function AboutSection() {
  return (
    <section
     data-nav-theme="dark"
      id="about"
      className="snap-start relative flex flex-col min-h-screen
        bg-brand text-white
        px-6 md:px-12
        pt-20 pb-4"
    >
        <div className="flex-1 flex items-center">
      <div className="mx-auto ">
        {/* Title */}
        <h2 className="mb-12 text-3xl sm:text-4xl lg:text-5xl  uppercase font-alexandria">
          ABOUT ME.
        </h2>

        {/* Main content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start mx-auto">
          {/* Left column: text */}
          <div className="lg:w-4/5">
            <div className="lg:border-l border-white/25 lg:pl-6 text-md sm:text-lg leading-relaxed text-white space-y-5">
              <p>
                Hi, I&apos;m Adis Hegic, a junior frontend developer from
                Sweden passionate about crafting clean, pixel-perfect user
                interfaces. With a strong eye for detail and a love for
                performance-driven design, I aim to create seamless and
                intuitive user experiences.
              </p>
              <p>
                Fluent in Swedish, English, and Bosnian, I thrive in
                collaborative environments and bring both technical precision
                and creativity to every project.
              </p>
              <p>
                I mainly work with modern frontend technologies and design tools
                that help me turn ideas into polished, production-ready
                solutions.
              </p>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-center gap-2 text-sm text-white/80">
              <span className="inline-flexitems-center justify-center ">
                {/* simple location pin icon */}
<Icon
  icon="raphael:location"
  className="h-8 w-8"
  aria-hidden="true"
/>

              </span>
              <span>Sweden</span>
            </div>
          </div>


          {/* RIGHT: skills */}
          <div className="lg:w-2/3">
            <div className="flex flex-wrap  gap-3 w-full">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex w-42 items-center justify-center rounded-lg bg-brand-light/10 border py-3  text-md"
                  style={{
                    borderColor: "currentColor",
                    color: "currentColor",
                    opacity: 0.85,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>


      </div>
      </div>

      {/* Chevron nära botten */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2">
        <SectionChevron theme="dark" />
      </div>

    </section>
  );
}
