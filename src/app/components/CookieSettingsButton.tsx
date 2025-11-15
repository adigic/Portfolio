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
      className="mt-4 inline-flex items-center gap-2 rounded-sm border border-white/30 px-3 py-2 text-xs md:text-sm tracking-wide hover:bg-white/10 cursor-pointer"
    >
      Ändra cookieinställningar
    </button>
  );
}
