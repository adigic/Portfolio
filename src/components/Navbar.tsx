"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

const LINKS = [
  { key: "education", href: "/#education" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "contact", href: "/#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const brand = useTranslations("brand");

  return (
    <header className="sticky top-0 backdrop-blur">
      <div className="flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-semibold text-2xl">
          {/* <span className="sr-only">Home</span> */}
          {brand("name")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {LINKS.map((item) => {
            
            const active = item.href !== "/" && pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-white",
                  active ? "text-white" : ""
                )}>
                {t(item.key)}
              </Link>
            );
          })}

<LanguageSwitcher/>
          
        </nav>

        {/* Mobile controls */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-lg cursor-pointer hover:text-brand-light"
          onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-[max-height,opacity] overflow-hidden bg-white/95 border-b border-zinc-200",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
        <nav className="container py-3 flex flex-col gap-2">
          <LanguageSwitcher />
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-zinc-800 hover:text-blue-600">
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
