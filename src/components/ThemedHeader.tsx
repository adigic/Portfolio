// src/components/ThemedHeader.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";

export function ThemedHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById("scrollRoot");
    const scope: ParentNode | Document = root ?? document;
    const sections = Array.from(scope.querySelectorAll<HTMLElement>("section[data-theme]"));
    if (!sections.length) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;
    const mkObserver = (h: number) =>
      new IntersectionObserver(
        (entries) => {
          const top = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          const t = top?.target.getAttribute("data-theme");
          if (t === "light" || t === "dark") setTheme((prev) => (prev === t ? prev : t));
        },
        { root: root ?? null, rootMargin: `-${h}px 0px 0px 0px`, threshold: [0.25, 0.5, 0.75] }
      );

    let obs = mkObserver(headerH);
    sections.forEach((s) => obs.observe(s));

    const onResize = () => {
      obs.disconnect();
      obs = mkObserver(headerRef.current?.offsetHeight ?? 0);
      sections.forEach((s) => obs.observe(s));
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const headerClass =
    theme === "dark"
      ? "bg-brand-dark text-brand-light"
      : "bg-brand-light text-brand-dark";

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      className={`sticky top-0 z-50 transition-colors duration-300 ${headerClass}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 👇 skicka temat */}
        <Navbar theme={theme} />
      </div>
    </header>
  );
}
