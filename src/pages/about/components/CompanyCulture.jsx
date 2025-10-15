import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyCulture = () => {
  const [activeTab, setActiveTab] = useState('values');

  const cultureData = {
    values: {
      title: "Our Core Values",
      subtitle: "The principles that guide everything we do",
      items: [
      {
        icon: "Target",
        title: "Excellence through Innovation",
        description: "We constantly push boundaries to deliver exceptional results that exceed expectations and set new industry standards.",
        color: "bg-primary"
      },
      {
        icon: "Users",
        title: "Client-Centric Approach",
        description: "Every decision we make is guided by our commitment to creating value and success for our clients.",
        color: "bg-secondary"
      },
      {
        icon: "Shield",
        title: "Trust & Transparency",
        description: "We build lasting relationships through honest communication, reliable delivery, and unwavering integrity.",
        color: "bg-accent"
      },
      {
        icon: "Zap",
        title: "Continuous Learning",
        description: "We embrace change, invest in growth, and constantly evolve to stay ahead of industry trends.",
        color: "bg-warning"
      }]

    },
    workplace: {
      title: "Our Workplace",
      subtitle: "Where innovation meets collaboration",
      items: [
      {
        icon: "Coffee",
        title: "Flexible Work Environment",
        description: "Hybrid work model with state-of-the-art offices and remote work flexibility for optimal work-life balance.",
        image: "https://images.unsplash.com/photo-1680781336783-8382d382e892",
        imageAlt: "Modern open office space with collaborative workstations and natural lighting"
      },
      {
        icon: "Lightbulb",
        title: "Innovation Labs",
        description: "Dedicated spaces for experimentation, prototyping, and creative problem-solving with cutting-edge technology.",
        image: "https://images.unsplash.com/photo-1610018576043-968b9b6a816e",
        imageAlt: "High-tech innovation lab with whiteboards, computers, and creative workspace setup"
      },
      {
        icon: "Heart",
        title: "Wellness Programs",
        description: "Comprehensive health and wellness initiatives including fitness facilities, mental health support, and wellness days.",
        image: "https://images.unsplash.com/photo-1618562657509-5a746e5e779b",
        imageAlt: "Employees participating in wellness activities in modern fitness facility"
      },
      {
        icon: "BookOpen",
        title: "Learning & Development",
        description: "Continuous education programs, conference attendance, certification support, and skill development opportunities.",
        image: "https://images.unsplash.com/photo-1637743406724-cb5317472a84",
        imageAlt: "Professional training session with employees engaged in learning and development activities"
      }]

    },
    benefits: {
      title: "Employee Benefits",
      subtitle: "Comprehensive support for our team members",
      items: [
      {
        icon: "DollarSign",
        title: "Competitive Compensation",
        description: "Market-leading salaries with performance bonuses and equity participation for all team members.",
        stats: "15% above market average"
      },
      {
        icon: "Calendar",
        title: "Unlimited PTO",
        description: "Flexible time off policy that encourages work-life balance and personal well-being.",
        stats: "Average 25 days per year"
      },
      {
        icon: "GraduationCap",
        title: "Education Support",
        description: "Annual learning budget for courses, certifications, conferences, and professional development.",
        stats: "$5,000 per employee"
      },
      {
        icon: "Plane",
        title: "Travel Opportunities",
        description: "International project assignments and conference speaking opportunities worldwide.",
        stats: "15+ countries"
      }]

    }
  };

  const tabs = [
  { key: 'values', label: 'Values', icon: 'Heart' },
  { key: 'workplace', label: 'Workplace', icon: 'Building' },
  { key: 'benefits', label: 'Benefits', icon: 'Gift' }];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Company Culture</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A culture of innovation, collaboration, and excellence that empowers our team 
            to deliver extraordinary results while growing personally and professionally.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-2xl p-2 inline-flex">
            {tabs?.map((tab) =>
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === tab?.key ?
              'bg-primary text-primary-foreground shadow-professional' :
              'text-muted-foreground hover:text-foreground'}`
              }>

                <Icon name={tab?.icon} size={20} />
                <span>{tab?.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {cultureData?.[activeTab]?.title}
            </h3>
            <p className="text-lg text-muted-foreground">
              {cultureData?.[activeTab]?.subtitle}
            </p>
          </div>

          {activeTab === 'values' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureData?.values?.items?.map((item, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-professional hover:shadow-professional-lg transition-all duration-300 border border-border">

                  <div className={`w-16 h-16 ${item?.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon name={item?.icon} size={28} color="white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">{item?.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item?.description}</p>
                </motion.div>
            )}
            </div>
          }

          {activeTab === 'workplace' &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cultureData?.workplace?.items?.map((item, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-professional hover:shadow-professional-lg transition-all duration-300 border border-border">

                  <div className="h-48 overflow-hidden">
                    <Image
                  src={item?.image}
                  alt={item?.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />

                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <Icon name={item?.icon} size={24} color="white" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground">{item?.title}</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item?.description}</p>
                  </div>
                </motion.div>
            )}
            </div>
          }

          {activeTab === 'benefits' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureData?.benefits?.items?.map((item, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-professional hover:shadow-professional-lg transition-all duration-300 border border-border group">

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name={item?.icon} size={28} color="white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{item?.stats}</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">{item?.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item?.description}</p>
                </motion.div>
            )}
            </div>
          }
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16">

          <div className="bg-gradient-primary rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Team?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of a culture that values innovation, growth, and making a meaningful impact 
              in the professional services industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2">
                <Icon name="Users" size={20} />
                <span>View Open Positions</span>
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2">
                <Icon name="Mail" size={20} />
                <span>Contact HR</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default CompanyCulture;