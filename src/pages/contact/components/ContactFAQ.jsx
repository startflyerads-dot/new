import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How long does the consultation process take?",
      answer: `Our initial consultation typically takes 60-90 minutes. During this time, we'll:\n\n• Understand your business challenges and goals\n• Review your current processes and systems\n• Discuss potential solutions and approaches\n• Provide preliminary recommendations\n• Outline next steps and timeline\n\nAfter the consultation, we'll provide a detailed proposal within 48 hours.`
    },
    {
      id: 2,
      question: "What should I prepare for the consultation?",
      answer: `To make the most of your consultation, please prepare:\n\n• Overview of your business and current challenges\n• Any relevant documentation or data\n• List of key stakeholders who should be involved\n• Budget range and timeline expectations\n• Specific questions or concerns you'd like addressed\n\nDon't worry if you don't have everything - we'll guide you through the process.`
    },
    {
      id: 3,
      question: "Do you offer remote consultations?",
      answer: `Yes! We offer flexible consultation options:\n\n• Video conferences via Zoom, Teams, or Google Meet\n• Phone consultations for initial discussions\n• In-person meetings at our offices or your location\n• Hybrid approaches combining remote and on-site work\n\nWe'll work with your preferences and requirements to find the best format.`
    },
    {
      id: 4,
      question: "What are your typical project timelines?",
      answer: `Project timelines vary based on scope and complexity:\n\n• Strategy consulting: 4-12 weeks\n• Digital transformation: 3-9 months\n• Operations optimization: 6-16 weeks\n• Training programs: 2-8 weeks\n• Custom solutions: Timeline determined during consultation\n\nWe'll provide a detailed timeline during your consultation based on your specific needs.`
    },
    {
      id: 5,
      question: "How do you ensure project success?",
      answer: `Our success methodology includes:\n\n• Detailed project planning and milestone tracking\n• Regular progress reviews and stakeholder updates\n• Dedicated project managers and expert teams\n• Continuous communication and feedback loops\n• Post-implementation support and optimization\n• Measurable KPIs and success metrics\n\nWe maintain a 95% client satisfaction rate and offer guarantees on our work.`
    },
    {
      id: 6,
      question: "What industries do you specialize in?",
      answer: `We serve clients across multiple industries:\n\n• Technology and Software\n• Healthcare and Medical\n• Financial Services\n• Manufacturing and Logistics\n• Retail and E-commerce\n• Education and Non-profit\n• Professional Services\n• Startups and Scale-ups\n\nOur consultants have deep expertise in these sectors and understand industry-specific challenges.`
    },
    {
      id: 7,
      question: "How do you handle confidentiality and data security?",
      answer: `We take security and confidentiality seriously:\n\n• All team members sign comprehensive NDAs\n• SOC 2 Type II certified security practices\n• Encrypted communication and file sharing\n• Secure project management platforms\n• Regular security audits and compliance reviews\n• GDPR and industry-specific compliance\n\nYour sensitive information is protected at every step of our engagement.`
    },
    {
      id: 8,
      question: "What happens after the initial consultation?",
      answer: `After your consultation, here's what happens:\n\n• We'll send a detailed summary within 24 hours\n• Custom proposal with recommendations and pricing\n• Follow-up call to discuss the proposal\n• Contract and project kickoff (if you proceed)\n• Dedicated team assignment and project planning\n• Regular progress updates and milestone reviews\n\nThere's no obligation to proceed after the consultation - it's completely risk-free.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our consultation process and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <motion.div
              key={faq?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-professional overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </h3>
                <div className={`transform transition-transform duration-300 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}>
                  <Icon name="ChevronDown" size={20} className="text-primary" />
                </div>
              </button>

              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border">
                      <div className="pt-4">
                        {faq?.answer?.split('\n')?.map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line?.startsWith('•') ? (
                              <div className="flex items-start space-x-2 mb-2">
                                <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                                <p className="text-muted-foreground">{line?.substring(2)}</p>
                              </div>
                            ) : line?.trim() ? (
                              <p className="text-muted-foreground mb-3">{line}</p>
                            ) : (
                              <div className="mb-2"></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-secondary rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-secondary-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team is here to help! Reach out through any of our contact channels, and we'll get back to you within 2 hours during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-secondary rounded-xl font-medium hover:bg-white/90 transition-colors animate-elastic-hover">
                <Icon name="Phone" size={20} className="mr-2" />
                Call Us Now
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-secondary-foreground/20 text-secondary-foreground rounded-xl font-medium hover:bg-secondary-foreground/30 transition-colors animate-elastic-hover">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Start Live Chat
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;