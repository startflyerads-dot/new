import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CompanyStory from './components/CompanyStory';
import TeamSection from './components/TeamSection';
import CompanyCulture from './components/CompanyCulture';
import AwardsSection from './components/AwardsSection';
import Footer from '../../components/ui/footer';
const About = () => {
  return (
    <>
      <Helmet>
        <title>About startflyerads - Professional Excellence & Innovation</title>
        <meta
          name="description"
          content="Learn about startflyerads — our mission, team, and culture of innovation. We deliver professional digital marketing services focused on growth."
        />
        <meta name="keywords" content="startflyerads, about, team, culture, digital marketing agency, SEO, PPC" />
        <meta property="og:title" content="About startflyerads" />
        <meta property="og:description" content="Meet the startflyerads team and learn how we help businesses grow with data-driven marketing." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://startflyerads.com/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;