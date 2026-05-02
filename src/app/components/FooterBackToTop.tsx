"use client";
import { Icon } from "@iconify/react";

export function FooterBackToTop({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const scrollTop = () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      className={[
        "inline-flex items-center justify-center h-7 w-7 rounded-sm bg-accent text-white cursor-pointer border border-accent hover:opacity-80 transition-transform transition-colors duration-200 ml-1",
        hideOnMobile ? "md:inline-flex hidden" : ""
      ].join(" ")}
    >
      <Icon icon="mdi:arrow-up-bold" className="h-4 w-4" />
    </button>
  );
}
