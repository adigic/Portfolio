import type { Variants } from "framer-motion";

// Shared with Hero.tsx (heroItemVariants) and ExperienceEducationSection.tsx (cardVariants) —
// keep those imports in sync rather than redefining this object locally.
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};
