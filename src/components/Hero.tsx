"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMessages, useTranslations } from "next-intl";

const DEFAULT_PHRASES = ["Designdriven", "Lösningsorienterad", "Lärhungrig"] as const;

function TypewriterText({
  phrases,
  typeSpeed = 40,
  holdTime = 6000
}: { phrases: string[]; typeSpeed?: number; holdTime?: number }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const typingRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);

  useEffect(() => { if (phrases.length > 1) setIdx(Math.floor(Math.random() * phrases.length)); }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? "";
    setShown("");
    let i = 0;
    const tick = () => {
      if (i <= full.length) {
        setShown(full.slice(0, i++));
        typingRef.current = window.setTimeout(tick, typeSpeed) as unknown as number;
      } else {
        holdRef.current = window.setTimeout(() => setIdx(v => (v + 1) % phrases.length), holdTime) as unknown as number;
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
        style={{ borderLeft: "2px solid currentColor", animation: "caretBlink 1s steps(1,end) infinite", marginLeft: 2, height: "1em", transform: "translateY(2px)" }}
      />
      <style jsx>{`@keyframes caretBlink{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const messages = useMessages() as { hero?: { phrases?: string[] } } | undefined;

  const phrases: string[] = useMemo(() => {
    const arr = messages?.hero?.phrases;
    return Array.isArray(arr) && arr.length ? arr : [...DEFAULT_PHRASES];
  }, [messages]);

  const longestCh = useMemo(() => phrases.reduce((m, s) => Math.max(m, s.length), 0), [phrases]);

  return (
    <div className="mx-auto mb-15 lg:mb-0 w-full gap-8 lg:gap-16 flex flex-col-reverse  lg:grid lg:grid-cols-[minmax(0,1fr)_32rem]">
      {/* LEFT: text */}
      <div className="min-w-0">
        <h1 className="text-brand font-normal leading-[1.1] tracking-tight text-4xl md:text-6xl lg:text-7xl">
          <span className="block lg:text-[60px]" style={{ minWidth: `${longestCh}ch` }}>
            <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
          </span>
          <span className="block lg:text-[60px] text-accent">
            {t("role")}
            <span className="text-brand">.</span>
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-xl md:text-2xl md:leading-8 text-zinc-700">{t("description")}</p>
        <p className="mt-10 max-w-[60ch] text-sm italic text-zinc-500">“{t("quote")}”</p>
      </div>

      {/* RIGHT: image */}
      <div className="w-full">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-100/60 shadow-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src="/me.jpg" alt={t("alt")} fill className="object-cover grayscale" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
