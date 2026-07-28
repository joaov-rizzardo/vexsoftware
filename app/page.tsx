import ScrollProgress from "./_components/ScrollProgress";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import ProblemSection from "./_components/ProblemSection";
import Services from "./_components/Services";
import Stats from "./_components/Stats";
import Process from "./_components/Process";
import Testimonials from "./_components/Testimonials";
import LogoCloud from "./_components/LogoCloud";
import TechStack from "./_components/TechStack";
import Faq from "./_components/Faq";
import ContactForm from "./_components/ContactForm";
import Footer from "./_components/Footer";
import WhatsAppFloat from "./_components/WhatsAppFloat";
import JsonLd from "./_components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <Stats />
        <Process />
        <TechStack />
        <Testimonials />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
