import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ConsultationForm from './components/ConsultationForm';
import OfficeLocations from './components/OfficeLocations';
import LiveChatWidget from './components/LiveChatWidget';
import ContactFAQ from './components/ContactFAQ';
import TestimonialSection from './components/TestimonialSection';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - ServiceHub Pro | Schedule Your Free Consultation</title>
        <meta name="description" content="Connect with ServiceHub Pro experts through multiple channels. Schedule your free consultation, get instant support via live chat, or visit our offices. We respond within 2 hours." />
        <meta name="keywords" content="contact servicehub pro, business consultation, free consultation, live chat support, office locations, schedule meeting" />
        <meta property="og:title" content="Contact Us - ServiceHub Pro | Schedule Your Free Consultation" />
        <meta property="og:description" content="Connect with ServiceHub Pro experts through multiple channels. Schedule your free consultation, get instant support via live chat, or visit our offices." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <ContactHero />
        
        {/* Consultation Form */}
        <ConsultationForm />
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Office Locations */}
        <OfficeLocations />
        
        {/* FAQ Section */}
        <ContactFAQ />
        
        {/* Live Chat Widget */}
        <LiveChatWidget />
        
        {/* Footer CTA */}
        <section className="py-16 bg-gradient-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses who have transformed their operations with our expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors animate-elastic-hover shadow-professional">
                Schedule Free Consultation
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors animate-elastic-hover backdrop-blur-sm">
                Download Our Brochure
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;