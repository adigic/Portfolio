// src/components/Hero.tsx
"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import { FullSection } from "@/components/FullSection";

/** SSR-safe typewriter */
function TypewriterText({ phrases, typeSpeed = 40, holdTime = 6000 }: { phrases: string[]; typeSpeed?: number; holdTime?: number; }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const typingRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);

  useEffect(() => { if (phrases.length > 1) setIdx(Math.floor(Math.random() * phrases.length)); }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? ""; setShown("");
    let i = 0;
    const typeNext = () => {
      if (i <= full.length) { setShown(full.slice(0, i)); i++; typingRef.current = window.setTimeout(typeNext, typeSpeed) as unknown as number; }
      else { holdRef.current = window.setTimeout(() => setIdx((v) => (v + 1) % phrases.length), holdTime) as unknown as number; }
    };
    typeNext();
    return () => { if (typingRef.current) clearTimeout(typingRef.current); if (holdRef.current) clearTimeout(holdRef.current); };
  }, [idx, phrases, typeSpeed, holdTime]);

  return (
    <span className="whitespace-pre" suppressHydrationWarning>
      {shown}
      <span aria-hidden className="inline-block w-[0.6ch] align-baseline" style={{ borderLeft: "2px solid currentColor", animation: "caretBlink 1s steps(1,end) infinite", marginLeft: "2px", height: "1em", transform: "translateY(2px)" }} />
      <style jsx>{`@keyframes caretBlink {0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const messages = useMessages() as any;
  const phrases: string[] = (messages?.hero?.phrases as string[]) ?? ["Designdriven", "Lösningsorienterad", "Lärhungrig"];
  const longestCh = useMemo(() => phrases.reduce((m, s) => Math.max(m, s.length), 0), [phrases]);

  return (
    <FullSection variant="light" /* or "dark" */>
      {/* Mobile-first grid; at lg, lock image track to 32rem */}
      <div className="mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_32rem] lg:gap-16">
        {/* LEFT */}
        <div className="min-w-0">
          <h1 className="text-brand font-normal leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl">
            <span className="block inline-block" style={{ minWidth: `${longestCh}ch` }}>
              <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
            </span>
            <span className="block text-accent">
              {t("role")}<span className="text-brand">.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-2xl leading-8 text-zinc-700">{t("description")}</p>
          <p className="mt-10 max-w-[60ch] text-sm italic text-zinc-500">“{t("quote")}”</p>
        </div>

        {/* RIGHT */}
        <div className="w-full">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-100/60 shadow-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src="/me.jpg" alt={t("alt")} fill className="object-cover grayscale" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Optional scroll cue */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ChevronDown className="h-5 w-5 text-zinc-500" />
      </div>
    </FullSection>
  );
}
