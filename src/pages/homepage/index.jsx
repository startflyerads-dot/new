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
import Icon from '../../components/AppIcon';
import ConsultationModal from '../../components/ui/ConsultationModal';
import logo from '../../assets/images/app.svg';
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
        <title>startflyerads - Transform Your Business with Professional Excellence</title>
        <meta
          name="description"
          content="startflyerads delivers measurable digital marketing results — SEO, PPC, social media, and web design tailored to grow your business."
        />
        <meta name="keywords" content="startflyerads, digital marketing, SEO, PPC, social media, web design, lead generation" />
        <meta property="og:title" content="startflyerads - Transform Your Business" />
        <meta property="og:description" content="Join companies that trust startflyerads for data-driven digital marketing and growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://startflyerads.com/homepage" />
        <link rel="canonical" href="https://startflyerads.com/homepage" />
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