import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

gsap?.registerPlugin(ScrollTrigger);

const TestimonialsCarousel = ({ onOpenConsultation }) => {
  const sectionRef = useRef(null);
  const testimonialImageRef = useRef(null);
  const testimonialContentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Thompson",
      position: "Solo Traveler",
      company: "Lantau Peak Expedition",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      content: `The Lantau Peak sunrise hike was the highlight of my trip. The guide was professional, knew the trails perfectly, and the views were absolutely breathtaking. Sustainable tourism at its finest!`,
      rating: 5,
      results: {
        metric: "Peak Conquered",
        improvement: "SUNRISE",
        timeframe: "4 Hours",
      },
      videoThumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      videoThumbnailAlt: "Hiker looking at the sunrise from Lantau Peak",
    },
    {
      id: 2,
      name: "David Chen",
      position: "Family of 4",
      company: "Dragon's Back Cultural Walk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: `A perfect family day out. The trail was easy enough for the kids, and our guide shared fascinating stories about the local history and ecosystem. Highly recommended for families visiting HK!`,
      rating: 5,
      results: {
        metric: "Family Bonding",
        improvement: "EASY",
        timeframe: "3 Hours",
      },
      videoThumbnail: "https://images.unsplash.com/photo-1527661591475-527312dd65f5",
      videoThumbnailAlt: "Family enjoying the coastal views of Dragon's Back",
    },
    {
      id: 3,
      name: "Marcus Miller",
      position: "Adventure Seeker",
      company: "Lion Rock Night Trek",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      content: `Incredible experience! Hiking up to Lion Rock at night gave me a whole new perspective of the city. The safety measures were top-notch, and the gear provided was premium.`,
      rating: 5,
      results: {
        metric: "City Views",
        improvement: "NIGHT",
        timeframe: "2.5 Hours",
      },
      videoThumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      videoThumbnailAlt: "Stunning night view of Hong Kong from Lion Rock",
    }
  ];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      gsap?.from(sectionRef?.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef?.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, testimonials?.length]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to([testimonialImageRef.current, testimonialContentRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power3.in'
    }).to([testimonialImageRef.current, testimonialContentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out'
    });
  }, [currentIndex]);

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-6">
            Explorer Reviews
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
            Expedition <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Chronicles</span>
          </h2>
          <p className="text-lg text-zinc-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Real stories from travelers who have explored the wild side of Hong Kong with our expert local guides.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div ref={testimonialImageRef} className="relative aspect-square lg:aspect-auto">
                <Image
                  src={currentTestimonial?.videoThumbnail}
                  alt={currentTestimonial?.videoThumbnailAlt}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-widest shadow-lg">
                  <Icon name="Compass" size={14} />
                  {currentTestimonial?.results?.improvement} EXPERIENCE
                </div>
              </div>

              <div ref={testimonialContentRef} className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-10">
                  {[...Array(currentTestimonial?.rating)]?.map((_, i) =>
                    <Icon key={i} name="Star" size={16} className="text-emerald-500 fill-current" />
                  )}
                </div>

                <blockquote className="text-2xl lg:text-3xl font-black text-white mb-10 leading-[1.3] tracking-tight">
                  "{currentTestimonial?.content}"
                </blockquote>

                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-emerald-500/20 shadow-xl">
                    <Image
                      src={currentTestimonial?.avatar}
                      alt={currentTestimonial?.name}
                      className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg uppercase tracking-widest">{currentTestimonial?.name}</div>
                    <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">{currentTestimonial?.position}</div>
                    <div className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{currentTestimonial?.company}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                  <div>
                    <div className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-2">Duration</div>
                    <div className="text-xl font-black text-white uppercase">{currentTestimonial?.results?.timeframe}</div>
                  </div>
                  <div>
                    <div className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-2">Outcome</div>
                    <div className="text-xl font-black text-emerald-400 uppercase">{currentTestimonial?.results?.metric}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-12 gap-8">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-12 bg-emerald-500' : 'w-4 bg-white/10 hover:bg-white/20'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        </div>

        <div className="mt-32 text-center relative max-w-5xl mx-auto p-16 rounded-[3rem] border border-white/5 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tighter uppercase relative z-10">
            Ready for your next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">HK Adventure?</span>
          </h3>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-medium relative z-10">
            Join our next group expedition or schedule a private custom tour tailored to your fitness level and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
            <Button
              variant="default"
              size="lg"
              iconName="Mountain"
              iconPosition="right"
              className="bg-emerald-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl shadow-emerald-500/20 h-14 px-10 text-lg font-black uppercase tracking-widest"
              onClick={onOpenConsultation}
            >
              Book a Tour
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Compass"
              iconPosition="left"
              className="border-white/10 text-white hover:bg-white/5 h-14 px-10 text-lg font-black uppercase tracking-widest"
            >
              Our Trails
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;