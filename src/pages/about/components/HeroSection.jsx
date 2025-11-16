import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const stats = [
    { number: "1+", label: "Years of Excellence", icon: "Award" },
    { number: "50+", label: "Projects Delivered", icon: "CheckCircle" },
    { number: "98%", label: "Client Satisfaction", icon: "Heart" },
    { number: "15+", label: "Industries Served", icon: "Trophy" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-warning/20 rounded-full animate-ping"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About <span className="text-accent">ServiceHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Where professional excellence meets cutting-edge digital innovation. We transform 
            traditional service delivery into extraordinary experiences that drive measurable results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats?.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-full mx-auto mb-4">
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat?.number}</div>
              <div className="text-white/80 text-sm">{stat?.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <Icon name="Zap" size={20} color="white" />
            <span className="text-white font-medium">Excellence through Innovation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;