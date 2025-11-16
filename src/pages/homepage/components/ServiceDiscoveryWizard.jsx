import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ServiceDiscoveryWizard = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const wizardRef = useRef(null);
  const prevStepRef = useRef(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');

  const wizardSteps = [
    {
      id: 'business-type',
      title: 'What type of business are you?',
      description: 'Help us understand your industry and business model',
      type: 'single-choice',
      options: [
        { id: 'startup', label: 'Startup (0-2 years)', icon: 'Rocket' },
        { id: 'small-business', label: 'Small Business (3-50 employees)', icon: 'Users' },
        { id: 'mid-market', label: 'Mid-Market (51-500 employees)', icon: 'Building' },
        { id: 'enterprise', label: 'Enterprise (500+ employees)', icon: 'Building2' }
      ]
    },
    {
      id: 'challenges',
      title: 'What are your biggest challenges?',
      description: 'Select all that apply to your current situation',
      type: 'multiple-choice',
      options: [
        { id: 'efficiency', label: 'Operational Efficiency', icon: 'Zap' },
        { id: 'technology', label: 'Technology Modernization', icon: 'Laptop' },
        { id: 'growth', label: 'Scaling & Growth', icon: 'TrendingUp' },
        { id: 'data', label: 'Data & Analytics', icon: 'BarChart3' },
        { id: 'security', label: 'Security & Compliance', icon: 'Shield' },
        { id: 'costs', label: 'Cost Optimization', icon: 'DollarSign' }
      ]
    },
    {
      id: 'priorities',
      title: 'What are your top priorities?',
      description: 'Choose your most important business objectives',
      type: 'multiple-choice',
      options: [
        { id: 'revenue', label: 'Increase Revenue', icon: 'TrendingUp' },
        { id: 'productivity', label: 'Improve Productivity', icon: 'Zap' },
        { id: 'customer-experience', label: 'Enhance Customer Experience', icon: 'Heart' },
        { id: 'innovation', label: 'Drive Innovation', icon: 'Lightbulb' },
        { id: 'risk-management', label: 'Reduce Risk', icon: 'Shield' },
        { id: 'market-expansion', label: 'Expand Market Reach', icon: 'Globe' }
      ]
    },
    {
      id: 'timeline',
      title: 'What is your preferred timeline?',
      description: 'When would you like to see results?',
      type: 'single-choice',
      options: [
        { id: 'immediate', label: 'Immediate (1-3 months)', icon: 'Clock' },
        { id: 'short-term', label: 'Short-term (3-6 months)', icon: 'Calendar' },
        { id: 'medium-term', label: 'Medium-term (6-12 months)', icon: 'CalendarDays' },
        { id: 'long-term', label: 'Long-term (12+ months)', icon: 'CalendarRange' }
      ]
    }
  ];

  const serviceRecommendations = {
    'startup': {
      'efficiency': ['Digital Transformation', 'Technology Solutions'],
      'technology': ['Technology Solutions', 'Digital Transformation'],
      'growth': ['Strategic Consulting', 'Business Intelligence'],
      'data': ['Business Intelligence', 'Technology Solutions']
    },
    'small-business': {
      'efficiency': ['Digital Transformation', 'Strategic Consulting'],
      'technology': ['Technology Solutions', 'Digital Transformation'],
      'growth': ['Strategic Consulting', 'Business Intelligence'],
      'costs': ['Strategic Consulting', 'Digital Transformation']
    },
    'mid-market': {
      'efficiency': ['Digital Transformation', 'Business Intelligence'],
      'technology': ['Technology Solutions', 'Digital Transformation'],
      'growth': ['Strategic Consulting', 'Business Intelligence'],
      'security': ['Technology Solutions', 'Strategic Consulting']
    },
    'enterprise': {
      'efficiency': ['Business Intelligence', 'Digital Transformation'],
      'technology': ['Technology Solutions', 'Digital Transformation'],
      'security': ['Technology Solutions', 'Strategic Consulting'],
      'data': ['Business Intelligence', 'Technology Solutions']
    }
  };

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.from(sectionRef?.current, {
        y: 50,
         opacity: 100,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const direction = currentStep > prevStepRef.current ? 1 : -1;

    if (currentStep < wizardSteps.length) {
      gsap.from(wizardRef.current, {
        x: 50 * direction,
         opacity: 100,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    prevStepRef.current = currentStep;
  }, [currentStep, wizardSteps.length]);

  const handleAnswer = (stepId, optionId, isMultiple = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev?.[stepId] || [];
        const newAnswers = currentAnswers?.includes(optionId)
          ? currentAnswers?.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
        return { ...prev, [stepId]: newAnswers };
      } else {
        return { ...prev, [stepId]: optionId };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < wizardSteps?.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateRecommendations();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateRecommendations = () => {
    const businessType = answers?.['business-type'];
    const challenges = answers?.['challenges'] || [];
    
    let recommendedServices = new Set();
    
    challenges?.forEach(challenge => {
      const services = serviceRecommendations?.[businessType]?.[challenge] || [];
      services?.forEach(service => recommendedServices?.add(service));
    });

    const serviceDetails = {
      'Digital Transformation': {
        title: 'Digital Transformation',
        description: 'Revolutionize your business processes with cutting-edge digital solutions',
        benefits: ['300% ROI increase', 'Streamlined operations', 'Enhanced productivity'],
        icon: 'Zap'
      },
      'Strategic Consulting': {
        title: 'Strategic Consulting',
        description: 'Expert guidance to navigate complex business challenges',
        benefits: ['85% client retention', 'Strategic clarity', 'Growth acceleration'],
        icon: 'Target'
      },
      'Technology Solutions': {
        title: 'Technology Solutions',
        description: 'Custom software development and technology implementation',
        benefits: ['50% faster delivery', 'Scalable solutions', 'Modern architecture'],
        icon: 'Code'
      },
      'Business Intelligence': {
        title: 'Business Intelligence',
        description: 'Transform raw data into actionable insights',
        benefits: ['40% better decisions', 'Real-time insights', 'Predictive analytics'],
        icon: 'BarChart3'
      }
    };

    const finalRecommendations = Array.from(recommendedServices)?.map(service => serviceDetails?.[service]);
    setRecommendations(finalRecommendations);
    setIsCompleted(true);
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    setIsCompleted(false);
  };

  const handleSubmitData = async () => {
    try {
      setSubmissionStatus('submitting');
      
      const formData = {
        answers,
        recommendations,
        timestamp: new Date().toISOString(),
        metadata: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
        }
      };

      const response = await fetch('/api/submit-wizard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      setSubmissionStatus('success');
      setTimeout(() => {
        navigate('/contact', { 
          state: { wizardData: formData }
        });
      }, 1500);

    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmissionStatus('error');
    }
  };

  const currentStepData = wizardSteps?.[currentStep];
  const isStepComplete = currentStepData && (
    currentStepData?.type === 'single-choice' 
      ? answers?.[currentStepData?.id]
      : answers?.[currentStepData?.id]?.length > 0
  );

  if (isCompleted) {
    return (
      <section ref={sectionRef} className="py-10 bg-gradient-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} color="white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Your Personalized Recommendations
              </h2>
              <p className="text-xl text-white/80">
                Based on your responses, here are the services that best match your needs
              </p>
            </div>

            <div className="grid sx:grid-cols-4 gap-8 mb-12">
              {recommendations?.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-professional-xl">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                    <Icon name={service?.icon} size={24} color="white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{service?.title}</h3>
                  <p className="text-muted-foreground mb-6">{service?.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {service?.benefits?.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <Icon name="Check" size={16} className="text-success mr-3" />
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="animate-elastic-hover"
                  >
                    Learn More
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="mr-4 animate-elastic-hover"
                onClick={handleSubmitData}
                disabled={submissionStatus === 'submitting'}
              >
                {submissionStatus === 'submitting' ? 'Sending...' : 'Schedule Consultation'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="RotateCcw"
                iconPosition="left"
                className="animate-elastic-hover"
                onClick={resetWizard}
                disabled={submissionStatus === 'submitting'}
              >
                Start Over
              </Button>

              {submissionStatus === 'error' && (
                <p className="mt-4 text-red-500 text-sm">
                  Failed to submit data. Please try again.
                </p>
              )}
              
              {submissionStatus === 'success' && (
                <p className="mt-4 text-green-500 text-sm">
                  Data submitted successfully! Redirecting to consultation form...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Service <span className="bg-gradient-primary bg-clip-text text-white">Discovery Wizard</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Answer a few questions to get personalized service recommendations tailored to your business needs
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep + 1} of {wizardSteps?.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(((currentStep + 1) / wizardSteps?.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / wizardSteps?.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Wizard Content */}
          <div ref={wizardRef} className="bg-card rounded-3xl p-8 lg:p-12 shadow-professional-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold  mb-4">
                {currentStepData?.title}
              </h3>
              <p className="text-sx text-muted-foreground">
                {currentStepData?.description}
              </p>
            </div>

            {/* Options */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {currentStepData?.options?.map((option) => {
                const isSelected = currentStepData?.type === 'single-choice'
                  ? answers?.[currentStepData?.id] === option?.id
                  : answers?.[currentStepData?.id]?.includes(option?.id);

                return (
                  <div
                    key={option?.id}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 animate-elastic-hover ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-professional'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onClick={() => handleAnswer(currentStepData?.id, option?.id, currentStepData?.type === 'multiple-choice')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-gradient-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={option?.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {option?.label}
                        </h4>
                      </div>
                      {currentStepData?.type === 'multiple-choice' && (
                      <Checkbox
                            checked={isSelected}
                            onChange={() =>
                              handleAnswer(
                                currentStepData?.id,
                                option?.id,
                                currentStepData?.type === 'multiple-choice'
                              )
                            }
                            className="pointer-events-auto" // so user can interact
                          />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="animate-elastic-hover"
              >
                Previous
              </Button>

              <Button
                variant="default"
                iconName={currentStep === wizardSteps?.length - 1 ? "Sparkles" : "ChevronRight"}
                iconPosition="right"
                onClick={nextStep}
                disabled={!isStepComplete}
                className="animate-elastic-hover"
              >
                {currentStep === wizardSteps?.length - 1 ? "Get Recommendations" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDiscoveryWizard;