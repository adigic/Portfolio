"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const LINKS = [
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact Me" },
] as const;

export function Navbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light");
  const ulRef = useRef<HTMLUListElement | null>(null);

  const isDark = navTheme === "dark";

  // hash för active-link styling på desktop
  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Lås body-scroll när menyn är öppen
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", panelOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [panelOpen]);

  // Lyssna på vilken sektion som är i view (via data-nav-theme)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        // Ta den som syns mest
        const topMost = visible.reduce((prev, curr) =>
          prev.intersectionRatio > curr.intersectionRatio ? prev : curr
        );

        const themeAttr = topMost.target.getAttribute("data-nav-theme");
        if (themeAttr === "dark" || themeAttr === "light") {
          setNavTheme(themeAttr);
        }
      },
      {
        threshold: 0.5, // minst 50% inne i viewport
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const openMenu = () => {
    setPanelOpen(true);
    requestAnimationFrame(() => setItemsVisible(true));
  };

  const closeMenu = () => {
    setItemsVisible(false);
  };

  const toggleMenu = () => {
    if (panelOpen) closeMenu();
    else openMenu();
  };

  // när länkarna har fadat ut → stäng panelen
  const onItemsTransitionEnd = (
    e: React.TransitionEvent<HTMLUListElement>
  ) => {
    if (e.propertyName !== "opacity") return;
    if (!itemsVisible) {
      setPanelOpen(false);
    }
  };

  const baseLink = "text-sm border-b border-transparent ";
  const linkIdle = isDark
    ? "text-white hover:border-white/80"
    : "text-brand hover:border-brand";
  const linkActive = isDark
    ? "text-white border-b border-white"
    : "text-brand border-b border-brand";

  const brandColorClass = isDark ? "text-white" : "text-brand";
  const bgClass = isDark ? "bg-brand" : "bg-brand-light";
  const iconColorClass = isDark ? "text-white" : "text-brand";

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 inset-x-0 transition">
      {/* TOP RAD: brand + desktop-nav + hamburger */}
      <div
        className={`${bgClass} flex items-center justify-between px-4 py-3 md:px-6 md:py-4 mx-auto`}
      >
        {/* Brand */}
        <Link
          href="/"
          className={`text-2xl sm:text-3xl tracking-tight ${brandColorClass}`}
          onClick={() => closeMenu()}
        >
          Adis Hegic
        </Link>

        {/* Desktop-nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto font-medium">
          {LINKS.map((l) => {
            const isActive = hash === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${baseLink} ${
                  isActive ? linkActive : linkIdle
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* LinkedIn-icon */}
          <Link
            href="https://www.linkedin.com/in/DITT-LINKEDIN-HÄR"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={iconColorClass}
          >
            <Icon icon="simple-icons:linkedin" width={20} height={20} />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={panelOpen}
            className={`
              flex flex-col justify-center items-center w-10 h-10 gap-1
              transition cursor-pointer
              ${iconColorClass}
            `}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                panelOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                panelOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                panelOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN-PANEL (under navbaren) */}
      <div
        className={[
          "md:hidden absolute inset-x-0 top-full z-40",
          "transform-gpu will-change-transform origin-top transition-transform duration-300 ease-out",
          panelOpen ? "scale-y-100" : "scale-y-0",
          panelOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        style={{ transformOrigin: "top" }}
      >
        <div className="bg-brand shadow-xl overflow-hidden">
          <ul
            ref={ulRef}
            onTransitionEnd={onItemsTransitionEnd}
            className={[
              "flex flex-col text-white text-lg select-none border-b",
              "transition-opacity duration-200 ease-out",
              itemsVisible ? "opacity-100" : "opacity-0",
              itemsVisible ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => closeMenu()}
                  className="block w-full text-left py-3 px-6 hover:bg-white/5 hover:opacity-100 opacity-90 transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
