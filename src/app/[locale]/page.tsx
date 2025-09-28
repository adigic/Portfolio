// src/app/[locale]/page.tsx
import { Hero } from "@/components/Hero";
import { FullSection } from "@/components/FullSection";
import About from "@/components/About";

export default function Home() {
  return (
    <>
            <FullSection id="projects" variant="light" top>
        <Hero/>
      </FullSection>

      <FullSection id="about" variant="dark" top>
        <About/>
      </FullSection>

    </>
  );
}
