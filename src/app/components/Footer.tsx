// app/components/Footer.tsx
"use client";

import Link from "next/link";
import DownloadCV from "./DownloadCV";
import NavbarContactButton from "./NavbarContactButton";

export default function Footer() {
  return (
    <footer data-nav-theme="light" id="contact" className="fade-in-down border-t border-accent/10 bg-brand-light text-brand font-poppins">
      <div className="mx-auto w-full px-0 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Vänster: Kontaktinfo och sociala länkar */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-4 md:gap-8 md:w-auto px-6 md:px-10">
          <span className="font-alexandria text-lg font-bold tracking-tight uppercase">Adis Hegic</span>
          <span className="hidden md:inline-block text-brand/40">|</span>
          <span className="text-sm font-medium text-brand/70 flex items-center h-full">Software Engineer</span>
          <span className="hidden md:inline-block text-brand/40">|</span>
          <div className="flex gap-2 items-center">
          <NavbarContactButton className="mb-1 md:mb-0" />
          {/* <Link href="https://www.linkedin.com/in/adishegic/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 hover:scale-110 transition-transform"><Icon icon="simple-icons:linkedin" width={28} height={28} className="text-accent" /></Link> */}
        </div>
        </div>
        {/* Höger: Knappar */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-2 md:gap-4 w-full md:w-1/3 px-6 md:px-10">
          
          <DownloadCV />
        </div>
      </div>
      <div className="w-full border-t border-accent/10  mx-auto">
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 text-xs text-brand/50 font-jura tracking-wide">
          <div className="md:text-left text-center w-full md:w-auto md:order-1 order-2">
            © 2025 <Link href="https://www.digitalsolutions.adigic.se/" target="_blank" className="font-semibold text-brand/60 hover:text-accent transition-colors">ADIGIC Digital Solutions</Link>
          </div>
          <Link href="/integritypolicy" className="text-xs text-brand/50 hover:text-accent underline underline-offset-2 md:order-2 order-1">Integritetspolicy</Link>
        </div>
      </div>
    </footer>
  );
}
