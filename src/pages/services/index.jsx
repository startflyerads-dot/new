import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import ServiceFilters from './components/ServiceFilters';
import ServiceComparison from './components/ServiceComparison';
import ServiceModal from './components/ServiceModal';
import ROICalculator from './components/ROICalculator';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedService, setSelectedService] = useState(null);
  const [modalType, setModalType] = useState('details');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonServices, setComparisonServices] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);

  // Mock Services Data
  const services = [
    {
      id: 1,
      title: "Business Strategy Consulting",
      category: "Consulting",
      description: "Transform your business with data-driven strategic planning and market analysis.",
      fullDescription: `Our Business Strategy Consulting service helps organizations navigate complex market challenges and identify growth opportunities through comprehensive analysis and strategic planning. We work closely with your leadership team to develop actionable strategies that drive sustainable growth and competitive advantage.\n\nOur approach combines industry expertise with cutting-edge analytical tools to deliver insights that matter. From market entry strategies to digital transformation roadmaps, we provide the strategic guidance your business needs to thrive in today's dynamic marketplace.`,
      image: "https://images.unsplash.com/photo-1716703435453-a7733d600d68",
      imageAlt: "Professional business team analyzing charts and graphs on large monitor in modern conference room",
      icon: "TrendingUp",
      pricing: { display: "$5,000", period: "project", note: "Starting price, varies by scope" },
      features: [
        "Comprehensive market analysis",
        "Strategic roadmap development",
        "Competitive intelligence",
        "Financial modeling & projections",
        "Implementation planning",
        "Performance tracking setup"
      ],
      stats: { projects: "150+", satisfaction: "98%", timeline: "4-6 weeks" },
      isPopular: true,
      process: [
        { title: "Discovery & Assessment", description: "Deep dive into your business model, market position, and growth challenges" },
        { title: "Market Analysis", description: "Comprehensive analysis of market trends, competitors, and opportunities" },
        { title: "Strategy Development", description: "Create tailored strategic recommendations and implementation roadmap" },
        { title: "Presentation & Handoff", description: "Present findings and provide detailed documentation for execution" }
      ],
      portfolio: [
        {
          title: "Tech Startup Growth Strategy",
          description: "Helped SaaS startup achieve 300% revenue growth",
          image: "https://images.unsplash.com/photo-1542089078-9086d071d8da",
          imageAlt: "Modern startup office with employees working on laptops and whiteboards with growth charts"
        },
        {
          title: "Manufacturing Digital Transformation",
          description: "Led digital transformation for mid-size manufacturer",
          image: "https://images.unsplash.com/photo-1642721084699-1c3007e38d9e",
          imageAlt: "Industrial manufacturing floor with automated machinery and digital control systems"
        }
      ],
      included: [
        "Strategic assessment report",
        "Market analysis document",
        "Implementation roadmap",
        "Financial projections",
        "30-day follow-up support"
      ],
      timeline: "4-6 weeks",
      teamSize: "3-4 experts",
      revisions: "3 rounds",
      support: "30 days",
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: true
    },
    {
      id: 2,
      title: "Custom Software Development",
      category: "Development",
      description: "Build scalable, secure applications tailored to your specific business needs.",
      fullDescription: `Our Custom Software Development service delivers bespoke solutions that perfectly align with your business processes and objectives. We specialize in creating scalable, maintainable applications using modern technologies and best practices.\n\nFrom initial concept to deployment and beyond, our experienced development team works closely with you to ensure every aspect of your software meets your exact requirements. We focus on creating solutions that not only solve today's challenges but also adapt to your future growth.`,
      image: "https://images.unsplash.com/photo-1573495628363-04667cedc587",
      imageAlt: "Software developer typing code on multiple monitors showing colorful programming interfaces",
      icon: "Code",
      pricing: { display: "$15,000", period: "project", note: "Varies by complexity and features" },
      features: [
        "Full-stack development",
        "Cloud-native architecture",
        "API development & integration",
        "Database design & optimization",
        "Security implementation",
        "Performance optimization"
      ],
      stats: { projects: "200+", satisfaction: "96%", timeline: "8-12 weeks" },
      isPopular: false,
      process: [
        { title: "Requirements Analysis", description: "Detailed analysis of your functional and technical requirements" },
        { title: "Architecture Design", description: "Design scalable system architecture and technology stack" },
        { title: "Development & Testing", description: "Agile development with continuous testing and quality assurance" },
        { title: "Deployment & Support", description: "Production deployment with ongoing maintenance and support" }
      ],
      portfolio: [
        {
          title: "E-commerce Platform",
          description: "Built custom e-commerce solution handling 10K+ daily orders",
          image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68",
          imageAlt: "Modern e-commerce website interface showing product listings and shopping cart on laptop screen"
        },
        {
          title: "Healthcare Management System",
          description: "Developed HIPAA-compliant patient management platform",
          image: "https://images.unsplash.com/photo-1666886573531-48d2e3c2b684",
          imageAlt: "Healthcare professional using tablet with medical management software in hospital setting"
        }
      ],
      included: [
        "Custom application development",
        "Source code & documentation",
        "Testing & quality assurance",
        "Deployment assistance",
        "90-day warranty support"
      ],
      timeline: "8-12 weeks",
      teamSize: "4-6 developers",
      revisions: "Unlimited during development",
      support: "90 days",
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: false
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      category: "Marketing",
      description: "Comprehensive digital marketing campaigns that drive measurable results.",
      fullDescription: `Our Digital Marketing Strategy service combines creativity with data-driven insights to create campaigns that resonate with your target audience and drive meaningful business results. We develop comprehensive marketing strategies across multiple channels to maximize your reach and ROI.\n\nFrom SEO and content marketing to social media and paid advertising, we create integrated campaigns that tell your brand story and convert prospects into loyal customers. Our approach is always data-driven, ensuring every marketing dollar is optimized for maximum impact.`,
      image: "https://images.unsplash.com/photo-1690191793782-bdb489710ab6",
      imageAlt: "Marketing team analyzing digital campaign performance on large dashboard with charts and metrics",
      icon: "Megaphone",
      pricing: { display: "$3,500", period: "month", note: "Minimum 6-month engagement" },
      features: [
        "Multi-channel campaign strategy",
        "Content creation & optimization",
        "SEO & SEM management",
        "Social media marketing",
        "Analytics & reporting",
        "Conversion optimization"
      ],
      stats: { projects: "300+", satisfaction: "94%", timeline: "2-3 weeks" },
      isPopular: true,
      process: [
        { title: "Audit & Analysis", description: "Comprehensive audit of current marketing efforts and competitive landscape" },
        { title: "Strategy Development", description: "Create integrated marketing strategy across all relevant channels" },
        { title: "Campaign Execution", description: "Launch and manage campaigns with continuous optimization" },
        { title: "Performance Monitoring", description: "Track results and provide detailed reporting with recommendations" }
      ],
      portfolio: [
        {
          title: "B2B Lead Generation Campaign",
          description: "Generated 500+ qualified leads for software company",
          image: "https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f",
          imageAlt: "Business professionals in meeting room reviewing lead generation reports and conversion metrics"
        },
        {
          title: "E-commerce Growth Campaign",
          description: "Increased online sales by 250% for retail client",
          image: "https://images.unsplash.com/photo-1573311525852-81c1a0b8d03c",
          imageAlt: "E-commerce analytics dashboard showing sales growth charts and customer acquisition metrics"
        }
      ],
      included: [
        "Marketing strategy document",
        "Campaign setup & management",
        "Content creation",
        "Monthly performance reports",
        "Ongoing optimization"
      ],
      timeline: "2-3 weeks",
      teamSize: "3-5 marketers",
      revisions: "2 rounds",
      support: "Ongoing",
      documentation: true,
      training: false,
      guarantee: false,
      prioritySupport: true
    },
    {
      id: 4,
      title: "UI/UX Design Services",
      category: "Design",
      description: "Create intuitive, beautiful user experiences that delight your customers.",
      fullDescription: `Our UI/UX Design Services focus on creating user-centered designs that not only look beautiful but also provide exceptional user experiences. We combine aesthetic excellence with usability principles to create interfaces that users love and businesses benefit from.\n\nOur design process is rooted in user research and testing, ensuring that every design decision is backed by data and user feedback. From wireframes to high-fidelity prototypes, we create designs that are both visually stunning and functionally superior.`,
      image: "https://images.unsplash.com/photo-1495335560926-1636395e96e9",
      imageAlt: "UX designer sketching wireframes on paper while reviewing colorful interface mockups on computer screen",
      icon: "Palette",
      pricing: { display: "$8,000", period: "project", note: "Includes 3 design concepts" },
      features: [
        "User research & personas",
        "Wireframing & prototyping",
        "Visual design & branding",
        "Usability testing",
        "Design system creation",
        "Developer handoff"
      ],
      stats: { projects: "180+", satisfaction: "97%", timeline: "6-8 weeks" },
      isPopular: false,
      process: [
        { title: "Research & Discovery", description: "User research, competitive analysis, and requirements gathering" },
        { title: "Wireframing & Prototyping", description: "Create low and high-fidelity wireframes and interactive prototypes" },
        { title: "Visual Design", description: "Develop visual design language and create pixel-perfect mockups" },
        { title: "Testing & Refinement", description: "Conduct usability testing and refine designs based on feedback" }
      ],
      portfolio: [
        {
          title: "Mobile Banking App",
          description: "Redesigned mobile app increasing user engagement by 40%",
          image: "https://images.unsplash.com/photo-1687168644714-3343aa9b5af8",
          imageAlt: "Smartphone displaying modern banking app interface with clean design and financial dashboard"
        },
        {
          title: "SaaS Dashboard Redesign",
          description: "Improved dashboard usability reducing support tickets by 60%",
          image: "https://images.unsplash.com/photo-1724833256463-26b199dc1b69",
          imageAlt: "Computer monitor showing modern SaaS dashboard with clean interface and data visualization charts"
        }
      ],
      included: [
        "User research report",
        "Wireframes & prototypes",
        "Visual design mockups",
        "Design system documentation",
        "Developer handoff package"
      ],
      timeline: "6-8 weeks",
      teamSize: "2-3 designers",
      revisions: "3 rounds",
      support: "30 days",
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: false
    },
    {
      id: 5,
      title: "Process Automation",
      category: "Automation",
      description: "Streamline operations with intelligent automation solutions.",
      fullDescription: `Our Process Automation service helps businesses eliminate manual, repetitive tasks and streamline operations through intelligent automation solutions. We identify automation opportunities and implement solutions that reduce costs, improve accuracy, and free up your team for higher-value work.\n\nFrom simple workflow automation to complex business process optimization, we design and implement solutions that integrate seamlessly with your existing systems and processes. Our automation solutions are scalable, maintainable, and designed to grow with your business.`,
      image: "https://images.unsplash.com/photo-1679625321680-18e400172256",
      imageAlt: "Robotic process automation interface showing workflow diagrams and automated task sequences on computer screen",
      icon: "Zap",
      pricing: { display: "$12,000", period: "project", note: "ROI typically achieved within 6 months" },
      features: [
        "Process analysis & mapping",
        "Workflow automation design",
        "System integration",
        "Custom automation tools",
        "Performance monitoring",
        "Continuous optimization"
      ],
      stats: { projects: "120+", satisfaction: "99%", timeline: "4-8 weeks" },
      isPopular: true,
      process: [
        { title: "Process Assessment", description: "Analyze current processes and identify automation opportunities" },
        { title: "Solution Design", description: "Design automation workflows and integration architecture" },
        { title: "Implementation", description: "Build and deploy automation solutions with thorough testing" },
        { title: "Optimization", description: "Monitor performance and continuously optimize automation rules" }
      ],
      portfolio: [
        {
          title: "Invoice Processing Automation",
          description: "Reduced invoice processing time by 85% for accounting firm",
          image: "https://images.unsplash.com/photo-1624957485490-87d607854977",
          imageAlt: "Automated invoice processing system showing digital documents flowing through approval workflow"
        },
        {
          title: "Customer Onboarding Automation",
          description: "Automated customer onboarding reducing manual work by 70%",
          image: "https://images.unsplash.com/photo-1669643470668-19d6fb1d3f21",
          imageAlt: "Customer onboarding dashboard showing automated workflow steps and progress tracking"
        }
      ],
      included: [
        "Process analysis report",
        "Automation solution development",
        "System integration",
        "Training & documentation",
        "60-day optimization period"
      ],
      timeline: "4-8 weeks",
      teamSize: "2-4 specialists",
      revisions: "2 rounds",
      support: "60 days",
      documentation: true,
      training: true,
      guarantee: true,
      prioritySupport: true
    },
    {
      id: 6,
      title: "Training & Development",
      category: "Training",
      description: "Upskill your team with customized training programs and workshops.",
      fullDescription: `Our Training & Development service provides customized learning solutions that help your team acquire new skills and improve performance. We design and deliver training programs that are engaging, practical, and directly applicable to your business needs.\n\nWhether you need technical training, leadership development, or process improvement workshops, our experienced trainers create learning experiences that stick. We use a variety of delivery methods including in-person workshops, online courses, and blended learning approaches to maximize learning outcomes.`,
      image: "https://images.unsplash.com/photo-1573165759995-5865a394a1aa",
      imageAlt: "Professional trainer conducting workshop with diverse group of employees in modern training room",
      icon: "GraduationCap",
      pricing: { display: "$2,500", period: "day", note: "Custom programs available" },
      features: [
        "Customized curriculum design",
        "Interactive workshops",
        "Online learning modules",
        "Skills assessment",
        "Progress tracking",
        "Certification programs"
      ],
      stats: { projects: "250+", satisfaction: "95%", timeline: "2-4 weeks" },
      isPopular: false,
      process: [
        { title: "Needs Assessment", description: "Identify skill gaps and training requirements" },
        { title: "Curriculum Development", description: "Design customized training materials and learning paths" },
        { title: "Training Delivery", description: "Conduct engaging training sessions with hands-on activities" },
        { title: "Follow-up & Support", description: "Provide ongoing support and measure training effectiveness" }
      ],
      portfolio: [
        {
          title: "Leadership Development Program",
          description: "Trained 50+ managers improving team performance by 30%",
          image: "https://images.unsplash.com/photo-1636518538588-99015eb2de4c",
          imageAlt: "Leadership training session with managers participating in team building exercises and discussions"
        },
        {
          title: "Technical Skills Bootcamp",
          description: "Upskilled development team on modern frameworks and tools",
          image: "https://images.unsplash.com/photo-1558301862-1281ab412ed3",
          imageAlt: "Technical training workshop with developers learning new programming concepts on laptops"
        }
      ],
      included: [
        "Training needs analysis",
        "Custom curriculum development",
        "Training materials & resources",
        "Skills assessment tools",
        "30-day follow-up support"
      ],
      timeline: "2-4 weeks",
      teamSize: "1-2 trainers",
      revisions: "2 rounds",
      support: "30 days",
      documentation: true,
      training: false,
      guarantee: false,
      prioritySupport: false
    }
  ];


  // Categories for filtering
  const categories = [
    { value: 'consulting', label: 'Consulting' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'automation', label: 'Automation' },
    { value: 'training', label: 'Training' }
  ];


  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = services?.filter((service) => {
      const matchesSearch = service?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        service?.features?.some((feature) => feature?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' ||
        service?.category?.toLowerCase() === selectedCategory?.toLowerCase();

      const matchesPriceRange = selectedPriceRange === 'all' ||
        selectedPriceRange === 'budget' && parseInt(service?.pricing?.display?.replace(/[^0-9]/g, '')) < 5000 ||
        selectedPriceRange === 'standard' && parseInt(service?.pricing?.display?.replace(/[^0-9]/g, '')) >= 5000 && parseInt(service?.pricing?.display?.replace(/[^0-9]/g, '')) < 15000 ||
        selectedPriceRange === 'premium' && parseInt(service?.pricing?.display?.replace(/[^0-9]/g, '')) >= 15000 ||
        selectedPriceRange === 'custom' && service?.pricing?.note?.includes('varies');

      return matchesSearch && matchesCategory && matchesPriceRange;
    });

    // Sort services
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a?.pricing?.display?.replace(/[^0-9]/g, '')) - parseInt(b?.pricing?.display?.replace(/[^0-9]/g, ''));
        case 'price-high':
          return parseInt(b?.pricing?.display?.replace(/[^0-9]/g, '')) - parseInt(a?.pricing?.display?.replace(/[^0-9]/g, ''));
        case 'name':
          return a?.title?.localeCompare(b?.title);
        case 'newest':
          return b?.id - a?.id;
        case 'popularity':
        default:
          return (b?.isPopular ? 1 : 0) - (a?.isPopular ? 1 : 0) || (parseInt(b?.stats?.projects) || 0) - (parseInt(a?.stats?.projects) || 0);
      }
    });

    return filtered;
  }, [services, searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedPriceRange !== 'all') count++;
    return count;
  }, [searchTerm, selectedCategory, selectedPriceRange]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSortBy('popularity');
  };

  // Handle service actions
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setModalType('details');
    setIsModalOpen(true);
  };

  const handleGetQuote = (service) => {
    setSelectedService(service);
    setModalType('quote');
    setIsModalOpen(true);
  };

  const handleCompareServices = () => {
    if (comparisonServices?.length >= 2) {
      setShowComparison(true);
    }
  };

  const toggleServiceComparison = (service) => {
    setComparisonServices((prev) => {
      const exists = prev?.find((s) => s?.id === service?.id);
      if (exists) {
        return prev?.filter((s) => s?.id !== service?.id);
      } else if (prev?.length < 3) {
        return [...prev, service];
      }
      return prev;
    });
  };

  return (
    <>
      <Helmet>
        <title>Professional Services - ServiceHub Pro</title>
        <meta name="description" content="Discover our comprehensive range of professional services including consulting, development, marketing, design, automation, and training solutions." />
        <meta name="keywords" content="business consulting, software development, digital marketing, UI/UX design, process automation, training" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-primary rounded-2xl shadow-professional">
                  <Icon name="Briefcase" size={32} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Professional Services
                <span className="block text-primary">That Drive Results</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Transform your business with our comprehensive suite of professional services.
                From strategic consulting to cutting-edge development, we deliver solutions that matter.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Expert Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ROI Calculator Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between bg-card rounded-2xl p-6 shadow-professional">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Icon name="Calculator" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Calculate Your ROI</h3>
                    <p className="text-muted-foreground">See the potential return on your service investment</p>
                  </div>
                </div>
                <Button
                  variant={showROICalculator ? "outline" : "default"}
                  iconName={showROICalculator ? "ChevronUp" : "Calculator"}
                  iconPosition="left"
                  onClick={() => setShowROICalculator(!showROICalculator)}
                >
                  {showROICalculator ? "Hide Calculator" : "Show Calculator"}
                </Button>
              </div>
            </motion.div>

            {/* ROI Calculator */}
            {showROICalculator && <ROICalculator />}

            {/* Service Filters */}
            <ServiceFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearFilters={clearFilters}
              categories={categories}
              activeFiltersCount={activeFiltersCount}
            />


            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredServices?.length} Service{filteredServices?.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-muted-foreground">
                  {activeFiltersCount > 0 ? `Filtered by ${activeFiltersCount} criteria` : 'Showing all services'}
                </p>
              </div>

              {/* Comparison Toggle */}
              {comparisonServices?.length > 0 &&
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    {comparisonServices?.length} selected for comparison
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="GitCompare"
                    iconPosition="left"
                    onClick={handleCompareServices}
                    disabled={comparisonServices?.length < 2}
                  >
                    Compare Services
                  </Button>
                </div>
              }
            </div>

            {/* Services Grid */}
            {filteredServices?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices?.map((service, index) =>
                  <div key={service?.id} className="relative">
                    <ServiceCard
                      service={service}
                      onLearnMore={handleLearnMore}
                      onGetQuote={handleGetQuote}
                      index={index}
                    />

                    {/* Comparison Checkbox */}
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => toggleServiceComparison(service)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          comparisonServices?.find((s) => s?.id === service?.id) ?
                            'bg-primary text-primary-foreground' :
                            'bg-white/80 text-muted-foreground hover:bg-white'}`}
                        title="Add to comparison"
                      >
                        <Icon name="GitCompare" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div> :

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Services Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            }

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Don't See What You Need?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We offer custom solutions tailored to your specific requirements.
                Let's discuss how we can help your business succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="animate-elastic-hover"
                >
                  Schedule Consultation
                </Button>
                <Button
                  variant="outline"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Us Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Modal */}
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
        />

        {/* Service Comparison Modal */}
        {showComparison &&
          <ServiceComparison
            services={comparisonServices}
            onClose={() => setShowComparison(false)}
          />
        }
      </div>
    </>
  );

};

export default ServicesPage;