import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import market from '../../../assets/images/market.jpeg';
import app from '../../../assets/images/app.jpeg';
import web from '../../../assets/images/web.jpeg';
import graphic from '../../../assets/images/graphic.jpeg';

gsap?.registerPlugin(ScrollTrigger);

const ServicesPreview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeService, setActiveService] = useState(0);

  const services = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Comprehensive digital marketing solutions to boost your online presence and drive measurable results.",
    icon: "Megaphone",
    image: market,
    imageAlt: "Digital marketing dashboard showing various social media and marketing metrics",
    features: [
      "Social Media Marketing",
      "Google Ads & PPC",
      "SEO Optimization",
      "Email Marketing",
      "WhatsApp Marketing",
      "LinkedIn Ads"
    ],
    results: "200% average ROI for clients"
  },
  {
    id: 2,
    title: "Web Development",
    description: "Custom, responsive, and scalable website solutions that deliver exceptional user experiences.",
    icon: "Globe",
    image:web,
    imageAlt: "Web development workspace with responsive design layouts",
    features: [
      "Custom Website Development",
      "E-commerce Solutions",
      "CMS Integration",
      "Responsive Design",
      "Performance Optimization",
      "Website Maintenance"
    ],
    results: "98% client satisfaction rate"
  },
  {
    id: 3,
    title: "App Development",
    description: "Native and cross-platform mobile applications that engage users and drive business growth.",
    icon: "Smartphone",
    image: app,
    imageAlt: "Mobile app development process showing multiple device screens",
    features: [
      "iOS Development",
      "Android Development",
      "Cross-Platform Apps",
      "UI/UX Design",
      "App Testing",
      "Maintenance & Support"
    ],
    results: "1M+ app downloads achieved"
  },
  {
    id: 4,
    title: "Graphic Design",
    description: "Creative visual solutions that strengthen your brand identity and communicate your message effectively.",
    icon: "Pen",
    image: graphic,
    imageAlt: "Graphic design workspace with branding materials and design tools",
    features: [
      "Brand Identity Design",
      "Logo Design",
      "Marketing Materials",
      "Social Media Graphics",
      "Print Design",
      "Motion Graphics"
    ],
    results: "500+ brands designed"
  }];


  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Title animation
      gsap?.from(titleRef?.current, {
        
        opacity: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards stagger animation
      gsap?.from(cardsRef?.current, {
      
        opacity:100,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef?.current?.includes(el)) {
      cardsRef?.current?.push(el);
    }
  };

  return (
    <section ref={sectionRef} className=" bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6">

            Our <span className="bg-gradient-primary bg-clip-text text-white">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions designed to transform your business and drive measurable results through innovation and expertise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services?.map((service, index) =>
          <div
            key={service?.id}
            ref={addToCardsRef}
            className={`group relative bg-card rounded-2xl p-6 shadow-professional hover:shadow-professional-lg transition-all duration-300 cursor-pointer animate-elastic-hover ${
            activeService === index ? 'ring-2 ring-primary' : ''}`
            }
            onMouseEnter={() => setActiveService(index)}>

              {/* Service Icon */}
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name={service?.icon} size={24} color="white" />
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {service?.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {service?.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {service?.features?.slice(0, 2)?.map((feature, idx) =>
              <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-success mr-2" />
                    {feature}
                  </li>
              )}
              </ul>

              {/* Results Badge */}
              <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium mb-4">
                {service?.results}
              </div>

              {/* CTA */}
              <Button
              variant="outline"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">

                Learn More
              </Button>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
            </div>
          )}
        </div>

        {/* Featured Service Detail */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-professional-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Service Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-professional">
                <Image
                  src={services?.[activeService]?.image}
                  alt={services?.[activeService]?.imageAlt}
                  className="w-full h-80 object-cover" />

              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-professional-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name={services?.[activeService]?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">Featured</div>
                    <div className="text-sm text-muted-foreground">Service</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {services?.[activeService]?.title}
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6">
                {services?.[activeService]?.description}
              </p>

              {/* All Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {services?.[activeService]?.features?.map((feature, idx) =>
                <div key={idx} className="flex items-center">
                    <Icon name="Check" size={16} className="text-success mr-3" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  className="animate-elastic-hover">

                  Get Started
                </Button>
                
                <Link to="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="animate-elastic-hover">

                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ServicesPreview;