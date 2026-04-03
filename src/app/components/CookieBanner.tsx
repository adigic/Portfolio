// app/components/CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  dispatchConsentUpdated,
  readConsent,
  type ConsentValue,
  writeConsent,
} from "@/lib/analytics/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<ConsentValue | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readConsent();
    setCurrentChoice(stored);

    if (!stored) {
      setVisible(true);
    } else {
      dispatchConsentUpdated(stored);
    }

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

    writeConsent(value);
    setCurrentChoice(value);
    dispatchConsentUpdated(value);

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
              href="/integritypolicy"
              className="underline underline-offset-2 hover:text-accent transition-colors"
            >
              privacy policy
            </Link>
            .
          </p>

          <div className="flex gap-2 shrink-0 justify-end">
            <button
              type="button"
              onClick={() => handleChoice("denied")}
              className="px-3 py-1.5 text-xs sm:text-sm border border-brand-light/40 rounded-md hover:bg-brand-light/10 transition cursor-pointer"
            >
              {currentChoice === "denied" ? "Rejected" : "Reject"}
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className=" py-1.5 text-xs sm:text-sm rounded-md px-4 bg-accent text-brand-light hover:opacity-90 transition cursor-pointer"
            >
              {currentChoice === "accepted" ? "Accepted" : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
