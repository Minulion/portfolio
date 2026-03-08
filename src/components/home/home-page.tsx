import { AboutSection } from "@/components/home/about-section";
import { HomeHashScroll } from "@/components/home/home-hash-scroll";
import { HeroSection } from "@/components/home/hero-section";
import { IntroGate } from "@/components/home/intro-gate";
import { ProjectsSection } from "@/components/home/projects-section";
import { TimelineSection } from "@/components/home/timeline-section";

export function HomePage() {
  return (
    <>
      <HomeHashScroll />
      <IntroGate />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ProjectsSection />
    </>
  );
}
