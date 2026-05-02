// app/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DownloadCV from "./DownloadCV";
import { Icon } from "@iconify/react";
import { FooterBackToTop } from "./FooterBackToTop";
import NavbarContactButton from "./NavbarContactButton";

export default function Footer() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <footer data-nav-theme="light" id="contact" className="fade-in-down border-t border-accent/10 bg-brand-light text-brand font-poppins">
      {/* Mobil: Ny layout */}
      <div className="block md:hidden w-full px-0 py-10">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-accent/10 ring-1 ring-accent/15">
            {!avatarError ? (
              <Image
                src="/me.jpg"
                alt="Adis Hegic"
                width={64}
                height={64}
                className="h-full w-full object-cover"
                onError={() => setAvatarError(true)}
                priority={false}
              />
            ) : (
              <span className="text-3xl font-bold text-accent">A</span>
            )}
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
          <div className="flex flex-row gap-4 mt-3 items-center">
            <Link href="https://www.linkedin.com/in/adishegic/" target="_blank" aria-label="LinkedIn" className="hover:opacity-80 transition-transform">
              <Icon icon="simple-icons:linkedin" width={28} height={28} className="text-accent" />
            </Link>
            <div className="flex flex-row items-center gap-2">
              <Link href="https://github.com/adigic" target="_blank" aria-label="GitHub" className="hover:opacity-80 transition-transform">
                <Icon icon="simple-icons:github" width={28} height={28} className="text-accent" />
              </Link>
              {/* FooterBackToTop knapp direkt bredvid GitHub på både mobil och desktop */}
              <span className="inline-flex">
                <FooterBackToTop />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop: nuvarande layout */}
      <div className="hidden md:flex mx-auto w-full px-0 py-10 flex-row items-center justify-between gap-6 px-4 md:px-12">
        {/* Vänster: Kontaktinfo och kontaktknapp */}
        <div className="flex flex-row items-center md:gap-5 md:w-auto ">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/10 ring-1 ring-accent/15 md:flex">
            {!avatarError ? (
              <Image
                src="/me.jpg"
                alt="Adis Hegic"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-lg font-bold text-accent">A</span>
            )}
          </div>
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
          <div className="flex flex-row items-center gap-2">
            <Link href="https://github.com/adigic" target="_blank" aria-label="GitHub" className="hover:opacity-80 transition-transform">
              <Icon icon="simple-icons:github" width={26} height={26} className="text-accent" />
            </Link>
            {/* FooterBackToTop knapp direkt bredvid GitHub även på desktop */}
            <span className="inline-flex">
              <FooterBackToTop />
            </span>
          </div>
          <span data-back-to-top-anchor="desktop" aria-hidden="true" className="hidden h-7 w-7 md:block" />
        </div>
      </div>
      <div className="relative w-full border-t border-accent/10  mx-auto">
        <span data-back-to-top-anchor="mobile" aria-hidden="true" className="pointer-events-none absolute -top-12 right-6 h-10 w-10 md:hidden" />
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
