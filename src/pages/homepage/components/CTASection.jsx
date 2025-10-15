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
      preferredDate: 'N/A',
      message: `${form.message}\n\nServices of interest: ${form.services.join(', ')}`,
    };

    try {
      // Option A — POST to your backend / cloud function that sends email (recommended)
      // Make sure you deploy the Firebase function (sendConsultation) and proxy /api/consultation to it
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to send request');
      }

      // success
      setSuccess('Request sent — we will contact you shortly.');
      setForm({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '', services: [] });

      // Option B (alternative): Use EmailJS directly from client (uncomment and configure)
      // import emailjs from '@emailjs/browser' at top and call:
      // await emailjs.send(serviceId, templateId, { ...payload, to_email: 'startflyerads@gmail.com' }, publicKey)

    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(err?.message || 'Failed to submit form');
    } finally {
      setLoading(false);
      // auto-clear success after a bit
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
                  <span className="text-sm font-medium">500+ Happy Clients</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-professional-xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Get Your Free Consultation
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="John"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john.doe@company.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  />

                  <Input
                    label="Company Name"
                    type="text"
                    placeholder="Your Company"
                    required
                    value={form.company}
                    onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      How can we help you?
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows="4"
                      placeholder="Tell us about your business challenges and goals..."
                      required
                      value={form.message}
                      onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Services of Interest (Optional)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        'Digital Transformation',
                        'Strategic Consulting',
                        'Technology Solutions',
                        'Business Intelligence'
                      ]?.map((service) => (
                        <label key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            value={service}
                            checked={form.services.includes(service)}
                            onChange={(e) => {
                              const val = e.target.value;
                              setForm((s) => ({
                                ...s,
                                services: s.services.includes(val) ? s.services.filter((x) => x !== val) : [...s.services, val]
                              }));
                            }}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="ml-2 text-sm text-foreground">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {error && <div className="text-sm text-red-600">{error}</div>}
                  {success && <div className="text-sm text-green-600">{success}</div>}

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="Send"
                    iconPosition="right"
                    className="animate-elastic-hover shadow-professional"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Schedule Free Consultation'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
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