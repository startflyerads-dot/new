import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyStory = () => {
  const milestones = [
  {
    year: "2009",
    title: "Foundation",
    description: "ServiceHub Pro was founded with a vision to revolutionize professional services through technology and innovation.",
    icon: "Rocket",
    image: "https://images.unsplash.com/photo-1635071247661-ede154087b09",
    imageAlt: "Modern office building with glass facade and professional architecture representing company foundation"
  },
  {
    year: "2012",
    title: "First Major Breakthrough",
    description: "Developed our proprietary service delivery methodology that increased client satisfaction by 40%.",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78",
    imageAlt: "Business team celebrating success with charts and graphs showing upward growth trends"
  },
  {
    year: "2015",
    title: "Industry Recognition",
    description: "Received our first industry award for innovation in service delivery and client experience.",
    icon: "Award",
    image: "https://images.unsplash.com/photo-1709622458866-3c11c473754b",
    imageAlt: "Golden trophy award on podium with spotlight highlighting achievement and recognition"
  },
  {
    year: "2018",
    title: "Digital Transformation",
    description: "Launched our digital platform, transforming how clients interact with professional services.",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1629195968955-e1a2a92b0c5c",
    imageAlt: "Modern digital workspace with multiple screens showing innovative technology solutions"
  },
  {
    year: "2021",
    title: "Global Expansion",
    description: "Expanded operations internationally, serving clients across 15 countries with localized expertise.",
    icon: "Globe",
    image: "https://images.unsplash.com/photo-1719386591547-37db3f0cf5d4",
    imageAlt: "World map with connected network lines showing global business expansion and international reach"
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Pioneered AI-powered service optimization, delivering unprecedented efficiency and results.",
    icon: "Brain",
    image: "https://images.unsplash.com/photo-1674027214993-52de23be5a18",
    imageAlt: "Futuristic AI visualization with neural networks and digital brain patterns representing artificial intelligence"
  }];


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
            Our Journey of <span className="text-primary">Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a small startup to an industry leader, our story is one of continuous innovation, 
            unwavering commitment to excellence, and the relentless pursuit of client success.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

          <div className="space-y-16">
            {milestones?.map((milestone, index) =>
            <motion.div
              key={milestone?.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`
              }>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-card rounded-2xl p-8 shadow-professional-lg border border-border hover:shadow-professional-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center ${
                    index % 2 === 0 ? 'ml-auto mr-4' : 'mr-auto ml-4'}`
                    }>
                        <Icon name={milestone?.icon} size={24} color="white" />
                      </div>
                      <div className="text-3xl font-bold text-primary">{milestone?.year}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{milestone?.title}</h3>
                    <p className="text-muted-foreground mb-6">{milestone?.description}</p>
                    <div className="overflow-hidden rounded-xl">
                      <Image
                      src={milestone?.image}
                      alt={milestone?.imageAlt}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />

                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-professional z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default CompanyStory;