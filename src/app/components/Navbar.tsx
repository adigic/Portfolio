"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const LINKS = [
  { href: "#about", label: "About", icon: "solar:user-rounded-bold-duotone" },
  { href: "#background", label: "Background", icon: "solar:documents-bold-duotone" },
  { href: "#projects", label: "Projects", icon: "solar:widget-5-bold-duotone" },
  { href: "#contact", label: "Contact Me", icon: "solar:chat-round-dots-bold-duotone" },
] as const;

export function Navbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light"); // beskriver SEKTIONEN
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // uiIsDark = hur NAV:en ska se ut (reverserat mot sektionen)
  // sektion dark  => uiIsDark = false (ljus navbar)
  // sektion light => uiIsDark = true  (mörk navbar)
  const uiIsDark = navTheme === "light";

  // hash för active-link styling på desktop
  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

        const topMost = visible.reduce((prev, curr) =>
          prev.intersectionRatio > curr.intersectionRatio ? prev : curr
        );

        const themeAttr = topMost.target.getAttribute("data-nav-theme");
        if (themeAttr === "dark" || themeAttr === "light") {
          setNavTheme(themeAttr);
        }
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const openMenu = () => setPanelOpen(true);

  const closeMenu = () => setPanelOpen(false);

  const toggleMenu = () => {
    if (panelOpen) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    if (!panelOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panelOpen]);

  // Färglogik baserat på UI-tema (reversed)
  const baseLink = "border-b border-transparent text-[11px] font-semibold uppercase tracking-[0.16em] transition-[color,border-color,opacity] duration-200 ease-out";
  const linkIdle = uiIsDark
    ? "text-white hover:border-white/80"
    : "text-brand hover:border-brand";
  const linkActive = uiIsDark
    ? "text-white border-b border-white"
    : "text-brand border-b border-brand";

  const brandColorClass = uiIsDark ? "text-white" : "text-brand";
  const topBgClass = uiIsDark ? "bg-brand" : "bg-brand-light";
  const iconColorClass = uiIsDark ? "text-white" : "text-brand";

  const mobilePanelSurface = uiIsDark
    ? "bg-brand text-white border-white/10"
    : "bg-brand-light text-brand border-brand/10";
  const mobileOverlay = uiIsDark ? "bg-black/35" : "bg-brand/12";

  const hamburgerBg = uiIsDark ? "bg-brand" : "bg-brand-light";
  const hamburgerBorder = uiIsDark
    ? ""
    : "";

  // ✨ NYTT: separata hover + border för mobilen
  const mobileLinkHoverBg = uiIsDark ? "hover:bg-white/5" : "hover:bg-brand/10";


  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full inset-x-0 transition">
      {/* TOP RAD: brand + desktop-nav + hamburger */}
      <div
        className={`${topBgClass} mx-auto flex items-center justify-between px-4 py-3 transition-[background-color,box-shadow] duration-300 md:px-6 md:py-4 ${scrolled ? "shadow-[0_10px_35px_rgba(0,0,0,0.08)]" : ""}`}
      >
        {/* Brand (desktop) */}
        <Link
          href="/"
          className={`hidden md:flex text-[1.9rem] tracking-tight ${brandColorClass}`}
          onClick={() => closeMenu()}
        >
          Adis Hegic
        </Link>

        {/* Desktop-nav */}
        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = hash === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${baseLink} ${isActive ? linkActive : linkIdle}`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* LinkedIn-icon */}
          <Link
            href="https://www.linkedin.com/in/adishegic/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={`${iconColorClass} transition-[transform,opacity] duration-200 ease-out hover:translate-y-[-1px] hover:opacity-70`}
          >
            <Icon icon="simple-icons:linkedin" width={20} height={20} />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div
          className={`
            md:hidden
            ${hamburgerBg} ${hamburgerBorder}
            rounded-sm absolute top-2 right-2 
          `}
        >
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
              className={`block h-0.5 w-6 bg-current transition-transform duration-200 ease-out ${
                panelOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ease-out ${
                panelOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-200 ease-out ${
                panelOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE SIDE PANEL */}
      <div
        className={[
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-out",
          panelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!panelOpen}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={closeMenu}
          className={`absolute inset-0 ${mobileOverlay}`}
        />

        <div
          ref={panelRef}
          className={[
            `absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col border-l ${mobilePanelSurface} shadow-[0_24px_60px_rgba(0,0,0,0.24)]`,
            "transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            panelOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-current/10 px-5 py-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-55">
              Menu
            </p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-current/12 transition-colors duration-200 ease-out hover:bg-black/5"
            >
              <Icon icon="solar:close-circle-bold-duotone" width={22} height={22} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4">
            <ul className="flex flex-col gap-1 select-none">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => closeMenu()}
                    className={[
                      `flex items-center gap-3 rounded-sm px-4 py-3.5 text-left transition-[background-color,transform,opacity] duration-200 ease-out ${mobileLinkHoverBg}`,
                      hash === l.href ? "opacity-100" : "opacity-90 hover:opacity-100",
                    ].join(" ")}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-current/10 bg-white/5">
                      <Icon icon={l.icon} width={20} height={20} />
                    </span>
                    <span className="text-[0.95rem] font-semibold tracking-[0.04em]">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-current/10 px-4 py-4">
            <Link
              href="https://www.linkedin.com/in/adishegic/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className={[
                `flex items-center gap-3 rounded-sm px-4 py-3.5 transition-[background-color,transform,opacity] duration-200 ease-out ${mobileLinkHoverBg}`,
                "opacity-90 hover:opacity-100",
              ].join(" ")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-current/10 bg-white/5">
                <Icon icon="simple-icons:linkedin" width={18} height={18} />
              </span>
              <span className="text-[0.95rem] font-semibold tracking-[0.04em]">
                LinkedIn
              </span>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
