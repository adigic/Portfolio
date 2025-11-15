"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import Image from "next/image";

const DEFAULT_PHRASES = [
  "Designdriven",
  "Lösningsorienterad",
  "Lärhungrig",
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

  useEffect(() => {
    if (phrases.length > 1) setIdx(Math.floor(Math.random() * phrases.length));
  }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? "";
    setShown("");
    let i = 0;
    const tick = () => {
      if (i <= full.length) {
        setShown(full.slice(0, i++));
        typingRef.current = window.setTimeout(
          tick,
          typeSpeed
        ) as unknown as number;
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
  const t = useTranslations("hero");
  const messages = useMessages() as
    | { hero?: { phrases?: string[] } }
    | undefined;

  const phrases: string[] = useMemo(() => {
    const arr = messages?.hero?.phrases;
    return Array.isArray(arr) && arr.length ? arr : [...DEFAULT_PHRASES];
  }, [messages]);

  const longestCh = useMemo(
    () => phrases.reduce((m, s) => Math.max(m, s.length), 0),
    [phrases]
  );

  return (
    <div className="mb-15 lg:mb-0 w-full flex justify-center">
      <div className="min-w-0 text-center px-4 sm:px-6">
        {/* TITLE */}
        <h1 className="text-brand font-normal leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl">
          <span
            className="block lg:text-[60px]"
            style={{ minWidth: `${longestCh}ch` }}>
            <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
          </span>
          <span className="block lg:text-[60px] text-accent font-righteous">
            {t("role")}
            <span className="text-brand">.</span>
          </span>
        </h1>

        {/* SUBTEXT + QUOTE */}
        <p className="mt-6 max-w-4xl mx-auto text-xl md:text-3xl md:leading-8 text-zinc-700">
          {t("description")}
        </p>
        <p className="mt-10 max-w-[60ch] mx-auto text-sm italic text-zinc-500">
          “{t("quote")}”
        </p>

        {/* CARDS */}
        <div className="mt-16 max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {/* DESIGN */}
          <FeatureCard
            title="DESIGN"
            image="/cards/design.avif"
            text="I create clean, structured and visually balanced interfaces with a strong focus on detail, typography and spacing."
          />

          {/* UX */}
          <FeatureCard
            title="UX"
            image="/cards/ux.avif"
            text="I craft intuitive user flows and interactions that make products feel natural, clear and enjoyable to use."
          />

          {/* CODE */}
          <FeatureCard
            title="CODE"
            image="/cards/code.avif"
            text="I build fast, responsive and maintainable frontend architecture using modern frameworks and best practices."
          />
        </div>
      </div>
    </div>
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
    <div className="relative overflow-hidden rounded-lg bg-white aspect-[5/6] shadow-sm">
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40"
        />
        {/* soft overlay för att göra texten läsbar */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* content */}
      <div className="relative px-8 py-9 text-left flex flex-col justify-between h-full">
        <div>
          <h3 className="text-base   font-semibold tracking-[0.18em] text-zinc-900 text-center md:text-left">
            {title}
          </h3>
          <div className="mt-3 h-[2px] w-10 bg-accent mx-auto md:mx-0" />
        </div>

        <p className="mt-6 text-sm leading-relaxed text-zinc-800 text-center md:text-left ">
          {text}
        </p>
      </div>
    </div>
  );
}
