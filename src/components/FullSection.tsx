// src/components/FullSection.tsx
"use client";

type Props = {
  variant?: "light" | "dark";
  id?: string;
  className?: string;
  children: React.ReactNode;
  top?: boolean;
};

export function FullSection({
  variant = "light",
  id,
  className = "",
  children,
  top,
}: Props) {
  const bg = variant === "dark" ? "bg-brand-dark text-white" : "bg-brand-light";
  return (
    <section
      id={id}
      data-theme={variant}
      className={[
        "w-full snap-start min-h-[100svh] md:min-h-[100dvh] scroll-mt-16",
        "flex", top ? "items-start" : "items-center",
        bg,
        className,
      ].join(" ")}
    >
      {/* Centered content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 md:py-12">
        {children}
      </div>
    </section>
  );
}
