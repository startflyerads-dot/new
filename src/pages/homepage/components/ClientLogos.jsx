import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

gsap?.registerPlugin(ScrollTrigger);

const ClientLogos = () => {
  const sectionRef = useRef(null);
  const logoRowsRef = useRef([]);
  const [hoveredClient, setHoveredClient] = useState(null);
  const navigate = useNavigate(); // added navigate

  const clients = [
  {
    id: 1,
    name: "TechVision Inc.",
    logo: "https://images.unsplash.com/photo-1711509424072-70600119ab46",
    logoAlt: "TechVision Inc. company logo featuring modern geometric design in blue and white colors",
    industry: "Technology",
    partnership: "3 years",
    projects: 12,
    satisfaction: 98,
    metrics: {
      improvement: "+300%",
      metric: "Efficiency"
    }
  },
  {
    id: 2,
    name: "InnovateLabs",
    logo: "https://images.unsplash.com/photo-1678995634665-8d247af642ca",
    logoAlt: "InnovateLabs company logo with stylized laboratory flask and circuit pattern in green and gray",
    industry: "Research & Development",
    partnership: "2 years",
    projects: 8,
    satisfaction: 96,
    metrics: {
      improvement: "+50%",
      metric: "Development Speed"
    }
  },
  {
    id: 3,
    name: "GrowthCorp",
    logo: "https://images.unsplash.com/photo-1660063093662-1f76f500f0ff",
    logoAlt: "GrowthCorp company logo featuring upward arrow and corporate typography in navy blue and gold",
    industry: "Business Consulting",
    partnership: "4 years",
    projects: 15,
    satisfaction: 99,
    metrics: {
      improvement: "+180%",
      metric: "Revenue Growth"
    }
  },
  {
    id: 4,
    name: "DataFlow Systems",
    logo: "https://images.unsplash.com/photo-1728305932524-4abdb62bf11d",
    logoAlt: "DataFlow Systems logo with interconnected nodes and data stream visualization in purple and silver",
    industry: "Data Analytics",
    partnership: "1 year",
    projects: 6,
    satisfaction: 95,
    metrics: {
      improvement: "+220%",
      metric: "Data Processing"
    }
  },
  {
    id: 5,
    name: "CloudTech Solutions",
    logo: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d",
    logoAlt: "CloudTech Solutions logo featuring cloud icon with digital connectivity lines in light blue and white",
    industry: "Cloud Computing",
    partnership: "2 years",
    projects: 10,
    satisfaction: 97,
    metrics: {
      improvement: "+150%",
      metric: "Scalability"
    }
  },
  {
    id: 6,
    name: "SecureNet Corp",
    logo: "https://images.unsplash.com/photo-1662338035130-516cb712005a",
    logoAlt: "SecureNet Corp logo with shield and network security symbols in dark red and black colors",
    industry: "Cybersecurity",
    partnership: "3 years",
    projects: 14,
    satisfaction: 100,
    metrics: {
      improvement: "+400%",
      metric: "Security Score"
    }
  }];

  const stats = [
    {
      value: "10+",
      label: "Happy Clients",
      color: "text-primary"
    },
    {
      value: "98%",
      label: "Satisfaction Rate", 
      color: "text-success"
    },
    {
      value: "50+",
      label: "Projects Delivered",
      color: "text-warning"
    },
    {
      value: "15+",
      label: "Industries Served",
      color: "text-secondary"
    }
  ];

  // Duplicate clients for seamless scrolling
  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Section entrance animation
      gsap?.from(sectionRef?.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Continuous scrolling animation for logo rows
      logoRowsRef?.current?.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? -1 : 1;
          const duration = 30 + index * 5;

          gsap?.to(row, {
            x: direction * (row?.scrollWidth / 2),
            duration: duration,
            ease: "none",
            repeat: -1
          });
        }
      });

    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const addToLogoRowsRef = (el) => {
    if (el && !logoRowsRef?.current?.includes(el)) {
      logoRowsRef?.current?.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by <span className="bg-gradient-primary bg-clip-text text-white">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of successful companies that have transformed their operations with our innovative solutions and expert guidance.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
       {/* Scrolling Logo Rows */}
       
        

        {/* CTA Section */}
       <div className="text-center mt-16">
  <h3 className="text-2xl font-bold text-white mb-4">
    Ready to Join Our [translate:Client Success Stories]?
  </h3>
  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
    Discover how we can help transform your business with our proven solutions and expert guidance.
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    
    <button
      onClick={() => navigate('/contact')} // navigate to contact / schedule page
      className="border border-primary text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 animate-elastic-hover bg-gradient-primary hover:opacity-90 shadow-professional"
    >
      Schedule Consultation
    </button>
  </div>
</div>

      </div>
    </section>);

};

export default ClientLogos;