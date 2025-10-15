import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceComparison = ({ services, onClose }) => {
  const [selectedServices, setSelectedServices] = useState(services.slice(0, 3));

  const comparisonFeatures = [
    'Project Timeline',
    'Team Size',
    'Revisions Included',
    'Support Duration',
    'Documentation',
    'Training Included',
    'Money-back Guarantee',
    'Priority Support'
  ];

  const getFeatureValue = (service, feature) => {
    const featureMap = {
      'Project Timeline': service.timeline || '2-4 weeks',
      'Team Size': service.teamSize || '3-5 experts',
      'Revisions Included': service.revisions || '3 rounds',
      'Support Duration': service.support || '30 days',
      'Documentation': service.documentation ? 'Included' : 'Not included',
      'Training Included': service.training ? 'Yes' : 'No',
      'Money-back Guarantee': service.guarantee ? '30 days' : 'No',
      'Priority Support': service.prioritySupport ? 'Yes' : 'No'
    };
    return featureMap[feature] || 'N/A';
  };

  const removeService = (serviceId) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-2xl shadow-professional-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="GitCompare" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Service Comparison</h2>
                <p className="text-muted-foreground">Compare features and pricing side by side</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Comparison Table */}
          <div className="overflow-auto max-h-[calc(90vh-120px)]">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Features Column */}
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    <div className="h-32 flex items-end pb-4">
                      <h3 className="text-lg font-semibold text-foreground">Features</h3>
                    </div>
                    
                    {/* Pricing Row */}
                    <div className="py-4 border-b border-border">
                      <span className="font-semibold text-foreground">Pricing</span>
                    </div>
                    
                    {comparisonFeatures.map((feature, index) => (
                      <div key={index} className="py-4 border-b border-border">
                        <span className="text-sm font-medium text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Columns */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedServices.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      {/* Service Header */}
                      <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 h-32">
                        <button
                          onClick={() => removeService(service.id)}
                          className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                        >
                          <Icon name="X" size={16} />
                        </button>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <Icon name={service.icon} size={20} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{service.title}</h4>
                            <span className="text-xs text-primary font-medium">{service.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="py-4 border-b border-border text-center">
                        <div className="text-2xl font-bold text-primary">{service.pricing.display}</div>
                        {service.pricing.period && (
                          <div className="text-sm text-muted-foreground">/{service.pricing.period}</div>
                        )}
                      </div>

                      {/* Feature Values */}
                      {comparisonFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="py-4 border-b border-border text-center">
                          <span className="text-sm text-foreground">
                            {getFeatureValue(service, feature)}
                          </span>
                        </div>
                      ))}

                      {/* Action Button */}
                      <div className="pt-4">
                        <Button
                          variant="default"
                          fullWidth
                          iconName="MessageSquare"
                          iconPosition="left"
                        >
                          Get Quote
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceComparison;