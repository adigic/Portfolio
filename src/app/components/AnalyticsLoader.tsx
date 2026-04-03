// app/components/AnalyticsLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

import {
  COOKIE_CONSENT_EVENT,
  type ConsentValue,
  readConsent,
} from "@/lib/analytics/consent";

// Read from Next public env vars, which Netlify exposes at build time.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function setAnalyticsConsent(value: ConsentValue) {
  if (typeof window === "undefined" || !GA_ID) {
    return;
  }

  ((window as unknown) as Record<string, unknown>)[`ga-disable-${GA_ID}`] = value === "denied";

  if (!window.gtag) {
    return;
  }

  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: value === "accepted" ? "granted" : "denied",
  });
}

export default function AnalyticsLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readConsent();

    if (stored === "accepted") {
      setShouldLoad(true);
    }

    const onConsentUpdated = (event: Event) => {
      const consent = (event as CustomEvent<ConsentValue>).detail;

      if (consent === "accepted") {
        setShouldLoad(true);
        setAnalyticsConsent("accepted");
        return;
      }

      setAnalyticsConsent("denied");
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentUpdated);
  }, []);

  useEffect(() => {
    if (!shouldLoad || typeof window === "undefined" || !window.gtag || !GA_ID) {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, shouldLoad]);

  if (!GA_ID || !shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
          gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
            send_page_view: false,
          });
        `}
      </Script>
    </>
  );
}
