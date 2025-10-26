import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    imageAlt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer",
    rating: 5,
    quote: `The consultation process with ServiceHub Pro was exceptional. They took the time to understand our unique challenges and provided actionable insights that transformed our operations. The team's expertise and professionalism exceeded our expectations.`,
    result: "40% increase in operational efficiency",
    consultationType: "Operations Optimization"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Founder",
    company: "GrowthLab Startup",
    image: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    imageAlt: "Professional headshot of Hispanic man with short dark hair in charcoal suit",
    rating: 5,
    quote: `From the initial consultation to project completion, ServiceHub Pro delivered outstanding results. Their strategic approach helped us scale efficiently and avoid common pitfalls. The consultation alone was worth its weight in gold.`,
    result: "3x revenue growth in 18 months",
    consultationType: "Strategy Consulting"
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "VP of Operations",
    company: "MedCare Systems",
    image: "https://images.unsplash.com/photo-1707303796472-9741012c112a",
    imageAlt: "Professional headshot of blonde woman with bob haircut in white blouse",
    rating: 5,
    quote: `The consultation experience was thorough and insightful. The team asked the right questions and provided clear, actionable recommendations. Their follow-up support ensured successful implementation of all suggested improvements.`,
    result: "60% reduction in processing time",
    consultationType: "Digital Transformation"
  },
  {
    id: 4,
    name: "David Park",
    title: "CTO",
    company: "InnovateTech Corp",
    image: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    imageAlt: "Professional headshot of Asian man with glasses and dark hair in navy suit",
    rating: 5,
    quote: `ServiceHub Pro's consultation process is unmatched. They brought deep industry expertise and practical solutions to complex technical challenges. The entire experience was professional, efficient, and highly valuable.`,
    result: "50% faster deployment cycles",
    consultationType: "Technology Implementation"
  }];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials?.length]);

  const currentTest = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-[#2A2A42]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What Our Clients Say About Our Consultations
          </h2>
          <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
            Hear from business leaders who have experienced our consultation process and achieved remarkable results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial */}
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-professional-xl border border-white/20">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Client Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto lg:mx-0 shadow-professional">
                    <img
                      src={currentTest?.image}
                      alt={currentTest?.imageAlt}
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Quote" size={16} color="white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1">{currentTest?.name}</h3>
                <p className="text-muted-foreground mb-1">{currentTest?.title}</p>
                <p className="text-primary font-medium mb-4">{currentTest?.company}</p>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                  {[...Array(currentTest?.rating)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  )}
                </div>

                {/* Consultation Type */}
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {currentTest?.consultationType}
                </span>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <blockquote className="text-lg text-foreground leading-relaxed mb-6 italic">
                  "{currentTest?.quote}"
                </blockquote>
                
                {/* Result Highlight */}
                <div className="bg-[#e57b46]/10 rounded-2xl p-6 border border-[#e57b46]/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#e57b46]/20 rounded-full flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-[#e57b46]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Achieved Result</p>
                      <p className="text-lg font-semibold text-[#e57b46]">{currentTest?.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentTestimonial ?
              'bg-accent-foreground scale-125' :
              'bg-accent-foreground/30 hover:bg-accent-foreground/50'}`
              } />

            )}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials?.length - 1 : prev - 1
            )}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 animate-elastic-hover">

            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          
          <button
            onClick={() => setCurrentTestimonial((prev) =>
            (prev + 1) % testimonials?.length
            )}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 animate-elastic-hover">

            <Icon name="ChevronRight" size={20} className="text-white" />
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-[#e57b46] mb-2">500+</div>
            <p className="text-white/80">Digital Marketing Projects</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-[#e57b46] mb-2">95%</div>
            <p className="text-white/80">Client Satisfaction Rate</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-3xl font-bold text-[#e57b46] mb-2">24hrs</div>
            <p className="text-white/80">Average Response Time</p>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TestimonialSection;