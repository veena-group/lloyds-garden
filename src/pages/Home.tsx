import Hero from '../components/sections/Hero';
import WelcomeSection from '../components/sections/WelcomeSection';
import AboutSection from '../components/sections/AboutSection';
import AroundLloydsSection from '../components/sections/AroundLloydsSection';
import LivingAtLloydsSection from '../components/sections/LivingAtLloydsSection';
import CooperativeLivingSection from '../components/sections/CooperativeLivingSection';
import CommitteeSection from '../components/sections/CommitteeSection';
import GallerySection from '../components/sections/GallerySection';
import EventsSection from '../components/sections/EventsSection';
import MemberPortalPreview from '../components/sections/MemberPortalPreview';
import LocationContactSection from '../components/sections/LocationContactSection';

export default function Home() {
  return (
    <div className="bg-[var(--color-canvas)] selection:bg-[var(--color-bronze)] selection:text-white">
      {/* 01. Hero */}
      <Hero />

      {/* 02. About Chapter (Welcome + About) */}
      <WelcomeSection />
      <AboutSection />

      {/* 03. Around Lloyds */}
      <AroundLloydsSection />

      {/* 04. Life at Lloyds */}
      <LivingAtLloydsSection />

      {/* 05. Co-operative Living */}
      <CooperativeLivingSection />

      {/* 06. Managing Committee */}
      <CommitteeSection />

      {/* 07. Gallery */}
      <GallerySection />

      {/* 08. Upcoming Events */}
      <EventsSection />

      {/* 09. Member Portal */}
      <MemberPortalPreview />

      {/* 09. Location + Contact */}
      <LocationContactSection />
    </div>
  );
}
