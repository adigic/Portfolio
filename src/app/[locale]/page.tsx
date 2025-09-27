// src/app/[locale]/page.tsx
import { Hero } from "@/components/Hero";
import { FullSection } from "@/components/FullSection";

export default function Home() {
  return (
    <>
            <FullSection id="projects" variant="light" top>
        <Hero/>
      </FullSection>

      <FullSection id="projects" variant="dark" top>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold">Projects</h2>
        {/* ... */}
      </FullSection>

      <FullSection id="about" variant="light" top>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold">About</h2>
        {/* ... */}
      </FullSection>
    </>
  );
}
