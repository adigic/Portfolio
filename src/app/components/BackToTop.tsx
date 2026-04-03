// src/components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";





export function BackToTop({ showAfter = 200 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false);
  // const [theme, setTheme] = useState<Theme>("light");

  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for menu open (body.overflow-hidden)
  useEffect(() => {
    const checkMenu = () => setMenuOpen(document.body.classList.contains("overflow-hidden"));
    checkMenu();
    window.addEventListener("resize", checkMenu);
    const obs = new MutationObserver(checkMenu);
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("resize", checkMenu);
      obs.disconnect();
    };
  }, []);

  // Show/hide after scrolling
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

  // Always use brand navy color and white border
  const themed = "bg-accent text-white  border-white hover:bg-accent/90";

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      className={[
        "fixed z-50 right-2 bottom-5 md:right-8 md:bottom-8",
        "h-9 w-9 rounded-sm grid place-items-center shadow-lg",
        "transition-all duration-300 cursor-pointer hover:opacity-100 opacity-30",
        themed,
        visible && !menuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <Icon icon="mdi:arrow-up-bold" className="h-4 w-4 text-white" />
    </button>
  );
}
