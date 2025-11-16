"use client";

export default function DownloadCV({
  label = "Download CV",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const handleClick = () => {
    if (typeof window === "undefined") return;

    // Adjust path if you name the file something else
    const cvUrl = "/adishegic-cv.pdf";

    window.open(cvUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer rounded-xs px-4 h-[28px] bg-brand text-brand-light text-[12px] font-poppins uppercase hover:opacity-80 active:opacity-80 ${className}`}
      aria-label="Download my CV here!"
      type="button"
    >
      {label}
    </button>
  );
}
