import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

gsap?.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // controlled form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    services: [],
  });

  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Section entrance animation
      gsap?.from(contentRef?.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      gsap?.from(formRef?.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating elements animation
      floatingElementsRef?.current?.forEach((el, index) => {
        if (el) {
          gsap?.to(el, {
            y: -30,
            duration: 3 + index * 0.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.4
          });
        }
      });

    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const addToFloatingRefs = (el) => {
    if (el && !floatingElementsRef?.current?.includes(el)) {
      floatingElementsRef?.current?.push(el);
    }
  };

  const handleChange = (key) => (e) => {
    const value = e?.target?.type === 'checkbox'
      ? (() => {
          const val = e.target.value;
          if (form.services.includes(val)) {
            return form.services.filter((s) => s !== val);
          }
          return [...form.services, val];
        })()
      : e?.target?.value;
    if (e?.target?.type === 'checkbox') {
      setForm((s) => ({ ...s, services: value }));
    } else {
      setForm((s) => ({ ...s, [key]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      company: form.company,
      phone: form.phone,
      services: form.services,
      message: form.message
    };

    try {
      const res = await fetch('https://server-rho-cyan.vercel.app/api/form1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let body;
      try { body = text ? JSON.parse(text) : {}; } catch { body = { error: text || 'Invalid JSON' }; }

      if (!res.ok) throw new Error(body?.error || 'Failed to send request');

      setSuccess('Request sent — we will contact you shortly.');
      setForm({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '', services: [] });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(err?.message || 'Failed to submit form');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 5000);
      setTimeout(() => setError(null), 7000);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div ref={addToFloatingRefs} className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full" />
        <div ref={addToFloatingRefs} className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full" />
        <div ref={addToFloatingRefs} className="absolute bottom-40 left-20 w-40 h-40 bg-accent rounded-full" />
        <div ref={addToFloatingRefs} className="absolute bottom-20 right-10 w-20 h-20 bg-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={contentRef}>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Business?
              </h2>

              <p className="text-xl text-white/90 mb-8">
                Join hundreds of successful companies that have revolutionized their operations with our expert solutions. Get started with a free consultation today.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: 'CheckCircle', text: 'Free initial consultation and strategy session' },
                  { icon: 'Clock', text: '24/7 dedicated support throughout your journey' },
                  { icon: 'Shield', text: '100% satisfaction guarantee on all services' },
                  { icon: 'TrendingUp', text: 'Proven track record with 98% client success rate' }
                ]?.map((benefit, index) => (
                  <div key={index} className="flex items-center text-white">
                    <Icon name={benefit?.icon} size={20} className="mr-4 text-accent" />
                    <span className="text-lg">{benefit?.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={20} />
                  <span className="text-sm font-medium">Industry Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={20} />
                  <span className="text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  <span className="text-sm font-medium">10+ Happy Clients</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20 shadow-professional">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Strategy Session
                  </h3>
                  <p className="text-white/80">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        value={form.company}
                        onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      How can we help you? *
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your business goals..."
                      required
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-[#e57b46] focus:ring-2 focus:ring-[#e57b46]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Services of Interest */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">
                      Services of Interest
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Digital Marketing',
                        'Social Media',
                        'SEO Optimization',
                        'Content Strategy',
                        'Paid Ads',
                        'Web Design'
                      ].map((service) => (
                        <label key={service} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="services"
                            value={service}
                            checked={form.services.includes(service)}
                            onChange={handleChange('services')}
                            className="w-5 h-5 text-[#e57b46] bg-white/5 border border-white/20 rounded focus:ring-[#e57b46]/20"
                          />
                          <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-400 text-sm text-center">{success}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-professional"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Icon name="Loader" className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      'Get Free Strategy Session'
                    )}
                  </button>

                  <p className="text-xs text-white/60 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-[#e57b46] hover:underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#e57b46] hover:underline">Terms of Service</a>
                  </p>
                </form>
              </div>

              {/* Contact Alternatives */}
              <div className="mt-8 text-center">
                <p className="text-white/80 mb-4">Prefer to talk directly?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+1-555-123-4567"
                    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 animate-elastic-hover"
                  >
                    <Icon name="Phone" size={20} />
                    <span>+1 (555) 123-4567</span>
                  </a>
                  <a
                    href="mailto:startflyerads@gmail.com"
                    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 animate-elastic-hover"
                  >
                    <Icon name="Mail" size={20} />
                    <span>startflyerads@gmail.com</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;