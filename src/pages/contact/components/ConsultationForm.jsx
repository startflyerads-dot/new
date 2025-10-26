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


  // Update service options for digital marketing
  const serviceOptions = [
    { value: 'digital-marketing', label: 'Digital Marketing Strategy' },
    { value: 'social-media', label: 'Social Media Marketing' },
    { value: 'seo', label: 'SEO Optimization' },
    { value: 'ppc', label: 'PPC & Google Ads' },
    { value: 'content', label: 'Content Marketing' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'custom', label: 'Custom Marketing Solution' }
  ];

  // Update budget options for marketing services
  const budgetOptions = [
    { value: '1k-3k', label: '$1,000 - $3,000 / month' },
    { value: '3k-5k', label: '$3,000 - $5,000 / month' },
    { value: '5k-10k', label: '$5,000 - $10,000 / month' },
    { value: '10k+', label: '$10,000+ / month' },
    { value: 'project', label: 'Project-based' },
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
    e.preventDefault();
    setErrors({});
    if (!formData.firstName || !formData.email) {
      setErrors(prev => ({ ...prev, form: 'Please provide name and email.' }));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // safe parse: read text then try parse JSON
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        data = { error: text || 'Invalid JSON response from server' };
      }

      if (!res.ok) {
        setErrors(prev => ({ ...prev, form: data?.error || 'Submission failed' }));
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, form: err.message || 'Submission failed' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-[#2A2A42]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-professional-xl p-8 lg:p-12 text-center border border-white/20"
          >
            <div className="w-20 h-20 bg-[#e57b46]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-[#e57b46]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-lg text-white/80 mb-8">
              Your strategy session request has been received. Our digital marketing experts will review your information and contact you within 24 hours.
            </p>
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <h3 className="font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                {[
                  "We'll analyze your current digital presence and prepare a customized strategy",
                  "Our marketing expert will contact you to schedule a convenient time",
                  "We'll conduct a comprehensive strategy session and provide actionable insights"
                ].map((text, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#e57b46] to-[#B9AEDF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white/70">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white hover:opacity-90 transition-opacity"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Update the input styles in your theme configuration
  const inputStyles = {
    base: "bg-white/5 border-white/20 text-white placeholder-white/50",
    focus: "focus:border-[#e57b46] focus:ring-[#e57b46]/20",
    error: "border-red-500/50 focus:border-red-500/50",
    label: "text-dark/90",
    helperText: "text-white/60",
    errorText: "text-red-400"
  };
const selectStyles = {
  control: "bg-white/5 border border-white/20 rounded-xl h-12 px-4 text-white placeholder-white/50 flex items-center justify-between transition-all duration-200 cursor-pointer focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/30",
  value: "text-white",
  placeholder: "text-white/50",
  dropdown: "bg-[#2A2A42] border-white/20 rounded-xl shadow-xl backdrop-blur-lg mt-1",
  option: "px-4 py-2 cursor-pointer hover:bg-[#e57b46]/15 text-white/80",
  selected: "bg-[#e57b46]/25 font-medium text-white",
};


  // Update the checkbox styles
  const checkboxStyles = {
    ...inputStyles,
    base: "border-white/20 bg-white/5",
    checked: "bg-[#e57b46] border-[#e57b46]",
    label: "text-white/70"
  };

  return (
    <section className="py-20 bg-[#2A2A42]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Transform Your Digital Presence
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get a free marketing strategy session with our experts. We'll analyze your current digital presence and provide actionable insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-professional-xl p-8 lg:p-12 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Icon name="User" size={20} className="mr-2 text-[#e57b46]" />
                Your Information
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
                  className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
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
                  className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
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
                  className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
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
                  className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
                />
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Icon name="Building" size={20} className="mr-2 text-[#e57b46]" />
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
                  className="bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
                />
    <Select
  label="Industry"
  options={industryOptions}
  value={formData.industry}
  onChange={(value) => handleSelectChange('industry', value)}
  error={errors.industry}
  required
  placeholder="Select your industry"
  className=" border-white/20 text-dark placeholder-dark/50"
  optionsClassName="border-white/20 text-white"

  />


              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Icon name="Briefcase" size={20} className="mr-2 text-[#e57b46]" />
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
               className=" border-white/20 text-dark placeholder-dark/50"

                  optionsClassName="bg-[#2A2A42] border-white/20 text-white"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Project Budget"
                    options={budgetOptions}
                    value={formData?.projectBudget}
                    onChange={(value) => handleSelectChange('projectBudget', value)}
                    placeholder="Select your budget range"
                     className=" border-white/20 text-dark placeholder-dark/50"

                    optionsClassName="bg-[#2A2A42] border-white/20 text-white"
                  />
                  <Select
                    label="Timeline"
                    options={timelineOptions}
                    value={formData?.timeline}
                    onChange={(value) => handleSelectChange('timeline', value)}
                    placeholder="When do you need this completed?"
                     className=" border-white/20 text-dark placeholder-dark/50"

                    optionsClassName="bg-[#2A2A42] border-white/20 text-white"
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
                  className="min-h-32 bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-[#e57b46]"
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Icon name="Settings" size={20} className="mr-2 text-[#e57b46]" />
                Communication Preferences
              </h3>
              <div className="space-y-6">
                <Select
                  label="Preferred Contact Method"
                  options={contactOptions}
                  value={formData?.preferredContact}
                  onChange={(value) => handleSelectChange('preferredContact', value)}
                  placeholder="How would you like us to contact you?"
               className=" border-white/20 text-dark placeholder-dark/50"

                  optionsClassName="bg-[#2A2A42] border-white/20 text-white"
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
            <div className="pt-6 border-t border-white/20">
              {errors?.form && <p className="text-sm text-red-400 text-center mb-4">{errors.form}</p>}
              <Button
                type="submit"
                loading={isSubmitting}
                className="bg-gradient-to-r from-[#e57b46] to-[#B9AEDF]"
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