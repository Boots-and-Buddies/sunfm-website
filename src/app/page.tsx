import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Testimonials from "@/components/Testimonials";
import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import TrackedSection from "@/components/TrackedSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <TrackedSection sectionName="hero">
          <Hero />
        </TrackedSection>
        <TrackedSection sectionName="testimonials">
          <Testimonials />
        </TrackedSection>
        <TrackedSection sectionName="pain_points">
          <PainPoints />
        </TrackedSection>
        <TrackedSection sectionName="how_it_works">
          <HowItWorks />
        </TrackedSection>
        <TrackedSection sectionName="application_form">
          <ApplicationForm />
        </TrackedSection>
        <TrackedSection sectionName="who_is_this_for">
          <WhoIsThisFor />
        </TrackedSection>
        <TrackedSection sectionName="about">
          <About />
        </TrackedSection>
        <TrackedSection sectionName="faq">
          <FAQ />
        </TrackedSection>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
