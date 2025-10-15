import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  const contactMethods = [
    {
      id: 1,
      icon: 'Phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST',
      color: 'text-primary'
    },
    {
      id: 2,
      icon: 'Mail',
      title: 'Email',
      value: 'hello@servicehubpro.com',
      description: 'We respond within 2 hours',
      color: 'text-secondary'
    },
    {
      id: 3,
      icon: 'MessageCircle',
      title: 'Live Chat',
      value: 'Available Now',
      description: 'Instant support online',
      color: 'text-accent'
    },
    {
      id: 4,
      icon: 'Video',
      title: 'Video Call',
      value: 'Schedule Meeting',
      description: 'Face-to-face consultation',
      color: 'text-success'
    }
  ];

  return (
    <section className="relative bg-gradient-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping opacity-20"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
              <Icon name="Zap" size={16} className="mr-2" />
              Let's Connect
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Ready to Transform
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Your Business?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with our experts through your preferred channel. We're here to understand your unique challenges and craft solutions that drive measurable results.
          </motion.p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods?.map((method, index) => (
            <motion.div
              key={method?.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 animate-elastic-hover border border-white/20"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 ${method?.color} mb-4`}>
                <Icon name={method?.icon} size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{method?.title}</h3>
              <p className="text-white font-medium mb-1">{method?.value}</p>
              <p className="text-white/70 text-sm">{method?.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactHero;