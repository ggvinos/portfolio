import Nav from "@/components/Nav";
import Grain from "@/components/Grain";
import Hero from "@/components/Hero";
import About from "@/components/About";
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
      <Nav />
      <main>
        <Hero />
        <About />
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
