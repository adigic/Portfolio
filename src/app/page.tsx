import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className="">
        <div className="w-full mx-auto">
            
        <Hero />
        <AboutSection />
        <Footer/>
        </div>
      </main>
    </div>
  );
}
