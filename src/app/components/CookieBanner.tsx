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
      // No choice yet → show banner
      setVisible(true);
    } else if (stored === "accepted") {
      // Already accepted → trigger GA loader
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }

    // Listen for custom event to reopen the banner (from the privacy page)
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
      <div className="w-full max-w-4xl rounded-lg bg-brand/95 text-brand-light border border-brand-light/20 shadow-lg backdrop-blur-md">
        <div className="flex flex-col gap-3 p-4 text-xs sm:text-sm md:flex-row md:items-center md:justify-between">
          <p className="leading-snug text-brand-light/90">
            I use cookies to analyze traffic with Google Analytics. You can choose to
            accept or reject analytics cookies. Read more in the{" "}
            <Link
              href="/integrity"
              className="underline underline-offset-2 hover:text-accent transition-colors"
            >
              integritypolicy
            </Link>
            .
          </p>

          <div className="flex gap-2 shrink-0 justify-end">
            <button
              type="button"
              onClick={() => handleChoice("denied")}
              className="px-3 py-1.5 text-xs sm:text-sm border border-brand-light/40 rounded-md hover:bg-brand-light/10 transition cursor-pointer"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className=" py-1.5 text-xs sm:text-sm rounded-md px-4 bg-accent text-brand-light hover:opacity-90 transition cursor-pointer"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
