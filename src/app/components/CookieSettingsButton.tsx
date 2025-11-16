// app/components/CookieSettingsButton.tsx
"use client";

export default function CookieSettingsButton() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-banner"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-4 inline-flex items-center gap-2 rounded-md border border-brand-light/40 px-3 py-2 text-xs md:text-sm tracking-wide text-brand-light hover:bg-brand-light/10 hover:border-brand-light/70 transition cursor-pointer"
    >
      Change cookie settings
    </button>
  );
}
