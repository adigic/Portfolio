"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

const PHRASES = [
  "AI-enhanced",
  "UX/UI-driven",
  "Frontend-focused",
] as const;

const heroContainerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

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
      id="top"
      data-nav-theme="light"
      className="relative flex min-h-svh w-full flex-col justify-center
        bg-brand-light
        overflow-x-hidden px-4 pt-20 pb-12 md:px-12 md:pt-24 md:pb-10"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute left-[8%] top-[15%] h-44 w-44 rounded-full bg-accent/10 blur-3xl md:h-56 md:w-56"
          animate={{ y: [0, -14, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[16%] right-[10%] h-52 w-52 rounded-full bg-brand/8 blur-3xl md:h-64 md:w-64"
          animate={{ y: [0, 16, 0], x: [0, -10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-x-0  z-10 flex justify-center px-4 top-10 md:top-22 md:right-1 md:justify-end"
        initial={{ opacity: 0, y: -14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-flex items-center gap-2 border border-brand/10 bg-white/85 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-brand shadow-[0_10px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-3.5 sm:text-[0.62rem] md:text-[0.66rem]"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.82, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          Open to development opportunities
        </motion.span>
      </motion.div>

      <div className="flex w-full flex-1 items-center justify-center">
        <motion.div
          className="relative min-w-0 max-w-6xl text-center sm:px-6"
          initial="hidden"
          animate="visible"
          variants={heroContainerVariants}
        >
          <motion.h1
            variants={heroItemVariants}
            className="
              mt-8 text-brand font-alexandria leading-[1.06] tracking-tight
              text-[clamp(2.2rem,4.7vw,3.45rem)]
            "
          >
            <span
              className="
                block font-light
                text-[clamp(1.75rem,4.7vw,2.8rem)]
              "
              style={{ minWidth: `${longestCh}ch` }}
            >
              <TypewriterText phrases={phrases} typeSpeed={40} holdTime={6000} />
            </span>

            <span
              className="block text-accent font-righteous
                text-[clamp(2.5rem,7vw,4.5rem)]
              "
            >
              Software Engineer<span className="text-brand">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="
              mt-5 max-w-4xl mx-auto text-brand
              text-[clamp(0.9rem,1.45vw,1.35rem)]
              leading-[1.4]
            "
          >
            Software engineer with a frontend focus, building modern digital experiences with clarity, structure and thoughtful execution.
          </motion.p>

          <motion.p
            variants={heroItemVariants}
            className="
              mt-3 max-w-[56ch] mx-auto italic text-brand/70
              text-[clamp(0.8rem,1vw,1rem)]
            "
          >
            “Clear thinking, clean execution, and digital experiences built to feel intuitive.”
          </motion.p>

{/*           <motion.div
            variants={heroItemVariants}
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-brand/65 sm:text-[0.72rem]"
          >
            <span className="border border-brand/10 bg-white/55 px-3 py-2 backdrop-blur-sm">React</span>
            <span className="border border-brand/10 bg-white/55 px-3 py-2 backdrop-blur-sm">Next.js</span>
            <span className="border border-brand/10 bg-white/55 px-3 py-2 backdrop-blur-sm">TypeScript</span>
          </motion.div> */}

          <motion.div className="mt-10 md:mt-12" variants={heroItemVariants}>
            <HeroCardsDeck />
          </motion.div>
        </motion.div>
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
        relative mt-5 h-full overflow-hidden rounded-xl border border-brand-light/70 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.1)]
        transition-[box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand/20 hover:shadow-[0_24px_55px_rgba(0,0,0,0.14)]
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
            <div className="flex items-center justify-center">
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
    icon: "streamline-freehand:design-tool-quill",
    text: "Elegant, balanced and modern design with a strong focus on feel, typography and visual hierarchy. Always pixel-perfect.",
  },
  {
    title: "UX",
    image: "/cards/ux.avif",
    icon: "streamline-ultimate:layout-bold",
    text: "Experiences that feel natural, intuitive and engaging. Flows and interactions that build trust and delight.",
  },
  {
    title: "CODE",
    image: "/cards/code.avif",
    icon: "ant-design:code-filled",
    text: "Fast, robust and future-ready frontend built with a modern stack. Code that is easy to maintain and scales cleanly.",
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
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6">


      {/* Compact mobile card */}
      <div className="w-full hidden">
        <motion.button
          key={HERO_CARDS[active]?.title}
          type="button"
          onClick={goNext}
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group mx-auto block w-full max-w-[270px]"
          aria-label={`${HERO_CARDS[active]?.title} card`}
        >
          <div className="aspect-[62/80]">
            <FeatureCard {...HERO_CARDS[active]} />
          </div>
        </motion.button>
      </div>

      {/* Deck wrapper – centered, swipe on tablet/desktop */}
      <div
        className="relative mx-auto mt-10 md:my-10 h-[210px] w-full max-w-3xl sm:block md:h-[230px] lg:h-[250px]"
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
                group absolute inset-0 mx-auto
                flex items-center justify-center
                transition-[transform,opacity] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                ${pos === "hidden" ? "pointer-events-none" : "cursor-pointer"}
              `}
              style={{
                transform: `translateX(${translateX}) scale(${scale}) rotate(${rotate})`,
                zIndex,
                opacity,
              }}
              aria-label={`${card.title} card`}
            >
              <div className="w-[50%] md:w-[42%] lg:w-[36%] aspect-[63/88]">
                <FeatureCard {...card} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dots only */}
      <div className="mt-20 flex flex-col items-center gap-3 md:mt-16">
        <div className="flex gap-2">
          {HERO_CARDS.map((card, i) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-[width,background-color,opacity] duration-220 ease-out cursor-pointer ${
                i === active
                  ? "w-6 bg-accent"
                  : "w-2.5 bg-brand/30 hover:bg-brand/60"
              }`}
              aria-label={`Show ${card.title} card`}
            />
          ))}
        </div>

        {/* Hint text on larger displays */}
        <span className=" text-[0.65rem] text-brand/60">
          Tap a card, swipe, or use the dots to browse.
        </span>
      </div>
    </div>
  );
}
