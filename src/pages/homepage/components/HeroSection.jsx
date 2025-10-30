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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2A2A42]">
      {/* Floating Circles */}
      <div className="absolute inset-0 opacity-10">
        {[
          { top: "top-5", left: "left-4", size: "w-12 h-12 sm:w-20 sm:h-20", color: "bg-white" },
          { top: "top-16", right: "right-6", size: "w-10 h-10 sm:w-16 sm:h-16", color: "bg-[#B9AEDF]" },
          { bottom: "bottom-32", left: "left-6", size: "w-14 h-14 sm:w-24 sm:h-24", color: "bg-[#88E5BE]" },
          { bottom: "bottom-16", right: "right-4", size: "w-8 h-8 sm:w-12 sm:h-12", color: "bg-white" },
        ].map((style, idx) => (
          <div
            key={idx}
            ref={(el) => addToRefs(el, floatingElementsRef)}
            className={`absolute ${style.top || ""} ${style.bottom || ""} ${style.left || ""} ${style.right || ""} ${style.size} ${style.color} rounded-full`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 ref={titleRef} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Business with
              <span className="block bg-gradient-accent bg-clip-text text-transparent mt-2">
                Professional Excellence
              </span>
            </h1>

            <p ref={subtitleRef} className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience the intersection of innovation and expertise. We deliver measurable results through cutting-edge solutions tailored to your unique business challenges.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                variant="default"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90 shadow-professional-lg w-full sm:w-auto"
                onClick={() => {
                  if (typeof onOpenConsultation === 'function') {
                    onOpenConsultation();
                  } else {
                    setShowScheduleModal(true);
                  }
                }}
              >
                Schedule Free Consultation
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div ref={trustIndicatorsRef} className="flex flex-wrap justify-center lg:justify-start gap-4 text-white/80 text-sm">
              {[
                { icon: "Shield", label: "SSL Secured" },
                { icon: "Award", label: "Industry Certified" },
                { icon: "Users", label: "500+ Happy Clients" },
              ].map(({ icon, label }, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon name={icon} size={18} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image + Stats */}
          <div className="relative">
            <div ref={imageRef} className="rounded-xl overflow-hidden shadow-professional-xl">
              <Image
                src={img}
                alt="Hero"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating Stats */}
            {[
              {
                pos: "top-[-1rem] left-[-1rem] sm:top-[-1.5rem] sm:left-[-1.5rem]",
                icon: "TrendingUp",
                value: "98%",
                label: "Success Rate",
                bg: "bg-success"
              },
              {
                pos: "bottom-[-1rem] right-[-1rem] sm:bottom-[-1.5rem] sm:right-[-1.5rem]",
                icon: "Clock",
                value: "24/7",
                label: "Support",
                bg: "bg-primary"
              }
            ].map((stat, i) => (
              <div
                key={i}
                ref={(el) => addToRefs(el, statsCardsRef)}
                className={`absolute ${stat.pos} bg-white rounded-lg p-3 sm:p-4 shadow-professional-lg`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center`}>
                    <Icon name={stat.icon} size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-dark">{stat.value}</div>
                    <div className="text-sm text-dark ">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
       
        </div>

      {/* Modal Popup for Scheduling */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)} />
          <div className="relative z-10 w-full max-w-2xl">
            <div className="p-6">
              <div className="bg-gradient-to-br from-[#1F2130]/60 to-[#2A2A42]/60 rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-semibold text-white">Schedule Free Consultation</h4>
                  <button onClick={() => setShowScheduleModal(false)} className="text-white/70 hover:text-white">
                    ✕
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
