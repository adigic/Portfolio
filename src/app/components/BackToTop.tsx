// src/components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";





export function BackToTop({ showAfter = 200 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false);
  // const [theme, setTheme] = useState<Theme>("light");
  const [footerVisible, setFooterVisible] = useState(false);
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

  // Theme detection removed (theme not used)

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

  // Always use brand navy color and white border
  const themed = "bg-brand text-white border-2 border-white hover:bg-brand/90";

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollTop}
      className={[
        "fixed z-50 right-5 bottom-5 md:right-8 md:bottom-8",
        "h-11 w-11 rounded-full grid place-items-center shadow-lg border-2",
        "transition-all duration-300 cursor-pointer hover:opacity-80",
        themed,
        visible && !footerVisible && !menuOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ChevronUp className="h-5 w-5 text-white" />
    </button>
  );
}
