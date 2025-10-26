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
    { value: '', label: 'Select Industry...', disabled: true },
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
    { value: '', label: 'Select Service...', disabled: true },
    { value: 'digital-marketing', label: 'Digital Marketing Strategy' },
    { value: 'social-media', label: 'Social Media Marketing' },
    { value: 'seo', label: 'SEO Optimization' },
    { value: 'ppc', label: 'PPC & Google Ads' },
    { value: 'content', label: 'Content Marketing' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'custom', label: 'Custom Marketing Solution' }
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget...', disabled: true },
    { value: '1k-3k', label: '$1,000 - $3,000 / month' },
    { value: '3k-5k', label: '$3,000 - $5,000 / month' },
    { value: '5k-10k', label: '$5,000 - $10,000 / month' },
    { value: '10k+', label: '$10,000+ / month' },
    { value: 'project', label: 'Project-based' },
    { value: 'discuss', label: "Let's Discuss" }
  ];

  const timelineOptions = [
    { value: '', label: 'Select Timeline...', disabled: true },
    { value: 'immediate', label: 'Immediate (Within 30 days)' },
    { value: '1-3months', label: '1-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: '6-12months', label: '6-12 Months' },
    { value: '12months+', label: '12+ Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const contactOptions = [
    { value: '', label: 'Select Contact Method...', disabled: true },
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
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.company?.trim()) newErrors.company = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Please select your industry';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
    if (!formData.description?.trim()) newErrors.description = 'Project description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(result.error || 'Failed to send email');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending email');
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-[#2A2A42]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center border border-white/20"
          >
            <div className="w-20 h-20 bg-[#e57b46]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-[#e57b46]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-white/80">
              Your request has been sent. Our experts will contact you within 24 hours.
            </p>
            <Button
              variant="default"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white mt-6"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#2A2A42]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Transform Your Digital Presence</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get a free marketing strategy session with our experts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} error={errors.firstName} placeholder="First Name" className="bg-white/5 border-white/20 text-white placeholder-white/50" />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} error={errors.lastName} placeholder="Last Name" className="bg-white/5 border-white/20 text-white placeholder-white/50" />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} placeholder="Email Address" className="bg-white/5 border-white/20 text-white placeholder-white/50" />
              <Input label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} placeholder="Phone Number" className="bg-white/5 border-white/20 text-white placeholder-white/50" />
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Company Name" name="company" value={formData.company} onChange={handleInputChange} error={errors.company} placeholder="Company Name" className="bg-white/5 border-white/20 text-white placeholder-white/50" />
              <Select
                label="Industry"
                options={industryOptions}
                value={formData.industry}
                onChange={(value) => handleSelectChange('industry', value)}
                error={errors.industry}
                placeholder="Select Industry"
                className="bg-white/5 border-white/20 text-white"
                optionsClassName="bg-[#2A2A42] border-white/20 text-white"
              />
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <Select
                label="Service Type"
                options={serviceOptions}
                value={formData.serviceType}
                onChange={(value) => handleSelectChange('serviceType', value)}
                error={errors.serviceType}
                placeholder="Select Service"
                className="bg-white/5 border-white/20 text-white"
                optionsClassName="bg-[#2A2A42] border-white/20 text-white"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Project Budget"
                  options={budgetOptions}
                  value={formData.projectBudget}
                  onChange={(value) => handleSelectChange('projectBudget', value)}
                  placeholder="Select Budget"
                  className="bg-white/5 border-white/20 text-white"
                  optionsClassName="bg-[#2A2A42] border-white/20 text-white"
                />
                <Select
                  label="Timeline"
                  options={timelineOptions}
                  value={formData.timeline}
                  onChange={(value) => handleSelectChange('timeline', value)}
                  placeholder="Select Timeline"
                  className="bg-white/5 border-white/20 text-white"
                  optionsClassName="bg-[#2A2A42] border-white/20 text-white"
                />
              </div>
              <Input
                label="Project Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe your project..."
                className="min-h-32 bg-white/5 border-white/20 text-white placeholder-white/50"
              />
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <Select
                label="Preferred Contact"
                options={contactOptions}
                value={formData.preferredContact}
                onChange={(value) => handleSelectChange('preferredContact', value)}
                placeholder="Preferred Contact Method"
                className="bg-white/5 border-white/20 text-white"
                optionsClassName="bg-[#2A2A42] border-white/20 text-white"
              />
              <Checkbox
                label="Subscribe to Newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                name="newsletter"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/20">
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                fullWidth
                className="bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white hover:opacity-90"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Strategy Session'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationForm;
