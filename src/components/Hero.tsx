// src/components/Hero.tsx
"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useMessages, useTranslations } from "next-intl";

/** SSR-safe typewriter (no Math.random during SSR) */
function TypewriterText({
  phrases,
  typeSpeed = 40,
  holdTime = 6000,
  cursor = true,
}: {
  phrases: string[];
  typeSpeed?: number;
  holdTime?: number;
  cursor?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");

  const typingRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);

  // Pick a random start only on the client (after mount)
  useEffect(() => {
    if (phrases.length > 1) {
      setIdx(Math.floor(Math.random() * phrases.length));
    }
  }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? "";
    setShown("");

    let i = 0;
    const typeNext = () => {
      if (i <= full.length) {
        setShown(full.slice(0, i));
        i++;
        typingRef.current = window.setTimeout(typeNext, typeSpeed) as unknown as number;
      } else {
        holdRef.current = window.setTimeout(
          () => setIdx((v) => (v + 1) % phrases.length),
          holdTime
        ) as unknown as number;
      }
    };
    typeNext();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, [idx, phrases, typeSpeed, holdTime]);

  return (
    <span className="whitespace-pre" suppressHydrationWarning>
      {shown}
      {cursor && (
        <span
          aria-hidden
          className="inline-block w-[0.6ch] align-baseline"
          style={{
            borderLeft: "2px solid currentColor",
            animation: "caretBlink 1s steps(1,end) infinite",
            marginLeft: "2px",
            height: "1em",
            transform: "translateY(2px)",
          }}
        />
      )}
      <style jsx>{`
        @keyframes caretBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const messages = useMessages() as any;

  const phrases: string[] =
    (messages?.hero?.phrases as string[]) ??
    ["Designdriven", "Lösningsorienterad", "Lärhungrig"];

  // Reserve width equal to the longest phrase (prevents layout jitter)
  const longestCh = useMemo(
    () => phrases.reduce((m, s) => Math.max(m, s.length), 0),
    [phrases]
  );

  return (
    <section className="w-full py-10 md:py-14 lg:py-20">
      {/* Mobile-first: single column. At lg: text + fixed-width image track */}
      <div className="mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_32rem] lg:gap-16">
        {/* LEFT: text */}
        <div className="min-w-0">
          <h1 className="text-brand font-normal leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl">
            {/* Reserve space for the changing phrase */}
            <span
              className="block fade-in-down-sm inline-block"
              style={{ minWidth: `${longestCh}ch` }}
            >
              <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
            </span>

            <span className="block fade-in-down-md text-accent">
              {t("role")}
              <span className="text-brand">.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-2xl leading-8 text-zinc-700 fade-in-down-lg">
            {t("description")}
          </p>

          <p className="mt-10 max-w-[60ch] text-sm italic text-zinc-500 fade-in-down-lg">
            “{t("quote")}”
          </p>
        </div>

        {/* RIGHT: portrait (fixed track width at lg+, steady size) */}
        <div className="w-full">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-100/60 shadow-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/me.jpg"
                alt={t("alt")}
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="mt-10 flex justify-center">
        <ChevronDown className="h-5 w-5 text-zinc-500" />
      </div>
    </section>
  );
}
