"use client";

import { Icon } from "@iconify/react";

type SectionChevronProps = {
  theme?: "dark" | "light";
};

export function SectionChevron({ theme = "dark" }: SectionChevronProps) {
  const isDark = theme === "dark";

  return (
    <div className="pb-4 flex justify-center pointer-events-none">
      <Icon
        icon="bi:chevron-double-down"
        aria-hidden
        className={[
          "h-6 w-6 animate-bounce transition-colors duration-200",
          isDark ? "text-white" : "text-brand",
        ].join(" ")}
      />
    </div>
  );
}
