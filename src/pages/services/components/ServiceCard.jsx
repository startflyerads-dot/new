import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onLearnMore, onGetQuote, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-professional hover:shadow-professional-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Service Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {service?.category}
          </span>
        </div>

        {/* Popularity Badge */}
        {service?.isPopular && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              <Icon name="Star" size={12} />
              <span>Popular</span>
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {service?.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {service?.description}
            </p>
          </div>
          <div className="ml-4 p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon name={service?.icon} size={20} />
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
          <div className="space-y-2">
            {service?.features?.slice(0, 3)?.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
       
      </div>
      {/* Hover Animation Ring */}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServiceCard;