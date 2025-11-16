import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import googleads from '../../assets/images/google.avif';
import {
  Megaphone,
  Code,
  Smartphone,
  Palette,
  Zap,
  Search,
  Image as ImageIcon,
  Video,
  Globe,
  Mail,
  MessageCircle,
  BarChart,
} from "lucide-react";

type Pricing = {
  display: string;
  period: string;
  note?: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type PortfolioItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type Service = {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  icon: string;
  pricing: Pricing;
  features: string[];
  stats: {
    projects: string;
    satisfaction: string;
    timeline: string;
  };
  isPopular: boolean;
  process: ProcessStep[];
  portfolio: PortfolioItem[];
  included: string[];
  timeline: string;
  teamSize: string;
  revisions: string;
  support: string;
  documentation: boolean;
  training: boolean;
  guarantee: boolean;
  prioritySupport: boolean;
};

const iconMap: Record<string, JSX.Element> = {
  Megaphone: <Megaphone className="w-6 h-6 text-primary" />,
  Code: <Code className="w-6 h-6 text-primary" />,
  Smartphone: <Smartphone className="w-6 h-6 text-primary" />,
  Palette: <Palette className="w-6 h-6 text-primary" />,
  Search: <Search className="w-6 h-6 text-primary" />,
  Image: <ImageIcon className="w-6 h-6 text-primary" />,
  Video: <Video className="w-6 h-6 text-primary" />,
  Globe: <Globe className="w-6 h-6 text-primary" />,
  Mail: <Mail className="w-6 h-6 text-primary" />,
  WhatsApp: <MessageCircle className="w-6 h-6 text-primary" />,
  BarChart: <BarChart className="w-6 h-6 text-primary" />,
};

const services: Service[] = [
  {
    id: 1,
    title: "Digital Marketing",
    category: "Marketing",
    description: "Strategic, targeted, and results-driven campaigns.",
    fullDescription:
      "We craft high-performance digital marketing strategies that increase conversions, visibility, and ROI.",
    image: "https://images.unsplash.com/photo-1690191793782-bdb489710ab6",
    imageAlt: "Marketing analytics dashboard",
    icon: "Megaphone",
    pricing: { display: "$1,500", period: "month", note: "Depends on ad spend" },
    features: [
      "Social Media Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO Optimization",
      "WhatsApp Marketing",
      "Email Marketing",
      "Content Strategy",
      "Performance Analytics",
    ],
    stats: { projects: "250+", satisfaction: "98%", timeline: "2-4 weeks" },
    isPopular: true,
    process: [
      { title: "Audit & Strategy", description: "We study your goals and competitors." },
      { title: "Campaign Setup", description: "We prepare ads, funnels, and creatives." },
      { title: "Execution", description: "Launch and daily optimization." },
      { title: "Reporting", description: "Detailed performance analytics." },
    ],
    portfolio: [
      {
        title: "Social Media Campaign",
        description: "Boosted engagement by 230% in 90 days.",
        image: "https://images.unsplash.com/photo-1636466497217-26a8b545fbd0",
        imageAlt: "Social media content planning",
      },
    ],
    included: ["Campaign strategy", "Monthly analytics", "Creative assets", "Optimization reports"],
    timeline: "2–4 weeks",
    teamSize: "3–4 specialists",
    revisions: "2 rounds",
    support: "Ongoing",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 2,
    title: "Web Development",
    category: "Development",
    description: "Custom, fast, responsive websites.",
    fullDescription:
      "We build high-performance websites that enhance user experience and boost conversions.",
    image: "https://images.unsplash.com/photo-1573495628363-04667cedc587",
    imageAlt: "Web development workspace",
    icon: "Code",
    pricing: { display: "$3,000", period: "project", note: "Based on complexity" },
    features: [
      "Custom website development",
      "Landing pages",
      "E-commerce",
      "CMS setup",
      "SEO-friendly structure",
      "Hosting & maintenance",
    ],
    stats: { projects: "180+", satisfaction: "97%", timeline: "4-6 weeks" },
    isPopular: true,
    process: [
      { title: "Planning", description: "We understand your business goals." },
      { title: "Design & Development", description: "We build pixel-perfect UI & fast backend." },
      { title: "Testing", description: "Performance & security checks." },
      { title: "Launch", description: "Deployment & support." },
    ],
    portfolio: [
      {
        title: "Corporate Website Redesign",
        description: "Increased inquiries by 300%.",
        image: "https://images.unsplash.com/photo-1607453999512-9e8e4b2b2e6e",
        imageAlt: "Modern website layout",
      },
    ],
    included: ["Source code", "Documentation", "Testing", "Deployment"],
    timeline: "4–6 weeks",
    teamSize: "2–4 developers",
    revisions: "3 rounds",
    support: "60 days",
    documentation: true,
    training: true,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 3,
    title: "App Development",
    category: "Development",
    description: "Android & iOS mobile apps.",
    fullDescription:
      "We build scalable, secure, and user-friendly mobile apps for startups and enterprises.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    imageAlt: "App developer testing interface",
    icon: "Smartphone",
    pricing: { display: "$5,000", period: "project", note: "Platform & features affect cost" },
    features: [
      "Native & cross-platform apps",
      "UI/UX integration",
      "API development",
      "App store deployment",
      "Maintenance & updates",
    ],
    stats: { projects: "100+", satisfaction: "96%", timeline: "6-10 weeks" },
    isPopular: true,
    process: [
      { title: "Planning", description: "Requirement gathering & roadmap." },
      { title: "Design", description: "Wireframes & UI/UX." },
      { title: "Development", description: "Backend + frontend build." },
      { title: "Launch", description: "Deployment & support." },
    ],
    portfolio: [
      {
        title: "E-commerce Mobile App",
        description: "Achieved 50K+ downloads in 4 months.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9",
        imageAlt: "E-commerce app UI",
      },
    ],
    included: ["Source code", "Designs", "Testing", "Support"],
    timeline: "6–10 weeks",
    teamSize: "3–5 developers",
    revisions: "Unlimited",
    support: "90 days",
    documentation: true,
    training: true,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 4,
    title: "Graphic Designing",
    category: "Design",
    description: "Modern, creative, brand-focused visuals.",
    fullDescription:
      "We craft premium graphic designs that align with your brand and communicate effectively.",
    image: "https://images.unsplash.com/photo-1495335560926-1636395e96e9",
    imageAlt: "Designer working on graphics",
    icon: "Palette",
    pricing: { display: "$800", period: "project", note: "Varies by scope" },
    features: [
      "Branding",
      "Logo design",
      "Social media creatives",
      "Posters & flyers",
      "UI graphics",
    ],
    stats: { projects: "300+", satisfaction: "99%", timeline: "1-2 weeks" },
    isPopular: false,
    process: [
      { title: "Concept", description: "Understand brand personality." },
      { title: "Designing", description: "Create concepts & variations." },
      { title: "Revisions", description: "Fine-tune your design." },
      { title: "Delivery", description: "Provide all source files." },
    ],
    portfolio: [
      {
        title: "Brand Identity Kit",
        description: "Delivered full brand identity.",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926",
        imageAlt: "Brand kit design",
      },
    ],
    included: ["Design files", "Brand guide", "Revisions", "Source files"],
    timeline: "1–2 weeks",
    teamSize: "2 designers",
    revisions: "3 rounds",
    support: "30 days",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: false,
  },
  {
    id: 5,
    title: "SEO Optimization",
    category: "Marketing",
    description: "Rank higher & get more organic traffic.",
    fullDescription:
      "We optimize your website’s structure, content, speed, and authority to dominate search engines.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    imageAlt: "SEO dashboard",
    icon: "Search",
    pricing: { display: "$1,000", period: "month", note: "Based on competition level" },
    features: [
      "Technical SEO",
      "On-page SEO",
      "Off-page SEO",
      "Keyword research",
      "Speed optimization",
      "Backlink building",
    ],
    stats: { projects: "200+", satisfaction: "97%", timeline: "4-12 weeks" },
    isPopular: true,
    process: [
      { title: "Audit", description: "Technical site review." },
      { title: "Optimization", description: "Content & speed improvements." },
      { title: "Authority Building", description: "Backlinks & citations." },
      { title: "Tracking", description: "Monthly ranking reports." },
    ],
    portfolio: [],
    included: ["SEO audit", "Keyword list", "Monthly reports"],
    timeline: "4–12 weeks",
    teamSize: "2 SEO specialists",
    revisions: "Ongoing",
    support: "Ongoing",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 6,
    title: "Photoshop Editing",
    category: "Design",
    description: "Professional photo editing & retouching.",
    fullDescription:
      "We enhance, retouch, and manipulate images with industry-grade editing techniques.",
    image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
    imageAlt: "Photo editing workspace",
    icon: "Image",
    pricing: { display: "$100", period: "project", note: "Depends on edits" },
    features: ["Retouching", "Background removal", "Enhancement", "Color grading", "Manipulation"],
    stats: { projects: "500+", satisfaction: "99%", timeline: "1-3 days" },
    isPopular: false,
    process: [],
    portfolio: [],
    included: ["Edited files", "Revisions"],
    timeline: "1–3 days",
    teamSize: "1 editor",
    revisions: "2 rounds",
    support: "7 days",
    documentation: false,
    training: false,
    guarantee: true,
    prioritySupport: false,
  },
  {
    id: 7,
    title: "Video Editing",
    category: "Media",
    description: "Cinematic, engaging, branded videos.",
    fullDescription:
      "From reels to ads, we create high-quality edited videos tailored to your brand.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    imageAlt: "Video editing timeline",
    icon: "Video",
    pricing: { display: "$300", period: "project", note: "Depends on length" },
    features: ["Cutting", "Color grading", "Transitions", "Motion graphics", "Reels editing"],
    stats: { projects: "120+", satisfaction: "96%", timeline: "3-7 days" },
    isPopular: false,
    process: [],
    portfolio: [],
    included: ["Edited video", "2 revisions"],
    timeline: "3–7 days",
    teamSize: "1 video editor",
    revisions: "2 rounds",
    support: "7 days",
    documentation: false,
    training: false,
    guarantee: true,
    prioritySupport: false,
  },
  {
    id: 8,
    title: "Meta Ads",
    category: "Marketing",
    description: "High-performance Facebook & Instagram ads.",
    fullDescription:
      "We create and optimize Meta ads that deliver conversions, engagement, and leads.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    imageAlt: "Meta ads dashboard",
    icon: "BarChart",
    pricing: {
      display: "$500",
      period: "month",
      note: "Ad spend not included",
    },
    features: ["Audience targeting", "Creative design", "Ad optimization", "A/B testing"],
    stats: { projects: "220+", satisfaction: "98%", timeline: "1 week setup" },
    isPopular: true,
    process: [],
    portfolio: [],
    included: ["Campaign setup", "Reports"],
    timeline: "1 week setup",
    teamSize: "2 marketers",
    revisions: "Ongoing",
    support: "Ongoing",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 9,
    title: "Google Ads",
    category: "Marketing",
    description: "Max ROI search, display & YouTube ads.",
    fullDescription:
      "We set up high-performance Google campaigns that bring targeted traffic and conversions.",
    image:googleads,
    imageAlt: "Google ads dashboard",
    icon: "Zap",
    pricing: { display: "$600", period: "month", note: "Ad spend not included" },
    features: ["Search ads", "Display ads", "Retargeting", "YouTube ads", "Keyword strategy"],
    stats: { projects: "260+", satisfaction: "97%", timeline: "1 week setup" },
    isPopular: true,
    process: [],
    portfolio: [],
    included: ["Campaign setup", "Reports"],
    timeline: "1 week setup",
    teamSize: "2 marketers",
    revisions: "Ongoing",
    support: "Ongoing",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: true,
  },
  {
    id: 10,
    title: "Email Marketing",
    category: "Marketing",
    description: "Automated, high-converting email campaigns.",
    fullDescription:
      "We design email flows that nurture leads and convert subscribers into customers.",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
    imageAlt: "Email marketing dashboard",
    icon: "Mail",
    pricing: { display: "$350", period: "month" },
    features: ["Automation", "Newsletters", "Audience segmentation", "Templates"],
    stats: { projects: "180+", satisfaction: "96%", timeline: "1 week setup" },
    isPopular: false,
    process: [],
    portfolio: [],
    included: ["Templates", "Reports"],
    timeline: "1 week setup",
    teamSize: "1 marketer",
    revisions: "2 rounds",
    support: "30 days",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: false,
  },
  {
    id: 11,
    title: "WhatsApp Marketing",
    category: "Marketing",
    description: "Automated WhatsApp drip campaigns & bulk sending.",
    fullDescription:
      "We set up automated messaging systems that boost engagement and customer retention.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2",
    imageAlt: "WhatsApp marketing dashboard",
    icon: "WhatsApp",
    pricing: { display: "$200", period: "month" },
    features: ["Auto-replies", "Bulk messaging", "Funnels", "Engagement tracking"],
    stats: { projects: "150+", satisfaction: "97%", timeline: "3 days setup" },
    isPopular: false,
    process: [],
    portfolio: [],
    included: ["Automation setup", "Template messages"],
    timeline: "3 days setup",
    teamSize: "1 marketer",
    revisions: "1 round",
    support: "30 days",
    documentation: true,
    training: false,
    guarantee: true,
    prioritySupport: false,
  },
];

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalType, setModalType] = useState<'details' | 'quote'>('details');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onLearnMore={handleLearnMore}
                onGetQuote={(svc: any) => {
                  setSelectedService(svc);
                  setModalType('quote');
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* CTA */}
       
        </section>
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Business?</h2>
            <p className="text-muted-foreground mb-6">
              Contact us today to discuss how our services can help you achieve your goals.
            </p>
            <Button
              size="lg"
              onClick={() => {
                setSelectedService(null);
                setModalType('quote');
                setIsModalOpen(true);
              }}
              classname="px-6 py-3 bg-primary-gradient text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition"
            >
              Get in Touch
            </Button>
          </div>
        </section>    
        {/* Modal */}
        <ServiceModal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
      </div>
    </>
  );
};

export default ServicesPage;
