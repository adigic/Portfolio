"use client";

import { useEffect, useRef, useState } from "react";

export function TypewriterText({
  phrases,
  typeSpeed = 40,
  holdTime = 6000,
}: {
  phrases: string[];
  typeSpeed?: number;
  holdTime?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const typingRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);

  // Start on a random phrase if there are several
  useEffect(() => {
    if (phrases.length > 1) {
      setIdx(Math.floor(Math.random() * phrases.length));
    }
  }, [phrases.length]);

  useEffect(() => {
    const full = phrases[idx] ?? "";
    setShown("");
    let i = 0;

    const tick = () => {
      if (i <= full.length) {
        setShown(full.slice(0, i++));
        typingRef.current = window.setTimeout(tick, typeSpeed) as unknown as number;
      } else {
        holdRef.current = window.setTimeout(
          () => setIdx((v) => (v + 1) % phrases.length),
          holdTime
        ) as unknown as number;
      }
    };

    tick();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, [idx, phrases, typeSpeed, holdTime]);

  return (
    <span className="whitespace-pre" suppressHydrationWarning>
      {shown}
      <span
        aria-hidden
        className="inline-block w-[0.6ch] align-baseline"
        style={{
          borderLeft: "2px solid currentColor",
          animation: "caretBlink 1s steps(1,end) infinite",
          marginLeft: 2,
          height: "1em",
          transform: "translateY(2px)",
        }}
      />
      <style jsx>{`
        @keyframes caretBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
