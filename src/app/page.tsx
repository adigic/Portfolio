import AboutSection from "./components/AboutSection";
import ExperienceEducationSection from "./components/ExperienceEducationSection";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import ProjectsSection from "@/components/projects/ProjectsSection";
import { fetchProjects } from "@/lib/sanity/fetchProjects";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <div>
      <Navbar />

      <main className="">
        <div className="w-full mx-auto">
            
        <Hero />
        <AboutSection />
        <ExperienceEducationSection />
        <ProjectsSection projects={projects} />
        <Footer/>
        </div>
      </main>
    </div>
  );
}
