import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';

interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  icon: string;
  pricing: { display: string; period: string; note: string };
  features: string[];
  stats: { projects: string; satisfaction: string; timeline: string };
  isPopular: boolean;
  process: Array<{ title: string; description: string }>;
  portfolio: Array<{ title: string; description: string; image: string; imageAlt: string }>;
  included: string[];
  timeline: string;
  teamSize: string;
  revisions: string;
  support: string;
  documentation: boolean;
  training: boolean;
  guarantee: boolean;
  prioritySupport: boolean;
}

interface Category {
  value: string;
  label: string;
}

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalType, setModalType] = useState<'details' | 'quote'>('details');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: 'Digital Marketing',
      category: 'Marketing',
      description: 'Strategic, targeted, effective campaigns for your brand.',
      fullDescription:
        'We craft digital marketing strategies that build awareness, drive engagement, and generate measurable results. Our approach integrates creativity and analytics to boost your online visibility and conversions.',
      image: 'https://images.unsplash.com/photo-1690191793782-bdb489710ab6',
      imageAlt: 'Marketing analytics dashboard with charts and data insights',
      icon: 'Megaphone',
      pricing: { display: '$1,500', period: 'month', note: 'Depends on ad spend and scope' },
      features: [
        'Social Media Marketing',
        'Google Ads',
        'PPC Campaigns',
        'SEO Optimization',
        'WhatsApp Marketing',
        'LinkedIn Ads',
        'Email Marketing',
        'Competitive Analysis'
      ],
      stats: { projects: '250+', satisfaction: '98%', timeline: '2-4 weeks' },
      isPopular: true,
      process: [
        { title: 'Audit & Strategy', description: 'We analyze your goals, competitors, and channels.' },
        { title: 'Campaign Setup', description: 'Create targeted ad campaigns and content calendars.' },
        { title: 'Execution & Monitoring', description: 'Launch campaigns and optimize performance.' },
        { title: 'Reporting', description: 'Deliver insights and ROI-driven analytics.' }
      ],
      portfolio: [
        {
          title: 'Social Media Campaign',
          description: 'Increased client engagement by 230% in 3 months.',
          image: 'https://images.unsplash.com/photo-1636466497217-26a8b545fbd0',
          imageAlt: 'Social media manager posting content calendar on laptop'
        }
      ],
      included: ['Campaign strategy', 'Monthly analytics', 'Creative assets', 'Optimization reports'],
      timeline: '2-4 weeks',
      teamSize: '3-4 specialists',
      revisions: '2 rounds',
      support: 'Ongoing',
      documentation: true,
      training: false,
      guarantee: true,
      prioritySupport: true
    },
    {
      id: 2,
      title: 'Web Development',
      category: 'Development',
      description: 'Custom, responsive, and scalable websites.',
      fullDescription:
        'We develop responsive, high-performance websites designed to engage users and drive conversions. From corporate sites to e-commerce platforms, we bring your brand to life on the web.',
      image: 'https://images.unsplash.com/photo-1573495628363-04667cedc587',
      imageAlt: 'Web developer coding responsive layout on multiple screens',
      icon: 'Code',
      pricing: { display: '$3,000', period: 'project', note: 'Based on complexity and features' },
      features: [
        'Custom website development',
        'Responsive design',
        'E-commerce integration',
        'CMS setup (WordPress, etc.)',
        'SEO-friendly architecture',
        'Hosting & maintenance'
      ],
      stats: { projects: '180+', satisfaction: '97%', timeline: '4-6 weeks' },
      isPopular: true,
      process: [
        { title: 'Requirement Analysis', description: 'Understand goals, audience, and structure.' },
        { title: 'Design & Development', description: 'Build responsive, optimized web solutions.' },
        { title: 'Testing & Launch', description: 'Ensure smooth, secure performance.' },
        { title: 'Support', description: 'Provide maintenance and post-launch assistance.' }
      ],
      portfolio: [
        {
          title: 'Corporate Website Redesign',
          description: 'Boosted client inquiries by 300%.',
          image: 'https://images.unsplash.com/photo-1607453999512-9e8e4b2b2e6e',
          imageAlt: 'Modern website layout displayed on desktop and mobile devices'
        }
      ],
      included: ['Source code', 'Documentation', 'Testing', 'Deployment assistance'],
      timeline: '4-6 weeks',
      teamSize: '2-4 developers',
      revisions: '3 rounds',
      support: '60 days',
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: true
    },
    {
      id: 3,
      title: 'App Development',
      category: 'Development',
      description: 'Custom mobile app development for Android and iOS.',
      fullDescription:
        'We build high-performance, intuitive mobile applications for startups and enterprises. Our apps are tailored to enhance engagement, scalability, and user satisfaction.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
      imageAlt: 'Mobile app developer testing user interface on smartphone',
      icon: 'Smartphone',
      pricing: { display: '$5,000', period: 'project', note: 'Depends on platform and features' },
      features: [
        'Native & cross-platform apps',
        'UI/UX design integration',
        'API development & integration',
        'App store deployment',
        'Maintenance & updates'
      ],
      stats: { projects: '100+', satisfaction: '96%', timeline: '6-10 weeks' },
      isPopular: true,
      process: [
        { title: 'Planning', description: 'Define requirements and app objectives.' },
        { title: 'Design & Prototyping', description: 'Create intuitive user journeys.' },
        { title: 'Development', description: 'Code scalable and secure applications.' },
        { title: 'Launch & Support', description: 'Deploy and maintain post-launch stability.' }
      ],
      portfolio: [
        {
          title: 'E-commerce Mobile App',
          description: 'Achieved 50K downloads in 4 months.',
          image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9',
          imageAlt: 'User browsing e-commerce app on smartphone'
        }
      ],
      included: ['Source code', 'UI/UX design', 'Testing', 'Support'],
      timeline: '6-10 weeks',
      teamSize: '3-5 developers',
      revisions: 'Unlimited during build',
      support: '90 days',
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: true
    },
    {
      id: 4,
      title: 'Graphic Designing',
      category: 'Design',
      description: 'Visual communication that inspires and engages.',
      fullDescription:
        'Our graphic design team crafts visually stunning designs that communicate your message clearly. From branding to digital creatives, we bring your ideas to life.',
      image: 'https://images.unsplash.com/photo-1495335560926-1636395e96e9',
      imageAlt: 'Designer working on creative design project using digital tablet',
      icon: 'Palette',
      pricing: { display: '$800', period: 'project', note: 'Varies by scope' },
      features: [
        'Logo design & branding',
        'Social media creatives',
        'Banner & poster design',
        'UI graphics & icons',
        'Brochures & print media'
      ],
      stats: { projects: '300+', satisfaction: '99%', timeline: '1-2 weeks' },
      isPopular: false,
      process: [
        { title: 'Concept & Research', description: 'Understand your brand personality.' },
        { title: 'Design Creation', description: 'Develop visually appealing designs.' },
        { title: 'Feedback & Revision', description: 'Refine designs to perfection.' },
        { title: 'Final Delivery', description: 'Provide assets in all required formats.' }
      ],
      portfolio: [
        {
          title: 'Brand Kit Design',
          description: 'Delivered complete brand identity for startup.',
          image: 'https://images.unsplash.com/photo-1557683316-973673baf926',
          imageAlt: 'Graphic designer presenting logo variations and brand guidelines'
        }
      ],
      included: ['Design files', 'Brand guide', 'Revisions', 'Source files'],
      timeline: '1-2 weeks',
      teamSize: '2 designers',
      revisions: '3 rounds',
      support: '30 days',
      documentation: true,
      training: false,
      guarantee: true,
      prioritySupport: false
    }
  ];

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setModalType('details');
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>startflyerads — Services | Digital Marketing, Web & App Development</title>
        <meta name="description" content="startflyerads offers results-driven services: digital marketing, web development, app development, and graphic design to help grow your business." />
        <meta name="keywords" content="startflyerads, digital marketing, web development, app development, graphic design, SEO, PPC, social media" />
        <meta property="og:title" content="startflyerads — Services" />
        <meta property="og:description" content="Explore startflyerads services: SEO, PPC, Social Media, Web & App Development. Tailored digital solutions to scale your business." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://startflyerads.com/services" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-bold text-foreground mb-6">Our Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic. Creative. Result-driven. Empowering brands through innovation in design, development, and marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onLearnMore={handleLearnMore}
                onGetQuote={() => {}}
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              We tailor our services to meet your specific goals. Let's discuss your vision today.
            </p>
            <Button variant="default" iconName="MessageSquare">Get in Touch</Button>
          </motion.div>
        </section>

        {/* Modal */}
        <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      </div>
    </>
  );
};

export default ServicesPage;
