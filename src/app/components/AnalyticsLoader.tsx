// app/components/AnalyticsLoader.tsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-XXXXXXX"; // byt till ditt GA4-ID

export default function AnalyticsLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("cookie-consent");

    if (stored === "accepted") {
      setShouldLoad(true);
    }

    const onAccept = () => {
      setShouldLoad(true);
    };

    window.addEventListener("cookie-consent-accepted", onAccept);
    return () => window.removeEventListener("cookie-consent-accepted", onAccept);
  }, []);

  if (!shouldLoad) return null;

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
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
