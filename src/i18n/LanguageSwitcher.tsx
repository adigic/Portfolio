// src/components/i18n/LanguageMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type LocaleOption = {
  code: "en" | "sv";
  label: string;
  flagSrc: string;
};

const LOCALES: LocaleOption[] = [
  { code: "en", label: "English", flagSrc: "/flags/gb.svg" },
  { code: "sv", label: "Svenska", flagSrc: "/flags/se.svg" },
];

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Zm0 0c3.314 0 6-4.03 6-9S15.314 3 12 3 6 7.03 6 12s2.686 9 6 9Zm-9-9h18M12 3v18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const switchTo = (code: LocaleOption["code"]) => {
    setOpen(false);
    if (code === locale) return;
    router.replace({ pathname }, { locale: code });
  };

  return (
    <div className="relative">
      {/* Globe button only */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className="cursor-pointer inline-flex items-center justify-center text-zinc-900"
      >
        <GlobeIcon className="w-5 h-5 hover:text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Select language"
          className="absolute right-0 mt-2 w-40 rounded-xl border bg-white shadow-lg ring-1 ring-black/5 p-1 z-50"
        >
          {LOCALES.map(opt => {
            const active = opt.code === locale;
            return (
              <button
                key={opt.code}
                role="menuitem"
                onClick={() => switchTo(opt.code)}
                className={`cursor-pointer flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-zinc-100 ${
                  active ? "text-zinc-900 font-semibold" : "text-zinc-700"
                }`}
              >
                <Image
                  src={opt.flagSrc}
                  alt={`${opt.label} flag`}
                  width={16}
                  height={16}
                  className="rounded-[2px]"
                />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
