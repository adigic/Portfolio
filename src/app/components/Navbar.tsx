"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import NavbarContactButton from "./NavbarContactButton";

const LINKS = [
  { href: "#about", label: "About", icon: "ph:user-circle-fill" },
  { href: "#background", label: "Background", icon: "ph:stack-fill" },
  { href: "#projects", label: "Projects", icon: "ph:rocket-fill" },
  { href: "#contact", label: "Contact Me", icon: "ph:chat-circle-dots-fill" },
] as const;

const MOBILE_HOME_LINK = {
  href: "/",
  label: "Home",
  icon: "ph:house-fill",
} as const;

export function Navbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light"); // beskriver SEKTIONEN
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalQueued, setIsContactModalQueued] = useState(false);

  // När menyn stängs och modal är köad, öppna modal efter delay (animationen hinner klart)
  useEffect(() => {
    if (!panelOpen && isContactModalQueued) {
      const timeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          const evt = new CustomEvent('openContactModal');
          window.dispatchEvent(evt);
        }
        setIsContactModalQueued(false);
      }, 250); // matcha transition duration
      return () => clearTimeout(timeout);
    }
  }, [panelOpen, isContactModalQueued]);
  const pathname = usePathname();

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

  const handleHomeClick = () => {
    closeMenu();

    if (pathname === "/") {
      window.history.replaceState(null, "", "/");
      setHash("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
  const baseLink = "font-poppins text-[12px] uppercase font-semibold tracking-[0.16em] border-b border-transparent transition-[color,border-color,opacity] duration-200 ease-out flex items-center justify-center h-[32px] px-5 text-center";
  const linkIdle = uiIsDark
    ? "text-white hover:bg-white/10 hover:border-white/80"
    : "text-brand hover:bg-brand/10 hover:border-brand";

  const brandColorClass = uiIsDark ? "text-white" : "text-brand";
  const topBgClass = uiIsDark ? "bg-brand" : "bg-brand-light";
  const iconColorClass = uiIsDark ? "text-white" : "text-brand";

  // Mobile menu always dark mode
  const mobilePanelSurface = "bg-brand text-white border-white/10";

  const hamburgerBg = uiIsDark ? "bg-brand" : "bg-brand-light";
  const hamburgerBorder = uiIsDark
    ? ""
    : "";

  // ✨ NYTT: separata hover + border för mobilen
  const mobileLinkHoverBg = uiIsDark ? "hover:bg-white/5" : "hover:bg-brand/10";

  const resolveHref = (href: string) => (pathname === "/" ? href : `/${href}`);


  return (
    <header className="fixed top-0 left-0 z-50 w-full inset-x-0 transition">
      {/* TOP RAD: brand + desktop-nav */}
      <div
        className={`${topBgClass} mx-auto flex items-center justify-between px-4 py-3 transition-[background-color,box-shadow] duration-300 md:px-6 md:py-4 ${scrolled ? "shadow-[0_10px_35px_rgba(0,0,0,0.08)]" : ""}`}
      >
        {/* Brand (desktop) */}
        <Link
          href="/"
          className={`hidden md:flex font-alexandria text-2xl md:text-3xl font-extrabold tracking-tight uppercase ${brandColorClass}`}
          onClick={() => closeMenu()}
        >
          ADIS HEGIC
        </Link>

        {/* Desktop-nav */}
        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {LINKS.map((l) => {
            if (l.label === "Contact Me") {
              const btnClass = uiIsDark
                ? "bg-white hover:bg-white/80 border border-white/20"
                : "bg-brand hover:bg-brand/80 border border-brand/20";
              const textColorClass = uiIsDark ? "text-brand" : "text-white";
              return (
                <NavbarContactButton
                  key={l.href}
                  className={`font-poppins text-[12px] uppercase font-semibold tracking-[0.16em] h-[32px] px-5 rounded-xs transition-colors duration-200 ease-out flex items-center justify-center text-center ${btnClass}`}
                  textColorClass={textColorClass}
                />
              );
            }
            return (
              <Link
                key={l.href}
                href={resolveHref(l.href)}
                className={`${baseLink} ${linkIdle} rounded-xs`}
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
            className={`flex items-center ${iconColorClass} transition-opacity duration-200 ease-out hover:opacity-70 pl-2`}
          >
            <Icon icon="simple-icons:linkedin" width={24} height={24} style={{border: 'none'}} />
          </Link>
        </nav>
      </div>

      {/* MOBILE DROPDOWN PANEL (expands from top) + overlay */}
      {panelOpen && (
        <>
          {/* Overlay under menyn */}
          <button
            type="button"
            aria-label="Stäng meny"
            className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm cursor-pointer"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={closeMenu}
            tabIndex={-1}
          />
          {/* Meny ovanpå overlay */}
          <div
            className={`md:hidden fixed left-0 top-0 w-full z-50 transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden max-h-[500px] opacity-100 ${mobilePanelSurface}`}
            style={{boxShadow: '0 10px 35px rgba(0,0,0,0.08)'}}
            aria-hidden={false}
          >
            <nav className="px-4 pb-4 pt-2">
              <ul className="flex flex-col gap-3 select-none text-right">
                <li>
                  <Link
                    href={MOBILE_HOME_LINK.href}
                    onClick={handleHomeClick}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 font-poppins text-[13px] uppercase font-semibold tracking-[0.16em] text-right transition-[background-color,transform,opacity] duration-200 ease-out text-white ${mobileLinkHoverBg} ${pathname === "/" && !hash ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded">
                      <Icon icon={MOBILE_HOME_LINK.icon.replace('-fill', '-fill')} width={22} height={22} color="#fff" />
                    </span>
                    <span className="flex-1">{MOBILE_HOME_LINK.label}</span>
                  </Link>
                </li>
                {LINKS.filter(l => l.label !== "Contact Me").map((l) => (
                  <li key={l.href}>
                    <Link
                      href={resolveHref(l.href)}
                      onClick={() => closeMenu()}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 font-poppins text-[13px] uppercase font-semibold tracking-[0.16em] text-right transition-[background-color,transform,opacity] duration-200 ease-out text-white ${mobileLinkHoverBg} opacity-90 hover:opacity-100`}
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded">
                        <Icon icon={l.icon.replace('-fill', '-fill')} width={22} height={22} color="#fff" />
                      </span>
                      <span className="flex-1">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-current/10 px-4 py-5 flex flex-row gap-3">
              <Link
                href="https://www.linkedin.com/in/adishegic/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-poppins text-[13px] uppercase font-semibold tracking-[0.16em] text-brand bg-white border border-white/20 transition-colors duration-200 ease-out hover:bg-white/90 text-right justify-center"
                style={{ height: 48, width: '50%' }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/5">
                  <Icon icon="simple-icons:linkedin" width={22} height={22} style={{border: 'none'}} />
                </span>
                <span className="flex-1">LinkedIn</span>
              </Link>
              <button
                type="button"
                aria-label="Contact Me"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-poppins text-[13px] uppercase font-semibold tracking-[0.16em] text-brand bg-white border border-white/20 transition-colors duration-200 ease-out hover:bg-white/90 text-right justify-center cursor-pointer"
                style={{ height: 48, width: '50%' }}
                onClick={() => {
                  closeMenu();
                  setIsContactModalQueued(true);
                }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/5">
                  <Icon icon="ph:chat-circle-dots-fill" width={22} height={22} style={{border: 'none'}} />
                </span>
                <span className="flex-1">Contact</span>
              </button>
            </div>
          </div>
        </>
      )}
      {/* MOBILE HAMBURGER BUTTON (when menu is closed) */}
      {!panelOpen && (
        <div
          className={`md:hidden fixed top-2 right-2 z-50 ${hamburgerBg} ${hamburgerBorder} rounded-sm transition-all duration-500`}
        >
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open menu"
            aria-expanded={panelOpen}
            className={`flex flex-col justify-center items-center w-10 h-10 gap-1 transition cursor-pointer ${iconColorClass}`}
          >
            <span className="block h-0.5 w-6 bg-current transition-transform duration-200 ease-out" />
            <span className="block h-0.5 w-6 bg-current transition-opacity duration-200 ease-out" />
            <span className="block h-0.5 w-6 bg-current transition-transform duration-200 ease-out" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
