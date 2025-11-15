import AboutSection from "./components/AboutSection";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="">
        <div className="w-full mx-auto">
            
        <Hero />
        <AboutSection />
        </div>
      </main>
    </>
  );
}
