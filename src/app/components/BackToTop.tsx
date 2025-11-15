// src/components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

type Theme = "light" | "dark";

export function BackToTop({ showAfter = 200 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Show/hide after scrolling
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  // Detect current section theme
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme]"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = (top?.target.getAttribute("data-theme") as Theme) || "light";
        setTheme((prev) => (prev === next ? prev : next));
      },
      { root: null, threshold: [0.55] }
    );

    sections.forEach((s) => io.observe(s));

    // Initial: check what's around viewport center
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    const sec = el?.closest("section[data-theme]") as HTMLElement | null;
    const initial = (sec?.getAttribute("data-theme") as Theme) || "light";
    setTheme(initial);

    return () => io.disconnect();
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

  // Styles: white on dark sections, dark on light sections
  const themed =
    theme === "dark"
      ? "bg-brand-light text-zinc-900  hover:bg-brand-light/95"
      : "bg-brand-dark text-white  hover:bg-black";

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      className={[
        "fixed z-50 right-5 bottom-5 md:right-8 md:bottom-8",
        "h-11 w-11 rounded-full grid place-items-center shadow-lg",
        "transition-all duration-300 cursor-pointer hover:opacity-80",
        themed,
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
