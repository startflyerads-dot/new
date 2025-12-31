import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ScheduleFreeConsultation from '../../../components/ScheduleFreeConsultation';
import img from '../../../assets/images/hero1.jpeg'
gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ onOpenConsultation }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const trustIndicatorsRef = useRef(null);
  const statsCardsRef = useRef([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showScheduleModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showScheduleModal]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, ease: "power3.out" })
          .from(subtitleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
          .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(imageRef.current, { scale: 0.8, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
          .from(trustIndicatorsRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");

        statsCardsRef.current.forEach((card, i) => {
          gsap.from(card, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 1.5 + i * 0.2
          });
        });

        gsap.to(heroRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1, ease: "power2.out" })
          .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
          .from(imageRef.current, { scale: 0.9, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
          .from(trustIndicatorsRef.current, { y: 15, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");

        statsCardsRef.current.forEach((card, i) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 1.2 + i * 0.15
          });
        });

        gsap.to(heroRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      });

      // Floating animation
      floatingElementsRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: -20,
          duration: 2 + i * 0.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[
          { top: "top-20", left: "left-[10%]", size: "w-4 h-4", color: "bg-primary" },
          { top: "top-[40%]", right: "right-[15%]", size: "w-3 h-3", color: "bg-secondary" },
          { bottom: "bottom-[20%]", left: "left-[20%]", size: "w-5 h-5", color: "bg-accent" },
          { bottom: "bottom-[40%]", right: "right-[10%]", size: "w-2 h-2", color: "bg-white" },
        ].map((style, idx) => (
          <div
            key={idx}
            ref={(el) => addToRefs(el, floatingElementsRef)}
            className={`absolute ${style.top || ""} ${style.bottom || ""} ${style.left || ""} ${style.right || ""} ${style.size} ${style.color} rounded-full filter blur-[1px]`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div ref={trustIndicatorsRef} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Premium Hiking Experiences
            </div>

            <h1 ref={titleRef} className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase">
              Discover the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                Wild Side of HK
              </span>
            </h1>

            <p ref={subtitleRef} className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Connecting travelers with the authentic, wild side of Hong Kong through sustainable and personalized walking tours.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                iconName="Mountain"
                iconPosition="right"
                className="bg-emerald-600 text-white hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] h-14 px-8 text-lg font-bold uppercase tracking-widest"
                onClick={() => {
                  if (typeof onOpenConsultation === 'function') {
                    onOpenConsultation();
                  } else {
                    setShowScheduleModal(true);
                  }
                }}
              >
                Book a Tour
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Compass"
                iconPosition="left"
                className="border-white/10 text-white hover:bg-white/5 backdrop-blur-sm h-14 px-8 text-lg font-bold uppercase tracking-widest"
              >
                Our Trails
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-white/5 pt-8">
              {[
                { label: "Trails Explored", value: "50+" },
                { label: "Guides", value: "12" },
                { label: "Success Rate", value: "100%" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image + Stats */}
          <div className="relative group">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-square sm:aspect-video lg:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <Image
                src={img}
                alt="HK Local Tours - Sustainable Hiking"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
            </div>

            {/* Floating Interaction Cards */}
            <div
              ref={(el) => addToRefs(el, statsCardsRef)}
              className="absolute -top-6 -right-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="Mountain" className="text-emerald-500" size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-white">Wild HK</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sustainability</div>
                </div>
              </div>
            </div>

            <div
              ref={(el) => addToRefs(el, statsCardsRef)}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Icon name="Zap" className="text-secondary" size={24} />
                </div>
                <div>
                  <div className="text-xl font-black text-white">Fast-Track</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Implementation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none opacity-50">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] vertical-text">Scroll To Explore</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Modal Popup for Scheduling */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={() => setShowScheduleModal(false)} />
          <div className="relative z-[101] w-full max-w-2xl animate-fade-in-up">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-primary/50 to-secondary/50 shadow-2xl">
              <div className="bg-background rounded-[1.4rem] p-8 border border-white/5">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">Plan Your Hike</h4>
                    <p className="text-zinc-500">Let's discuss how we can show you the wild side of HK.</p>
                  </div>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>

                <ScheduleFreeConsultation onClose={() => setShowScheduleModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
