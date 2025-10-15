import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CompanyStory from './components/CompanyStory';
import TeamSection from './components/TeamSection';
import CompanyCulture from './components/CompanyCulture';
import AwardsSection from './components/AwardsSection';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ServiceHub Pro | Professional Excellence & Innovation</title>
        <meta name="description" content="Discover ServiceHub Pro's journey of innovation, meet our expert team, and explore our company culture. Where professional excellence meets cutting-edge digital innovation." />
        <meta name="keywords" content="about servicehub pro, company story, team, culture, awards, professional services, innovation, excellence" />
        <meta property="og:title" content="About Us - ServiceHub Pro" />
        <meta property="og:description" content="Where professional excellence meets cutting-edge digital innovation. Meet our team and discover our culture of innovation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <CompanyStory />
          <TeamSection />
          <CompanyCulture />
          <AwardsSection />
        </main>
      </div>
    </>
  );
};

export default About;