import Nav from "@/components/Nav";
import Grain from "@/components/Grain";
import ScrollProgress from "@/components/ScrollProgress";
import HeroAboutJourney from "@/components/HeroAboutJourney";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcordeShowcase from "@/components/AcordeShowcase";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Articles from "@/components/Articles";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Grain />
      <ScrollProgress />
      <Nav />
      <main>
        <HeroAboutJourney>
          <Hero />
          <About />
        </HeroAboutJourney>
        <AcordeShowcase />
        <Projects />
        <Experience />
        <Education />
        <Articles />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
