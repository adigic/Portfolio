import { Hero } from "@/components/Hero";
import { FullSection } from "@/components/FullSection";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      {/* Subtract navbar (h-16 = 64px) so the first fold fits on mobile */}
<FullSection
  id="hero"
  variant="light"
  align="center"
  className="h-auto min-h-[calc(100svh-64px)] md:h-[calc(100dvh-64px)]"
>
  <Hero />
</FullSection>

<FullSection
  id="about"
  variant="dark"
  align="top"                 // 👈 top-aligns the section content    // 👈 optional: removes FullSection’s default top padding
>
  <About />
</FullSection>

<FullSection
  id="about"
  variant="light"
  align="top"                 // 👈 top-aligns the section content    // 👈 optional: removes FullSection’s default top padding
>
  <About />
</FullSection>

<FullSection
  id="about"
  variant="dark"
  align="top"                 // 👈 top-aligns the section content    // 👈 optional: removes FullSection’s default top padding
>
  <Projects/>
</FullSection>
    </>
  );
}
