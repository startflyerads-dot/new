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
        <footer className="bg-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Left: Brand + short description */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" color="white" size={18} />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold">Startflyer<span className="text-primary">Ads</span></div>
                    <div className="text-sm text-white/70">Digital Marketing Solution</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon name="Facebook" size={16} />
                  </a>
                  <a href="#" aria-label="Twitter" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon name="Twitter" size={16} />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon name="Linkedin" size={16} />
                  </a>
                </div>
              </div>

              {/* Middle: Quick links (two columns) */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-white">Services</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li><a href="/services" className="hover:text-primary">Digital Transformation</a></li>
                    <li><a href="/services" className="hover:text-primary">Strategic Consulting</a></li>
                    <li><a href="/services" className="hover:text-primary">Technology Solutions</a></li>
                    <li><a href="/services" className="hover:text-primary">Business Intelligence</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3 text-white">Company</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li><a href="/about" className="hover:text-primary">About Us</a></li>
                    <li><a href="/resources" className="hover:text-primary">Resources</a></li>
                    <li><a href="/client-portal" className="hover:text-primary">Client Portal</a></li>
                    <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                  </ul>
                </div>
              </div>

              {/* Right: Contact + newsletter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white">Get in Touch</h4>
                <div className="text-sm text-white/70 space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <a href="mailto:startflyerads@gmail.com" className="break-all hover:text-primary">startflyerads@gmail.com</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <a href="tel:+15551234567" className="hover:text-primary">+1 (555) 123-4567</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>New York, NY 10001</span>
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="newsletter" className="text-sm font-medium text-white">Subscribe to updates</label>
                  <div className="mt-2 flex">
                    <input id="newsletter" type="email" placeholder="you@company.com" className="w-full px-3 py-2 rounded-l-lg border border-white/10 bg-dark/20 text-sm text-white placeholder-white/60 focus:outline-none" />
                    <button className="px-4 py-2 bg-primary text-white rounded-r-lg text-sm hover:opacity-95">Subscribe</button>
                  </div>
                  <p className="text-xs text-white/60 mt-2">We’ll only send useful updates. Unsubscribe anytime.</p>
                </div>
              </div>
            </div>

            {/* Divider + bottom bar */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/50">© {new Date().getFullYear()} ServiceHub Pro. All rights reserved.</p>
              <div className="flex items-center gap-4 text-xs">
                <a href="#" className="text-white/50 hover:text-primary">Privacy Policy</a>
                <a href="#" className="text-white/50 hover:text-primary">Terms of Service</a>
                <a href="#" className="text-white/50 hover:text-primary">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;