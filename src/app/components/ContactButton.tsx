"use client";

interface ContactButtonProps {
  onClick: () => void;
  className?: string;
  textColorClass?: string;
}

export default function ContactButton({ onClick, className = "", textColorClass = "text-brand-light" }: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-xs px-4 h-[28px] bg-brand text-[12px] font-poppins uppercase hover:opacity-80 active:opacity-80 ${textColorClass} ${className}`}
      aria-label="Öppna kontaktformulär"
      type="button"
    >
      Contact me
    </button>
  );
}
