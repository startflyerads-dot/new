import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ConsultationForm from './components/ConsultationForm';
import OfficeLocations from './components/OfficeLocations';
import LiveChatWidget from './components/LiveChatWidget';
import ContactFAQ from './components/ContactFAQ';
import TestimonialSection from './components/TestimonialSection';
import Footer from '../../components/ui/footer';
const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact startflyerads | your digital marketing partner</title>
        <meta name="description" content="Transform your digital presence with startflyerads. Schedule a free strategy session with our digital marketing experts. Get personalized solutions for SEO, Social Media, PPC, and more." />
        <meta name="keywords" content="startflyerads, digital marketing agency, social media marketing, SEO services, PPC management, content marketing, Chennai digital marketing" />
        <meta property="og:title" content="Contact startflyerads | your digital marketing partner" />
        <meta property="og:description" content="Transform your digital presence with startflyerads. Get expert digital marketing solutions tailored to your business goals." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <div className="min-h-screen bg-[#2A2A42]">
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
        <section className="py-16 bg-gradient-to-br from-[#e57b46] to-[#B9AEDF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Digital Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join successful businesses who have transformed their digital marketing with StartFlyerAds expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2A2A42] rounded-xl font-semibold hover:bg-white/90 transition-colors animate-elastic-hover shadow-professional"
                onClick={() => window.location.href = '/schedule'}
              >
                Get Free Strategy Session
              </button>
              <button 
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors animate-elastic-hover backdrop-blur-sm"
                onClick={() => window.location.href = '/resources'}
              >
                View Our Case Studies
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;