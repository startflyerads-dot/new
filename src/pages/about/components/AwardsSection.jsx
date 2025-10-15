import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AwardsSection = () => {
  const awards = [
  {
    id: 1,
    title: "Best Professional Services Platform 2024",
    organization: "Industry Excellence Awards",
    year: "2024",
    description: "Recognized for outstanding innovation in service delivery and client experience transformation.",
    icon: "Trophy",
    image: "https://images.unsplash.com/photo-1709622458866-3c11c473754b",
    imageAlt: "Golden trophy award with spotlight highlighting achievement and professional recognition",
    category: "Innovation"
  },
  {
    id: 2,
    title: "Technology Innovation Leader",
    organization: "Tech Excellence Institute",
    year: "2023",
    description: "Awarded for pioneering AI-powered service optimization and digital transformation solutions.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1581618074289-3f208289c7d6",
    imageAlt: "Modern technology award ceremony with digital displays and innovation recognition",
    category: "Technology"
  },
  {
    id: 3,
    title: "Client Satisfaction Excellence",
    organization: "Customer Experience Awards",
    year: "2023",
    description: "Achieved 98% client satisfaction rate, setting new industry standards for service quality.",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1653538053216-bab7d6bb173d",
    imageAlt: "Crystal award trophy representing client satisfaction and service excellence",
    category: "Service"
  },
  {
    id: 4,
    title: "Sustainable Business Practices",
    organization: "Green Business Council",
    year: "2022",
    description: "Recognized for implementing environmentally responsible practices and carbon-neutral operations.",
    icon: "Leaf",
    image: "https://images.unsplash.com/photo-1693730333248-6e0f79b705f2",
    imageAlt: "Green sustainability award with eco-friendly design and environmental recognition",
    category: "Sustainability"
  },
  {
    id: 5,
    title: "Workplace Culture Excellence",
    organization: "Best Places to Work",
    year: "2022",
    description: "Honored for creating an inclusive, innovative workplace that empowers employee growth and success.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1733119673475-c7a31c393d42",
    imageAlt: "Team celebration with workplace culture award and diverse group of happy employees",
    category: "Culture"
  },
  {
    id: 6,
    title: "Digital Transformation Pioneer",
    organization: "Digital Innovation Awards",
    year: "2021",
    description: "Leading the industry in digital transformation methodologies and implementation excellence.",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1719891940645-84c490dd1405",
    imageAlt: "Digital transformation award with futuristic technology and innovation visualization",
    category: "Digital"
  }];


  const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management Systems",
    icon: "Shield",
    color: "bg-primary"
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    icon: "Lock",
    color: "bg-secondary"
  },
  {
    name: "SOC 2 Type II",
    description: "Security & Availability",
    icon: "CheckCircle",
    color: "bg-accent"
  },
  {
    name: "GDPR Compliant",
    description: "Data Protection Standards",
    icon: "Database",
    color: "bg-warning"
  }];


  const categories = ["All", "Innovation", "Technology", "Service", "Sustainability", "Culture", "Digital"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredAwards = activeCategory === "All" ?
  awards :
  awards?.filter((award) => award?.category === activeCategory);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Awards & <span className="text-primary">Recognition</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders and 
            organizations worldwide, validating our innovative approach and exceptional results.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories?.map((category) =>
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category ?
            'bg-primary text-primary-foreground shadow-professional' :
            'bg-card text-muted-foreground hover:text-primary hover:bg-muted'}`
            }>

              {category}
            </button>
          )}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredAwards?.map((award, index) =>
          <motion.div
            key={award?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl overflow-hidden shadow-professional hover:shadow-professional-xl transition-all duration-300 border border-border group">

              <div className="relative h-48 overflow-hidden">
                <Image
                src={award?.image}
                alt={award?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {award?.year}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Icon name={award?.icon} size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
                    {award?.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {award?.title}
                </h3>
                <p className="text-primary font-medium mb-3">{award?.organization}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {award?.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12">

          <h3 className="text-3xl font-bold text-foreground mb-4">
            Industry <span className="text-primary">Certifications</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality and security is validated through rigorous industry certifications 
            and compliance standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications?.map((cert, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 text-center shadow-professional hover:shadow-professional-lg transition-all duration-300 border border-border group">

              <div className={`w-16 h-16 ${cert?.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={cert?.icon} size={28} color="white" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">{cert?.name}</h4>
              <p className="text-muted-foreground text-sm">{cert?.description}</p>
            </motion.div>
          )}
        </div>

        {/* Recognition Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-primary rounded-3xl p-12 text-center">

          <h3 className="text-3xl font-bold text-white mb-8">
            Recognition by the Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Industry Awards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Certifications</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-white/80">Years Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AwardsSection;