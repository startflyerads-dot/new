import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import market from '../../../assets/images/market.jpeg';
import app from '../../../assets/images/app.jpeg';
import web from '../../../assets/images/web.jpeg';
import graphic from '../../../assets/images/graphic.jpeg';

gsap?.registerPlugin(ScrollTrigger);

const ServicesPreview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 1,
      title: "Family Friendly",
      description: "Easy-to-moderate walks through Hong Kong's cultural heritage sites and scenic coastal paths. Perfect for all ages.",
      icon: "Users",
      image: market,
      imageAlt: "Families enjoying a coastal walk in Hong Kong",
      features: [
        "Cultural Heritage Sites",
        "Scenic Coastal Paths",
        "Paved Trail Options",
        "Rest Stop Logistics",
        "Local Snack Guides",
        "Child Safety Measures"
      ],
      results: "100+ families guided in 2024"
    },
    {
      id: 2,
      title: "Sustainability",
      description: "Educational tours focused on Hong Kong's unique biodiversity, nature conservation, and indigenous flora and fauna.",
      icon: "Leaf",
      image: web,
      imageAlt: "Guide explaining local flora during a nature tour",
      features: [
        "Biodiversity Education",
        "Conservation Awareness",
        "Zero-Waste Principles",
        "Native Species Tracking",
        "Sustainable Transport",
        "Eco-System Protection"
      ],
      results: "Certified Carbon Neutral Tours"
    },
    {
      id: 3,
      title: "Challenging Hikes",
      description: "High-intensity peak conquests and wild terrain exploration for experienced hikers seeking the ultimate HK thrill.",
      icon: "Mountain",
      image: app,
      imageAlt: "Hiker standing at the peak of a Hong Kong mountain",
      features: [
        "Peak Conquest Routes",
        "Technical Terrain",
        "Navigation Workshops",
        "Altitude Training",
        "Personal Best Tracking",
        "Expert Guide Support"
      ],
      results: "50+ Peaks Conquered Weekly"
    },
    {
      id: 4,
      title: "Custom Packages",
      description: "Personalized adventures tailored to your specific fitness levels, interests, and scheduling requirements.",
      icon: "Map",
      image: graphic,
      imageAlt: "Handwritten map and compass on a wooden table",
      features: [
        "Flexible Scheduling",
        "Fitness Level Sync",
        "Private Group Options",
        "Bespoke Trail Planning",
        "Catering Adjustments",
        "Photography Services"
      ],
      results: "Over 500 Bespoke Adventures"
    }
  ];


  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Title animation
      gsap?.from(titleRef?.current, {

        opacity: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef?.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards stagger animation
      gsap?.from(cardsRef?.current, {

        opacity: 100,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef?.current?.includes(el)) {
      cardsRef?.current?.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-6">
            Our Expeditions
          </div>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
            Curated <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Experiences</span>
          </h2>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Discover the wild side of Hong Kong with personalized, sustainable hiking tours led by expert local guides.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services?.map((service, index) =>
            <div
              key={service?.id}
              ref={addToCardsRef}
              className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${activeService === index
                ? 'bg-white/10 border-white/20 shadow-2xl scale-[1.02]'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`
              }
              onMouseEnter={() => setActiveService(index)}>

              {/* Dynamic Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-500 pointer-events-none ${activeService === index ? 'bg-primary/20 opacity-100' : 'bg-primary/10 opacity-0 group-hover:opacity-100'
                }`} />

              <div className="relative z-10">
                {/* Service Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-500">
                  <Icon name={service?.icon} size={24} className={activeService === index ? 'text-emerald-500' : 'text-white/70 group-hover:text-emerald-500'} />
                </div>

                {/* Service Content */}
                <h3 className="text-xl font-black text-white mb-4 group-hover:text-emerald-500 transition-colors duration-300 uppercase tracking-widest">
                  {service?.title}
                </h3>

                <p className="text-sm text-zinc-500 font-medium mb-8 leading-relaxed">
                  {service?.description}
                </p>

                {/* Results Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-8">
                  <Icon name="TrendingUp" size={12} />
                  {service?.results}
                </div>

                {/* CTA Link */}
                <Link to="/all-tours" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-emerald-500 transition-colors">
                  View Tour <Icon name="ArrowRight" size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Featured Service Detail - Premium Glass Card */}
        <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-br from-white/10 to-transparent shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-3xl rounded-[2.4rem]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            {/* Service Image Section */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-square group-hover:scale-[1.02] transition-transform duration-700">
                <Image
                  src={services?.[activeService]?.image}
                  alt={services?.[activeService]?.imageAlt}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
              </div>

              {/* Floating Glass Label */}
              <div className="absolute -bottom-6 -right-6 lg:bottom-12 lg:-right-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl max-w-[200px] animate-fade-in-up">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Icon name="Compass" size={20} className="text-emerald-500" />
                  </div>
                  <div className="font-black text-white tracking-widest uppercase text-sm">Wild Expertise</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-loose">Highest standards in sustainable trail navigation.</div>
                </div>
              </div>
            </div>

            {/* Service Details Section */}
            <div className="order-1 lg:order-2">
              <div className="w-12 h-1 bg-primary mb-8" />
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
                {services?.[activeService]?.title}
              </h3>

              <p className="text-xl text-zinc-400 mb-10 font-medium leading-relaxed">
                {services?.[activeService]?.description}
              </p>

              {/* Enhanced Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {services?.[activeService]?.features?.map((feature, idx) =>
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/item:bg-primary group-hover/item:border-primary transition-colors">
                      <Icon name="Check" size={12} className="text-primary group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-tight">{feature}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-emerald-600 text-white font-black h-14 px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase tracking-widest">
                  Book This Tour
                </Button>

                <Link to="/all-tours">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/10 text-white font-black h-14 px-8 hover:bg-white/5 backdrop-blur-sm uppercase tracking-widest">
                    All Trails
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ServicesPreview;