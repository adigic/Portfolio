"use client";


import React, { useEffect, useState } from "react";
import { ModalContext } from "./ModalContext";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import NavbarContactButton from "./NavbarContactButton";


const LINKS = [
  { href: "#about", label: "About", icon: "ph:user-circle-fill" },
  { href: "#background", label: "Background", icon: "ph:briefcase-fill" },
  { href: "#projects", label: "Projects", icon: "ph:squares-four-fill" },
  { href: "#contact", label: "Contact", icon: "mdi:email" },
] as const;

const MOBILE_HOME_LINK = {
  href: "/",
  label: "Home",
  icon: "ph:house-fill",
} as const;

export function Navbar() {
  const modalCtx = React.useContext(ModalContext);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light"); // beskriver SEKTIONEN
  const [scrolled, setScrolled] = useState(false);

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


  // Close menu and modal mutually exclusive
  const openMenu = () => {
    // If modal is open, close it
    if (modalCtx?.open) modalCtx.setOpen(false);
    setPanelOpen(true);
  };

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
  const baseLink = "font-poppins text-[12px] uppercase font-semibold tracking-[0.14em] border-b border-transparent transition-[color,border-color,opacity] duration-200 ease-out flex items-center justify-center h-[32px] px-5 text-center";
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

  const resolveHref = (href: string) => (pathname === "/" ? href : `/${href}`);


  return (
    <header className="fixed top-0 left-0 z-50 w-full inset-x-0 transition">
      {/* TOP RAD: brand + desktop-nav (desktop only, mobile has no top bar bg) */}
      <div
        className={`${topBgClass} mx-auto hidden items-center justify-between px-4 py-3 transition-[background-color,box-shadow] duration-300 md:flex md:px-6 md:py-4 ${scrolled ? "shadow-header" : ""}`}
      >
        {/* Brand (desktop) */}
        <Link
          href="/"
          className={`hidden md:flex font-alexandria text-2xl md:text-3xl font-semibold tracking-tight uppercase ${brandColorClass}`}
          onClick={() => closeMenu()}
        >
          ADIS HEGIC
        </Link>

        {/* Desktop-nav */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {/* Render all nav links except Contact */}
          {LINKS.filter(l => l.label !== "Contact").map((l) => (
            <Link
              key={l.href}
              href={resolveHref(l.href)}
              className={`${baseLink} ${linkIdle} rounded-xs`}
            >
              {l.label}
            </Link>
          ))}
          {/* Contact button as standalone */}
          <NavbarContactButton
            className={`ml-2 font-poppins text-[12px] uppercase font-semibold h-[32px] px-5 rounded-xs transition-colors duration-200 ease-out flex items-center justify-center text-center ${uiIsDark ? "bg-white hover:bg-white/80 border border-white/20" : "bg-brand hover:bg-brand/80 border border-brand/20"}`}
            textColorClass={uiIsDark ? "text-brand" : "text-white"}
          />
        </nav>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {panelOpen ? (
        <div
          className={`md:hidden fixed inset-0 z-40 flex h-[100dvh] w-full flex-col ${mobilePanelSurface} animate-fade-in`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="font-alexandria text-xl font-semibold uppercase tracking-tight text-white"
            >
              ADIS HEGIC
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors duration-200 ease-out hover:bg-white/10"
            >
              <Icon icon="ph:x-bold" width={24} height={24} />
            </button>
          </div>

          <nav className="flex flex-col px-4 pt-2">
            <ul className="flex select-none flex-col">
              <li>
                <Link
                  href={MOBILE_HOME_LINK.href}
                  onClick={handleHomeClick}
                  className={`group flex w-full items-center justify-between gap-3 px-4 py-5 font-poppins text-base font-semibold uppercase tracking-[0.18em] text-white transition-opacity duration-200 ease-out ${pathname === "/" && !hash ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
                >
                  <span>{MOBILE_HOME_LINK.label}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <Icon
                      icon="ph:arrow-right-bold"
                      width={20}
                      height={20}
                      className="text-white/75 transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-white group-active:translate-x-1 group-active:text-white"
                    />
                  </span>
                </Link>
              </li>
              {LINKS.map((l) => (
                <li key={l.href} className="border-t border-white/10">
                  {l.label === "Contact" ? (
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setTimeout(() => modalCtx?.setOpen(true), 250);
                      }}
                      className="group mt-3 flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm bg-white px-4 py-3 font-poppins text-base font-semibold uppercase tracking-[0.18em] text-brand transition-colors duration-200 ease-out hover:bg-white/90"
                    >
                      <span>{l.label}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Icon
                          icon="mdi:email"
                          width={20}
                          height={20}
                          className="text-brand"
                        />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={resolveHref(l.href)}
                      onClick={() => closeMenu()}
                      className="group flex w-full items-center justify-between gap-3 px-4 py-5 font-poppins text-base font-semibold uppercase tracking-[0.18em] text-white opacity-90 transition-opacity duration-200 ease-out hover:opacity-100"
                    >
                      <span>{l.label}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Icon
                          icon="ph:arrow-right-bold"
                          width={20}
                          height={20}
                          className="text-white/75 transition-[color,transform] duration-200 ease-out group-hover:translate-x-1 group-hover:text-white group-active:translate-x-1 group-active:text-white"
                        />
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 px-4 py-5">
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/in/adishegic/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
              >
                <Icon icon="simple-icons:linkedin" width={18} height={18} />
              </Link>
              <Link
                href="https://github.com/adigic"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
              >
                <Icon icon="simple-icons:github" width={18} height={18} />
              </Link>
            </div>
            <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
              Adis Hegic
            </span>
          </div>
        </div>
      ) : null}
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
