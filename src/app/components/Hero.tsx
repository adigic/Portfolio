"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { SectionChevron } from "./SectionChevron";

const PHRASES = [
  "Design-driven",
  "Project-oriented",
  "Always learning",
] as const;

function TypewriterText({
  phrases,
  typeSpeed = 40,
  holdTime = 6000,
}: {
  phrases: string[];
  typeSpeed?: number;
  holdTime?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const typingRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);

  // Start on a random phrase if there are several
  useEffect(() => {
    if (phrases.length > 1) {
      setIdx(Math.floor(Math.random() * phrases.length));
    }
  }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? "";
    setShown("");
    let i = 0;

    const tick = () => {
      if (i <= full.length) {
        setShown(full.slice(0, i++));
        typingRef.current = window.setTimeout(tick, typeSpeed) as unknown as number;
      } else {
        holdRef.current = window.setTimeout(
          () => setIdx((v) => (v + 1) % phrases.length),
          holdTime
        ) as unknown as number;
      }
    };

    tick();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, [idx, phrases, typeSpeed, holdTime]);

  return (
    <span className="whitespace-pre" suppressHydrationWarning>
      {shown}
      <span
        aria-hidden
        className="inline-block w-[0.6ch] align-baseline"
        style={{
          borderLeft: "2px solid currentColor",
          animation: "caretBlink 1s steps(1,end) infinite",
          marginLeft: 2,
          height: "1em",
          transform: "translateY(2px)",
        }}
      />
      <style jsx>{`
        @keyframes caretBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}

export function Hero() {
  const phrases = useMemo(() => [...PHRASES], []);

  const longestCh = useMemo(
    () => phrases.reduce((m, s) => Math.max(m, s.length), 0),
    [phrases]
  );

  return (
    <section  data-nav-theme="light" className="w-full snap-start snap-always relative flex flex-col min-h-screen
        bg-brand-light
         px-2 md:px-12
        md:pt-20 pb-4">
          <div className="flex-1 w-full flex items-center justify-center">
      <div className="min-w-0 text-center sm:px-6">
        {/* TITLE */}
        <h1
          className="
            text-brand mt-16  font-alexandria leading-[1.1] tracking-tight
            text-[clamp(2.4rem,5vw,3.6rem)]
          "
        >
          <span
            className="
              block font-light
              text-[clamp(2.2rem,6vw,3.5rem)]
            "
            style={{ minWidth: `${longestCh}ch` }}
          >
            <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
          </span>

<span
  className="
    block text-accent font-righteous
    text-[clamp(2.5rem,8vw,5rem)]
  "
>
  Frontend Developer<span className="text-brand">.</span>
</span>

        </h1>

        {/* SUBTEXT + QUOTE */}
<p
  className="
    mt-6 max-w-5xl mx-auto text-brand
    text-[clamp(0.75rem,1.9vw,1.7rem)]
    leading-[1.4]
  "
>

  <span className="block">
    Newly graduated, detail-focused, and passionate about UI/UX.
  </span>
  <span className="block">
    Excited to bring clean design and performance to every project.
  </span>
</p>


<p
  className="
    mt-4 max-w-[60ch] mx-auto italic text-brand/70
    text-[clamp(0.70rem,1.3vw,1.2rem)]
  "
>
          “I&rsquo;m ready to grow, learn, and build something amazing.”
        </p>

        {/* CARDS */}
        <div className="mt-16 max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="DESIGN"
            image="/cards/design.avif"
            text="I create clean, structured and visually balanced interfaces with a strong focus on detail, typography and spacing."
          />

          <FeatureCard
            title="UX"
            image="/cards/ux.avif"
            text="I craft intuitive user flows and interactions that make products feel natural, clear and enjoyable to use."
          />

          <FeatureCard
            title="CODE"
            image="/cards/code.avif"
            text="I build fast, responsive and maintainable frontend architecture using modern frameworks and best practices."
          />
        </div>

      </div>
      </div>

      {/* Chevron låst nära nedre kanten av sektionen/viewporten */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2">
        <SectionChevron theme="light" />
      </div>

    </section>
  );
}

/* --- reusable card component --- */

type FeatureCardProps = {
  title: string;
  text: string;
  image: string; // path in /public
};

function FeatureCard({ title, text, image }: FeatureCardProps) {
  return (
    <div
      className="
        relative overflow-hidden rounded-xl bg-white shadow-sm
        border border-zinc-200
        lg:aspect-[5/6]
      "
    >
      {/* Bakgrundsbild – bara på desktop */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Content */}
      <div
        className="
          relative h-full
          px-5 py-4
          sm:px-6 sm:py-6
          lg:px-8 lg:py-9
          flex flex-col justify-between
          text-left
        "
      >
        <div>
          <h3
            className="
              text-sm sm:text-base font-semibold tracking-[0.18em]
              text-zinc-900 text-left
            "
          >
            {title}
          </h3>
          <div className="mt-2 h-[2px] w-8 sm:w-10 bg-accent" />
        </div>

        <p
          className="
            mt-3 sm:mt-4 lg:mt-6
            text-xs sm:text-sm leading-relaxed
            text-zinc-800
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}
