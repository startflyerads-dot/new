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
        
      
        
        {/* Footer CTA */}
      
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;