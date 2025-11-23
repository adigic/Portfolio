"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

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

/* --- HERO --- */

export function Hero() {
  const phrases = useMemo(() => [...PHRASES], []);

  const longestCh = useMemo(
    () => phrases.reduce((m, s) => Math.max(m, s.length), 0),
    [phrases]
  );

  return (
    <section
      data-nav-theme="light"
      className="w-full snap-start snap-always relative flex flex-col min-h-screen
        bg-brand-light
        px-2 md:px-12
        md:pt-20 pb-20 overflow-x-hidden"
    >
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="min-w-0 text-center sm:px-6">
          {/* TITLE */}
          <h1
            className="
              text-brand mt-16 font-alexandria leading-[1.1] tracking-tight
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
              className="animate-fade-up anim-slow
                block text-accent font-righteous
                text-[clamp(2.5rem,8vw,5rem)]
              "
            >
              Frontend Developer<span className="text-brand">.</span>
            </span>
          </h1>

          {/* SUBTEXT + QUOTE */}
          <p
            className="animate-fade-up anim-slow delay-100
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
            className="animate-fade-up anim-slow delay-200
              mt-4 max-w-[60ch] mx-auto italic text-brand/70
              text-[clamp(0.70rem,1.3vw,1.2rem)]
            "
          >
            “I&rsquo;m ready to grow, learn, and build something amazing.”
          </p>

          {/* CARDS DECK */}
          <div className="mt-16 animate-fade-up anim-slow delay-300">
            <HeroCardsDeck />
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
  image?: string; // still supports bg image
  icon?: string;  // Iconify icon name
};

function FeatureCard({ title, text, image, icon }: FeatureCardProps) {
  return (
    <div
      className="
        relative h-full overflow-hidden rounded-xl bg-white shadow-xl
        border border-brand-light mt-5
      "
    >
      {/* Bakgrundsbild (soft, under content) */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>
      )}

      {/* Content */}
      <div
        className="
          relative h-full
          px-5 py-4
          sm:px-6 sm:py-6
          lg:px-7 lg:py-7
          flex flex-col justify-between
          text-left
        "
      >
        {/* Titel – som innan */}
        <div>
          <h3
            className="
              text-[0.65rem] sm:text-xs md:text-sm font-semibold
              tracking-[0.18em]
              text-zinc-900
            "
          >
            {title}
          </h3>
          <div className="mt-2 h-[2px] w-7 sm:w-8 bg-accent" />
        </div>

        {/* Ikonen – centrerad på kortet */}
        <div className="flex justify-center my-4 sm:my-5">
          {icon && (
            <div className=" flex items-center justify-center">
              <Icon
                icon={icon}
                className="text-brand text-7xl"
              />
            </div>
          )}
        </div>

        {/* Beskrivning – under ikonen */}
        <p
          className="
            mt-2 sm:mt-3
            text-[0.7rem] sm:text-xs md:text-sm leading-relaxed
            text-brand
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}



/* --- HERO CARDS DECK / CAROUSEL --- */

const HERO_CARDS: FeatureCardProps[] = [
  {
    title: "DESIGN",
    image: "/cards/design.avif",
    icon: "ph:paint-brush-broad", // change icons if you want
    text: "I create clean, structured and visually balanced interfaces with a strong focus on detail, typography and spacing.",
  },
  {
    title: "UX",
    image: "/cards/ux.avif",
    icon: "streamline-ultimate:layout",
    text: "I craft intuitive user flows and interactions that make products feel natural, clear and enjoyable to use.",
  },
  {
    title: "CODE",
    image: "/cards/code.avif",
    icon: "ph:code",
    text: "I build fast, responsive and maintainable frontend architecture using modern frameworks and best practices.",
  },
];

function HeroCardsDeck() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % HERO_CARDS.length),
      7000
    );
    return () => window.clearInterval(id);
  }, []);

  const goNext = () => setActive((prev) => (prev + 1) % HERO_CARDS.length);
  const goPrev = () =>
    setActive((prev) => (prev - 1 + HERO_CARDS.length) % HERO_CARDS.length);

  const getPosition = (index: number) => {
    const total = HERO_CARDS.length;
    if (index === active) return "center";
    if (index === (active + 1) % total) return "right";
    if (index === (active - 1 + total) % total) return "left";
    return "hidden";
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    const threshold = 40; // px swipe threshold
    if (Math.abs(diff) > threshold) {
      if (diff < 0) {
        // swipe left → next
        goNext();
      } else {
        // swipe right → prev
        goPrev();
      }
    }

    touchStartX.current = null;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-5 md:gap-6 ">
      {/* Label so it's obvious it's interactive */}
      <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-brand/60">
        Explore my focus areas
      </span>

      {/* Deck wrapper – centered, swipe on mobile */}
      <div
        className="relative mx-auto w-full max-w-3xl h-[190px] sm:h-[210px] md:h-[230px] lg:h-[250px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {HERO_CARDS.map((card, index) => {
          const pos = getPosition(index);

          let translateX = "0%";
          let rotate = "0deg";
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;

          if (pos === "left") {
            translateX = "-22%";
            rotate = "-7deg";
            scale = 0.9;
            zIndex = 20;
            opacity = 0.9;
          } else if (pos === "right") {
            translateX = "22%";
            rotate = "7deg";
            scale = 0.9;
            zIndex = 20;
            opacity = 0.9;
          } else if (pos === "hidden") {
            translateX = "0%";
            rotate = "0deg";
            scale = 0.8;
            zIndex = 10;
            opacity = 0;
          }

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => setActive(index)}
              className={`
                absolute inset-0 mx-auto
                flex items-center justify-center
                transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                ${pos === "hidden" ? "pointer-events-none" : "cursor-pointer"}
              `}
              style={{
                transform: `translateX(${translateX}) scale(${scale}) rotate(${rotate})`,
                zIndex,
                opacity,
              }}
              aria-label={`${card.title} card`}
            >
              {/* Playing-card ratio: 63x88, just scaled down */}
              <div className="w-[62%] sm:w-[50%] md:w-[42%] lg:w-[36%] aspect-[63/88]">
                <FeatureCard {...card} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dots only */}
      <div className="flex flex-col items-center gap-3 mt-28 ">
        <div className="flex gap-2">
          {HERO_CARDS.map((card, i) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === active
                  ? "w-6 bg-accent"
                  : "w-2.5 bg-brand/30 hover:bg-brand/60"
              }`}
              aria-label={`Show ${card.title} card`}
            />
          ))}
        </div>

        {/* Hint text on larger displays */}
        <span className="hidden md:block text-[0.65rem] text-brand/60">
          Tap a card, swipe, or use the dots to browse.
        </span>
      </div>
    </div>
  );
}
