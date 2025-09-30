// src/components/FullSection.tsx
"use client";

import { ChevronDown } from "lucide-react";

type Props = {
  id?: string;
  variant?: "light" | "dark";
  align?: "center" | "top";
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  showChevron?: boolean;
};

export function FullSection({
  id,
  variant = "light",
  align = "center",
  className = "",
  innerClassName = "",
  children,
  showChevron = true
}: Props) {
  const vAlign = align === "top" ? "justify-start" : "justify-center";
  const theme = variant === "dark" ? "bg-brand-dark text-white" : "bg-brand-light text-zinc-900";

  return (
    <section
      id={id}
      data-theme={variant}
      className={[
        "relative w-full",
        // 👇 Small screens: allow growth; md+: exact viewport
        "h-auto min-h-[100svh] md:h-[100dvh]",
        "overflow-x-clip pt-px",
        theme,
        className
      ].join(" ")}
    >
      <div
        className={[
          "max-w-7xl mx-auto w-full h-full px-6 py-5 md:py-10",
          "flex flex-col", vAlign,
          innerClassName
        ].join(" ")}
      >
        {children}
      </div>

      {showChevron && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
                const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";
                const sec = document.getElementById(id || "")?.closest("section") as HTMLElement | null;
                let next = sec?.nextElementSibling as HTMLElement | null;
                while (next && next.tagName !== "SECTION") next = next.nextElementSibling as HTMLElement | null;
                if (next) next.scrollIntoView({ behavior, block: "start" });
              }}
              aria-label="Scroll to next section"
              className="pointer-events-auto rounded-full p-2 text-current/80 hover:text-current"
              style={{ animation: "floatY 1.6s ease-in-out infinite" }}
            >
              <ChevronDown className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>
    </section>
  );
}
