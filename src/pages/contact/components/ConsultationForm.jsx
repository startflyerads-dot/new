import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    serviceType: '',
    projectBudget: '',
    timeline: '',
    description: '',
    preferredContact: '',
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const industryOptions = [
    { value: 'technology', label: 'Technology & Software' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'education', label: 'Education' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'other', label: 'Other' }
  ];

  const serviceOptions = [
    { value: 'strategy', label: 'Business Strategy Consulting' },
    { value: 'digital', label: 'Digital Transformation' },
    { value: 'operations', label: 'Operations Optimization' },
    { value: 'marketing', label: 'Marketing & Growth' },
    { value: 'technology', label: 'Technology Implementation' },
    { value: 'training', label: 'Training & Development' },
    { value: 'audit', label: 'Business Audit' },
    { value: 'custom', label: 'Custom Solution' }
  ];

  const budgetOptions = [
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: '250k+', label: '$250,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 30 days)' },
    { value: '1-3months', label: '1-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: '6-12months', label: '6-12 Months' },
    { value: '12months+', label: '12+ Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Conference' },
    { value: 'in-person', label: 'In-Person Meeting' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.company?.trim()) newErrors.company = 'Company name is required';
    if (!formData?.industry) newErrors.industry = 'Please select your industry';
    if (!formData?.serviceType) newErrors.serviceType = 'Please select a service type';
    if (!formData?.description?.trim()) newErrors.description = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-professional-xl p-8 lg:p-12 text-center"
          >
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} color="var(--color-success)" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your consultation request has been received. Our team will review your information and contact you within 24 hours to schedule your personalized consultation.
            </p>
            <div className="bg-muted rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-muted-foreground">We'll review your requirements and prepare a customized consultation agenda</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-muted-foreground">Our expert will contact you to schedule a convenient time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-muted-foreground">We'll conduct a comprehensive consultation and provide actionable recommendations</p>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Schedule Your Free Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and goals. We'll provide personalized recommendations and a detailed proposal tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-professional-xl p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="User" size={20} className="mr-2 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  error={errors?.firstName}
                  required
                  placeholder="Enter your first name"
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                  error={errors?.lastName}
                  required
                  placeholder="Enter your last name"
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  required
                  placeholder="your.email@company.com"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  error={errors?.phone}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Building" size={20} className="mr-2 text-primary" />
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company Name"
                  type="text"
                  name="company"
                  value={formData?.company}
                  onChange={handleInputChange}
                  error={errors?.company}
                  required
                  placeholder="Your company name"
                />
                <Select
                  label="Industry"
                  options={industryOptions}
                  value={formData?.industry}
                  onChange={(value) => handleSelectChange('industry', value)}
                  error={errors?.industry}
                  required
                  placeholder="Select your industry"
                />
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Briefcase" size={20} className="mr-2 text-primary" />
                Project Details
              </h3>
              <div className="space-y-6">
                <Select
                  label="Service Type"
                  options={serviceOptions}
                  value={formData?.serviceType}
                  onChange={(value) => handleSelectChange('serviceType', value)}
                  error={errors?.serviceType}
                  required
                  placeholder="Select the service you need"
                  searchable
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Project Budget"
                    options={budgetOptions}
                    value={formData?.projectBudget}
                    onChange={(value) => handleSelectChange('projectBudget', value)}
                    placeholder="Select your budget range"
                  />
                  <Select
                    label="Timeline"
                    options={timelineOptions}
                    value={formData?.timeline}
                    onChange={(value) => handleSelectChange('timeline', value)}
                    placeholder="When do you need this completed?"
                  />
                </div>
                <Input
                  label="Project Description"
                  type="text"
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  error={errors?.description}
                  required
                  placeholder="Describe your project, challenges, and goals in detail..."
                  className="min-h-32"
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Icon name="Settings" size={20} className="mr-2 text-primary" />
                Communication Preferences
              </h3>
              <div className="space-y-6">
                <Select
                  label="Preferred Contact Method"
                  options={contactOptions}
                  value={formData?.preferredContact}
                  onChange={(value) => handleSelectChange('preferredContact', value)}
                  placeholder="How would you like us to contact you?"
                />
                <Checkbox
                  label="Subscribe to our newsletter for industry insights and updates"
                  checked={formData?.newsletter}
                  onChange={handleInputChange}
                  name="newsletter"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-border">
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                fullWidth
                className="shadow-professional"
              >
                {isSubmitting ? 'Submitting Request...' : 'Schedule Free Consultation'}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationForm;