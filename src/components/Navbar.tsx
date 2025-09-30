"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";

type Theme = "light" | "dark";

const LINKS = [
  { key: "education", href: "/#education" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "contact", href: "/#contact" },
] as const;

/** Mobile-only flag that switches locale on tap */
function MobileLangToggle({ theme }: { theme: Theme }) {
  const locale = useLocale();                       // current locale
  const router = useRouter();
  const pathname = usePathname();

  const next = locale === "sv" ? "en" : "sv";       // target locale
  const flagSrc = next === "en" ? "/flags/gb.svg" : "/flags/se.svg";
  const label = next === "en" ? "Switch to English" : "Byt till svenska";



  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => router.replace({ pathname }, { locale: next })}
      className={cn(
        "md:hidden inline-flex items-center justify-center p-1.5 rounded-md ml-auto"
      )}
    >
      <Image
        src={flagSrc}
        alt={label}
        width={22}
        height={22}
        className=""
      />
    </button>
  );
}

export function Navbar({ theme = "light" }: { theme?: Theme }) {
  const t = useTranslations("nav");
  const brand = useTranslations("brand");

  // keep hash highlighting for desktop links
  const [hash, setHash] = useState<string>("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const isDark = theme === "dark";
  const baseLink = "transition-colors border-b-2 border-transparent pb-0.5";
  const linkIdle = isDark ? "text-white/80 hover:text-white" : "text-zinc-700 hover:text-zinc-900";
  const linkActive = isDark ? "text-white border-white/60" : "text-zinc-900 border-zinc-900/60";

  return (
    <header className="text-inherit">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand (hidden on mobile to keep it ultra-minimal there) */}
        <Link href="/" className="text-3xl hidden md:flex">
          {brand("name")}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-inherit ml-auto">
          {LINKS.map((item) => {
            const active = hash === item.href.replace("/", ""); // "#projects" etc.
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(baseLink, active ? linkActive : linkIdle, "text-lg")}
              >
                {t(item.key)}
              </Link>
            );
          })}

          {/* Desktop language switcher (keep as-is) */}
          <div className="text-inherit">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile: just a flag that toggles language */}
        <MobileLangToggle theme={theme} />
      </div>
    </header>
  );
}
