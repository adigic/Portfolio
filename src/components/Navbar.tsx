// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

type Theme = "light" | "dark";

const LINKS = [
  { key: "education", href: "/#education" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar({ theme = "light" }: { theme?: Theme }) {
  const t = useTranslations("nav");
  const brand = useTranslations("brand");

  const [open, setOpen] = useState(false);

  // (valfritt) spåra hash för aktiv länk
  const [hash, setHash] = useState<string>("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const isDark = theme === "dark";
  const baseLink =
    "text-sm transition-colors border-b-2 border-transparent pb-0.5";
  const linkIdle = isDark ? "text-white/80 hover:text-white" : "text-zinc-700 hover:text-zinc-900";
  const linkActive = isDark ? "text-white border-white/60" : "text-zinc-900 border-zinc-900/60";

  return (
    <header className="mt-2 text-inherit">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="text-3xl hidden md:flex">
          {brand("name")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-inherit">
          {LINKS.map((item) => {
            const active = hash === item.href.replace("/",""); // "#projects" etc.
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(baseLink, active ? linkActive : linkIdle, "")}

              >
                {t(item.key)}
              </Link>
            );
          })}

          {/* språkväljaren ska ärva färg */}
          <div className="text-inherit">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile controls */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "md:hidden p-2 rounded-lg cursor-pointer ml-auto"
          )}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-[max-height,opacity] overflow-hidden  w-full",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="w-full b py-3 flex flex-col gap-2 bg-brand-dark/5">
          <div className="text-inherit mb-1">
            <LanguageSwitcher />
          </div>
          {LINKS.map((item) => {
            const active = hash === item.href.replace("/","");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-4 text-sm border w-full",
                  active
                    ? isDark ? "text-white" : "text-zinc-900"
                    : isDark ? "text-white/80 hover:text-white" : "text-zinc-700 hover:text-zinc-900"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
