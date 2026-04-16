// src/components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function BackToTop({ showAfter = 200 }: { showAfter?: number }) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dockedPosition, setDockedPosition] = useState<{ left: number; top: number } | null>(null);

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

  // Show/hide after scrolling + dock to footer anchors when visible
  useEffect(() => {
    const updateButtonState = () => {
      setVisible(window.scrollY > showAfter);

      const isMobile = window.innerWidth < 768;
      const anchor = document.querySelector<HTMLElement>(
        `[data-back-to-top-anchor="${isMobile ? "mobile" : "desktop"}"]`
      );
      const footer = document.querySelector<HTMLElement>("footer");

      if (!anchor || !footer) {
        setDockedPosition(null);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const isFooterVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
      const isAnchorVisible = anchorRect.top < window.innerHeight && anchorRect.bottom > 0;

      if (!isFooterVisible || !isAnchorVisible) {
        setDockedPosition(null);
        return;
      }

      const buttonSize = isMobile ? 40 : 28;
      const left = Math.min(
        Math.max(12, anchorRect.left + anchorRect.width / 2 - buttonSize / 2),
        window.innerWidth - buttonSize - 12
      );
      const top = Math.min(
        Math.max(12, anchorRect.top + anchorRect.height / 2 - buttonSize / 2),
        window.innerHeight - buttonSize - 12
      );

      setDockedPosition({ left, top });
    };

    updateButtonState();
    window.addEventListener("scroll", updateButtonState, { passive: true });
    window.addEventListener("resize", updateButtonState);

    return () => {
      window.removeEventListener("scroll", updateButtonState);
      window.removeEventListener("resize", updateButtonState);
    };
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
      style={dockedPosition ? { left: dockedPosition.left, top: dockedPosition.top } : undefined}
      className={[
        "fixed z-50 right-6 bottom-8 md:h-7 md:w-7 h-10 w-10 rounded-sm grid place-items-center shadow-lg",
        dockedPosition ? "md:right-auto md:bottom-auto" : "md:right-12 md:bottom-6",
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
