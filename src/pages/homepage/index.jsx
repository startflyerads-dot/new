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
        <title>ServiceHub Pro - Transform Your Business with Professional Excellence</title>
        <meta 
          name="description" 
          content="Experience the intersection of innovation and expertise. ServiceHub Pro delivers measurable results through cutting-edge solutions tailored to your unique business challenges." 
        />
        <meta name="keywords" content="digital transformation, strategic consulting, technology solutions, business intelligence, professional services" />
        <meta property="og:title" content="ServiceHub Pro - Transform Your Business" />
        <meta property="og:description" content="Join hundreds of successful companies that have revolutionized their operations with our expert solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://servicehubpro.com/homepage" />
        <link rel="canonical" href="https://servicehubpro.com/homepage" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
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