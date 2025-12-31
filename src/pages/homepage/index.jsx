import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import InteractiveRings from './components/InteractiveRings';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import ClientLogos from './components/ClientLogos';
import ServiceDiscoveryWizard from './components/ServiceDiscoveryWizard';
import CTASection from './components/CTASection';
import ConsultationModal from '../../components/ui/ConsultationModal';
import Footer from '../../components/ui/footer';
const Homepage = () => {
  const [consultOpen, setConsultOpen] = useState(false);

  // Effect for smooth scrolling on anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      e.preventDefault();
      const element = document.querySelector(anchor.getAttribute('href'));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>HK Local Tours — Discover the Authentic, Wild Hong Kong</title>
        <meta
          name="description"
          content="Explore Hong Kong's trails with sustainable and personalized walking tours. Connecting travelers with the wild side of HK through professional local guidance."
        />
        <meta name="keywords" content="HK Local Tours, Hong Kong hiking, sustainable tourism HK, local walking tours, Hong Kong nature, personalized hikes" />
        <meta property="og:title" content="HK Local Tours — Authentic Hong Kong Hikes" />
        <meta property="og:description" content="Discover the wild side of Hong Kong with personalized, sustainable hiking tours led by expert local guides." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hklocaltours.com/" />
        <link rel="canonical" href="https://hklocaltours.com/" />
      </Helmet>

      <div className="min-h-screen bg-background text-white">
        <Header />

        <main className="pt-26 mt-10 sm:pt-20 md:pt-24 lg:pt-28">
          <HeroSection onOpenConsultation={() => setConsultOpen(true)} />
          <ServicesPreview />
          <InteractiveRings />
          <TestimonialsCarousel />
          <ClientLogos />
          <ServiceDiscoveryWizard />
          <CTASection />
        </main>

        <ConsultationModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />

        {/* Fully Responsive Footer - updated layout */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;