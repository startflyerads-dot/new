import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ServiceModal = ({ service, isOpen, onClose, type = 'details' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const budgetOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '3-months', label: 'Within 3 months' },
    { value: '6-months', label: 'Within 6 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'process', label: 'Process', icon: 'GitBranch' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' }
  ];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-card rounded-2xl shadow-professional-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Icon name={service?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{service?.title}</h2>
                  <p className="text-muted-foreground">{service?.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={onClose}
              />
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
              {/* Content Area */}
              <div className="flex-1 overflow-auto">
                {type === 'details' ? (
                  <div className="p-6">
                    {/* Tabs */}
                    <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            activeTab === tab?.id
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon name={tab?.icon} size={16} />
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeTab === 'overview' && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-3">Service Description</h3>
                              <p className="text-muted-foreground leading-relaxed">{service?.fullDescription}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {service?.features?.map((feature, index) => (
                                  <div key={index} className="flex items-center space-x-3">
                                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{service?.stats?.projects}</div>
                                <div className="text-sm text-muted-foreground">Completed Projects</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{service?.stats?.satisfaction}</div>
                                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{service?.stats?.timeline}</div>
                                <div className="text-sm text-muted-foreground">Average Timeline</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'process' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-foreground">Our Process</h3>
                            <div className="space-y-4">
                              {service?.process?.map((step, index) => (
                                <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-1">{step?.title}</h4>
                                    <p className="text-muted-foreground text-sm">{step?.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === 'portfolio' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-foreground">Recent Projects</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {service?.portfolio?.map((project, index) => (
                                <div key={index} className="bg-muted/30 rounded-lg overflow-hidden">
                                  <Image
                                    src={project?.image}
                                    alt={project?.imageAlt}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="p-4">
                                    <h4 className="font-semibold text-foreground mb-1">{project?.title}</h4>
                                    <p className="text-sm text-muted-foreground">{project?.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeTab === 'pricing' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-foreground">Pricing Details</h3>
                            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
                              <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-primary">{service?.pricing?.display}</div>
                                {service?.pricing?.period && (
                                  <div className="text-muted-foreground">/{service?.pricing?.period}</div>
                                )}
                              </div>
                              {service?.pricing?.note && (
                                <p className="text-sm text-muted-foreground text-center">{service?.pricing?.note}</p>
                              )}
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground">What's Included:</h4>
                              {service?.included?.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Get a Quote for {service?.title}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData?.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <Input
                        label="Company Name"
                        type="text"
                        name="company"
                        value={formData?.company}
                        onChange={handleInputChange}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                          label="Budget Range"
                          options={budgetOptions}
                          value={formData?.budget}
                          onChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                        />
                        <Select
                          label="Timeline"
                          options={timelineOptions}
                          value={formData?.timeline}
                          onChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Project Details
                        </label>
                        <textarea
                          name="message"
                          value={formData?.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Tell us about your project requirements..."
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="default"
                        fullWidth
                        iconName="Send"
                        iconPosition="left"
                      >
                        Send Quote Request
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-80 border-l border-border bg-muted/20 p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button
                        variant="default"
                        fullWidth
                        iconName="MessageSquare"
                        iconPosition="left"
                        onClick={() => type !== 'quote' && onClose()}
                      >
                        Get Quote
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Calendar"
                        iconPosition="left"
                      >
                        Schedule Call
                      </Button>
                      <Button
                        variant="ghost"
                        fullWidth
                        iconName="Download"
                        iconPosition="left"
                      >
                        Download Brochure
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Service Highlights</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Avg. {service?.stats?.timeline} delivery</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">{service?.stats?.projects} completed projects</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Star" size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">{service?.stats?.satisfaction} satisfaction rate</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Need Help?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Have questions about this service? Our experts are here to help.
                    </p>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Phone"
                      iconPosition="left"
                    >
                      Call Us Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;