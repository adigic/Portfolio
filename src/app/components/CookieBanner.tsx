// app/components/CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent"; // "accepted" | "denied"
type ConsentValue = "accepted" | "denied";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentValue | null;

    if (!stored) {
      // Inget val gjort → visa banner
      setVisible(true);
    } else if (stored === "accepted") {
      // Redan accepterat → trigga GA-loader
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }

    // Lyssna på special-event för att öppna bannern igen (från integritetssidan)
    const onOpen = () => {
      setVisible(true);
    };

    window.addEventListener("open-cookie-banner", onOpen);
    setLoaded(true);

    return () => {
      window.removeEventListener("open-cookie-banner", onOpen);
    };
  }, []);

  const handleChoice = (value: ConsentValue) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(STORAGE_KEY, value);

    if (value === "accepted") {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }

    setVisible(false);
  };

  if (!loaded || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="w-full max-w-3xl rounded-md bg-[#111111]/95 text-white border border-white/10 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-3 p-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="leading-snug">
            Vi använder cookies för att analysera trafik med Google Analytics. Du kan välja att
            acceptera eller neka statistikcookies. Läs mer i vår{" "}
            <Link href="/integritetspolicy" className="underline underline-offset-2 hover:text-gray-200">
              integritetspolicy
            </Link>
            .
          </p>

          <div className="flex gap-2 shrink-0 justify-end">
            <button
              type="button"
              onClick={() => handleChoice("denied")}
              className="px-3 py-1.5 text-xs md:text-sm border border-white/30 rounded-sm hover:bg-white/10 transition cursor-pointer"
            >
              Neka
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="px-3 py-1.5 text-xs md:text-sm bg-white text-black rounded-sm hover:bg-gray-100 transition cursor-pointer"
            >
              Acceptera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
