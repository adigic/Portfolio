// app/components/Footer.tsx
"use client";

import Link from "next/link";
import DownloadCV from "./DownloadCV";
import { Icon } from "@iconify/react";
import NavbarContactButton from "./NavbarContactButton";

export default function Footer() {
  return (
    <footer data-nav-theme="light" id="contact" className="fade-in-down border-t border-accent/10 bg-brand-light text-brand font-poppins">
      {/* Mobil: Ny layout */}
      <div className="block md:hidden w-full px-0 py-10">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-accent">A</span>
          </div>
          {/* Namn och titel */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-alexandria text-xl font-bold tracking-tight uppercase">Adis Hegic</span>
            <span className="text-sm font-medium text-brand/70">Software Engineer</span>
          </div>
          {/* Knappar */}
          <div className="flex flex-row gap-3 mt-2">
            <NavbarContactButton />
            <DownloadCV />
          </div>
          {/* Sociala ikoner */}
          <div className="flex flex-row gap-4 mt-3">
            <Link href="https://www.linkedin.com/in/adishegic/" target="_blank" aria-label="LinkedIn" className="hover:opacity-80 transition-transform">
              <Icon icon="simple-icons:linkedin" width={28} height={28} className="text-accent" />
            </Link>
            <Link href="https://github.com/adigic" target="_blank" aria-label="GitHub" className="hover:opacity-80 transition-transform">
              <Icon icon="simple-icons:github" width={28} height={28} className="text-accent" />
            </Link>
          </div>
        </div>
      </div>
      {/* Desktop: nuvarande layout */}
      <div className="hidden md:flex mx-auto w-full px-0 py-10 flex-row items-center justify-between gap-6 px-4 md:px-12">
        {/* Vänster: Kontaktinfo och kontaktknapp */}
        <div className="flex flex-row items-center md:gap-8 md:w-auto ">
          <span className="font-alexandria text-lg font-bold tracking-tight uppercase">Adis Hegic</span>
          <span className="hidden md:inline-block text-brand/40">|</span>
          <span className="text-sm font-medium text-brand/70 flex items-center h-full">Software Engineer</span>
          <span className="hidden md:inline-block text-brand/40">|</span>
          <div className="flex gap-2 items-center">
            <NavbarContactButton className="mb-1 md:mb-0" />
          </div>
        </div>
        {/* Höger: Sociala ikoner */}
        <div className="flex flex-row items-center justify-end gap-4 w-auto">
          <Link href="https://www.linkedin.com/in/adishegic/" target="_blank" aria-label="LinkedIn" className="hover:opacity-80 transition-transform">
            <Icon icon="simple-icons:linkedin" width={26} height={26} className="text-accent" />
          </Link>
          <Link href="https://github.com/adigic" target="_blank" aria-label="GitHub" className="hover:opacity-80 transition-transform">
            <Icon icon="simple-icons:github" width={26} height={26} className="text-accent" />
          </Link>
        </div>
      </div>
      <div className="w-full border-t border-accent/10  mx-auto">
        <div className="mx-auto flex items-center justify-between px-6 md:px-10 py-4 text-xs text-brand/50 font-jura tracking-wide">
          <Link href="/integritypolicy" className="text-xs text-brand/50 hover:text-accent underline underline-offset-2 ">Integritetspolicy</Link>
          <div className="w-auto">
            © 2025 <Link href="https://www.digitalsolutions.adigic.se/" target="_blank" className="font-semibold text-brand/60 hover:text-accent transition-colors">ADIGIC Digital Solutions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
